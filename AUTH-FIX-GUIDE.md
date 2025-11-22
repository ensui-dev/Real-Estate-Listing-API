# Authentication Fix - Missing JWT Secrets on Fly.io

## The Problem

Your authentication is failing because JWT environment variables are missing on Fly.io:

**Evidence from logs:**
```
[dotenv@17.2.3] injecting env (0) from .env
```

This means 0 environment variables were loaded. Your backend needs:
- `JWT_SECRET` - Secret key for signing tokens
- `JWT_EXPIRE` - Token expiration time

**What happens:**
1. **Registration**: User is created ✅ → Token generation fails ❌ → Error shown, but user is in DB
2. **Login**: Authentication succeeds ✅ → Token generation fails ❌ → "Login failed" shown

---

## Quick Fix (Run These Commands)

In your backend folder, run:

```bash
# 1. Generate a secure JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
# Copy the output (a long random string)

# 2. Set JWT_SECRET on Fly.io
fly secrets set JWT_SECRET="paste_the_generated_secret_here" -a lusitanestate-backend

# 3. Set JWT expiration
fly secrets set JWT_EXPIRE="30d" -a lusitanestate-backend

# 4. Verify secrets are set
fly secrets list -a lusitanestate-backend
```

**Expected output from step 4:**
```
NAME          DIGEST          CREATED AT
JWT_EXPIRE    xxxxxxxxxxxx    1m ago
JWT_SECRET    xxxxxxxxxxxx    1m ago
MONGODB_URI   xxxxxxxxxxxx    Xh ago
```

---

## After Setting Secrets

Fly.io will automatically redeploy your app. Wait about 30 seconds, then check:

```bash
# Watch the logs
fly logs -a lusitanestate-backend
```

You should see:
```
[dotenv@17.2.3] injecting env (0) from .env
```
This is normal - it means no .env file (which is correct in production).

The secrets are injected separately by Fly.io.

---

## Test Authentication

### Test Registration:

```bash
curl -X POST https://lusitanestate-backend.fly.dev/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "buyer"
  }'
```

**Expected response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Test User",
    "email": "test@example.com",
    "role": "buyer",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Test Login:

```bash
curl -X POST https://lusitanestate-backend.fly.dev/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Expected response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Test User",
    "email": "test@example.com",
    "role": "buyer",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## Clean Up Duplicate Users (If Needed)

If you created test users that are now duplicates, you can clean them up via MongoDB Atlas:

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click **"Browse Collections"** on your cluster
3. Select the `real-estate-cms` database
4. Click the `users` collection
5. Find and delete duplicate test users

Or use MongoDB Compass (GUI) to connect and manage users.

---

## Additional Code Fix (Optional but Recommended)

There's also a small bug in the User model's pre-save hook:

**Current code (src/models/User.js:49-55):**
```javascript
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();  // ❌ Missing return
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
```

**Should be:**
```javascript
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();  // ✅ Return after next()
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
```

This ensures the function exits when password isn't modified.

---

## Environment Variables Checklist

Your Fly.io app should have these secrets:

- [x] `MONGODB_URI` - MongoDB Atlas connection string
- [x] `JWT_SECRET` - JWT signing secret (64 characters recommended)
- [x] `JWT_EXPIRE` - Token expiration (e.g., "30d", "7d", "24h")

**Note:** `PORT` and `NODE_ENV` are set in `fly.toml`, not as secrets.

---

## Verification

After setting secrets and redeployment:

1. **Registration works**: Returns token
2. **Login works**: Returns token
3. **Token is valid**: Can use it for authenticated requests
4. **No duplicate users** created on errors

---

## Why This Happened

**Local development (.env file):**
```env
JWT_SECRET=your_secret_here
JWT_EXPIRE=30d
```

✅ Works locally because dotenv reads from .env file

**Production (Fly.io):**
- ❌ No .env file deployed (in .gitignore)
- ✅ Must use Fly.io secrets instead

**The fix:** Use `fly secrets set` to add environment variables on Fly.io

---

## Quick Commands Reference

```bash
# Set a secret
fly secrets set KEY="value" -a lusitanestate-backend

# List all secrets
fly secrets list -a lusitanestate-backend

# Remove a secret
fly secrets unset KEY -a lusitanestate-backend

# View logs
fly logs -a lusitanestate-backend

# Restart app
fly apps restart lusitanestate-backend
```

---

## Expected Final Result

✅ Registration creates user AND returns token
✅ Login with correct credentials returns token
✅ Token can be used for authenticated API requests
✅ Frontend authentication flow works completely

---

Run the commands above and your authentication will work perfectly! 🚀
