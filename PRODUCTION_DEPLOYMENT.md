# Production Deployment Guide

This guide covers deploying the Portuguese Real Estate CMS to production with Netlify (frontend) and Fly.io (backend).

## Table of Contents
1. [Backend Deployment (Fly.io)](#backend-deployment-flyio)
2. [Frontend Deployment (Netlify)](#frontend-deployment-netlify)
3. [Troubleshooting Common Issues](#troubleshooting-common-issues)

---

## Backend Deployment (Fly.io)

### 1. Verify Fly.io Configuration

Check your `fly.toml` file:
```toml
app = 'lusitanestate-backend'
primary_region = 'cdg'

[env]
  PORT = '8080'
  NODE_ENV = 'production'
```

Your backend URL will be: `https://lusitanestate-backend.fly.dev`

### 2. Configure Secrets on Fly.io

**CRITICAL**: AWS credentials and sensitive data must be set as Fly.io secrets, not in `fly.toml`.

```bash
# MongoDB Connection String
fly secrets set MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/real-estate?retryWrites=true&w=majority"

# JWT Secret (generate a strong random string)
fly secrets set JWT_SECRET="your_secure_random_jwt_secret_here"
fly secrets set JWT_EXPIRE="30d"

# AWS S3 Configuration (REQUIRED for image uploads)
fly secrets set AWS_ACCESS_KEY_ID="your_aws_access_key_id"
fly secrets set AWS_SECRET_ACCESS_KEY="your_aws_secret_access_key"
fly secrets set AWS_REGION="us-east-1"  # or your bucket region
fly secrets set AWS_S3_BUCKET_NAME="lusitanestate-images-2025"

# Client URL for CORS
fly secrets set CLIENT_URL="https://your-netlify-site.netlify.app"
```

### 3. Verify Secrets Were Set

```bash
fly secrets list
```

You should see all the secrets listed (values are hidden for security).

### 4. Deploy Backend

```bash
fly deploy
```

### 5. Verify Backend Health

After deployment, check:
```bash
fly status
fly logs
```

Visit `https://lusitanestate-backend.fly.dev/` - you should see the welcome message.

### 6. Test Backend Upload Endpoint

The backend logs should show:
```
✅ AWS S3 Client initialized successfully
📍 Region: us-east-1
🪣 Bucket: lusitanestate-images-2025
```

If you see:
```
❌ AWS S3 Configuration Error: Missing AWS configuration
```

Then AWS secrets were not properly set. Go back to step 2.

---

## Frontend Deployment (Netlify)

### 1. Configure Environment Variables on Netlify

**Option A: Via Netlify UI**
1. Go to your site dashboard on Netlify
2. Navigate to **Site settings** → **Build & deploy** → **Environment variables**
3. Add the following variables:

| Key | Value | Example |
|-----|-------|---------|
| `VITE_API_URL` | Your Fly.io backend URL | `https://lusitanestate-backend.fly.dev/api` |
| `VITE_GOOGLE_MAPS_API_KEY` | (Optional) Your Google Maps key | `your_key_here` |

**Option B: Via Netlify CLI**
```bash
netlify env:set VITE_API_URL "https://lusitanestate-backend.fly.dev/api"
```

### 2. Create .env.production File (Optional)

In `frontend/` directory, create `.env.production`:
```env
VITE_API_URL=https://lusitanestate-backend.fly.dev/api
```

**Note**: Netlify environment variables take precedence over `.env.production`.

### 3. Verify Build Configuration

Check `frontend/netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 4. Deploy to Netlify

**Option A: Git-based deployment (Recommended)**
```bash
git add .
git commit -m "Configure production environment"
git push origin your-branch
```

Netlify will automatically detect the push and deploy.

**Option B: Manual deployment**
```bash
cd frontend
npm run build
netlify deploy --prod
```

### 5. Verify Frontend Deployment

1. Visit your Netlify site URL
2. Open browser DevTools → Console
3. Look for the API URL being used:
   ```
   Uploading to: https://lusitanestate-backend.fly.dev/api
   ```

If you see `http://localhost:5000/api`, the environment variable is NOT set correctly.

---

## Troubleshooting Common Issues

### Issue 1: "An error occurred" when uploading images

**Symptom**: Image upload works locally but fails in production with generic error message.

**Diagnosis**:
Open browser DevTools → Console and look for:
```javascript
Upload error - Full error object: ...
Error message: ...
Error response: ...
```

**Common Causes & Solutions**:

#### A. Wrong API URL
**Console shows**: `Uploading to: http://localhost:5000/api` or `Uploading to: undefined`

**Solution**:
1. Verify Netlify environment variable is set:
   ```bash
   netlify env:list
   ```
2. Ensure variable name is exactly `VITE_API_URL` (not `API_URL` or `REACT_APP_API_URL`)
3. Redeploy after setting variables

#### B. Missing AWS Credentials on Fly.io
**Error message**: "Image upload service is not configured"

**Solution**:
```bash
fly secrets set AWS_ACCESS_KEY_ID="your_key"
fly secrets set AWS_SECRET_ACCESS_KEY="your_secret"
fly secrets set AWS_S3_BUCKET_NAME="lusitanestate-images-2025"
fly secrets set AWS_REGION="us-east-1"
fly deploy
```

#### C. CORS Error
**Console shows**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:
1. Update backend CORS configuration in `src/server.js`:
   ```javascript
   app.use(cors({
     origin: process.env.CLIENT_URL || 'http://localhost:3000',
     credentials: true
   }));
   ```
2. Set `CLIENT_URL` secret on Fly.io:
   ```bash
   fly secrets set CLIENT_URL="https://your-site.netlify.app"
   fly deploy
   ```

#### D. Authentication Error
**Error message**: "Network error. Please check your connection." or 401 Unauthorized

**Solution**:
1. Ensure you're logged in on the production site
2. Check if JWT token is being sent:
   - DevTools → Network → Select upload request → Headers
   - Look for `Authorization: Bearer <token>`
3. Verify JWT_SECRET is set on Fly.io:
   ```bash
   fly secrets list
   ```

#### E. AWS Permission Error
**Backend logs show**: "User is not authorized to perform: s3:PutObject"

**Solution**:
Verify IAM policy attached to your AWS user:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::lusitanestate-images-2025/*"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": "arn:aws:s3:::lusitanestate-images-2025"
    }
  ]
}
```

#### F. S3 Bucket Policy Error
**Error message**: "Access Denied" when viewing uploaded images

**Solution**:
Add bucket policy to allow public read access:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::lusitanestate-images-2025/*"
    }
  ]
}
```

### Issue 2: Images upload but don't display

**Symptom**: Backend logs show "✅ Upload successful" but frontend shows 0 images.

**Diagnosis**: Check browser console:
```javascript
Response data: [...array of images...]
Success: undefined  // ❌ Problem!
```

**Solution**: This was fixed in commit `338a37e`. If you still see this issue:
1. Pull latest code
2. Verify `ImageUpload.jsx` checks `response.success` (not `response.data.success`)
3. Verify axios interceptor in `frontend/src/api/axios.js` returns `response.data`

### Issue 3: Backend deployment fails

**Common causes**:
- **Out of memory**: Increase VM memory in `fly.toml`
- **Build errors**: Check `fly logs` for Node.js version compatibility
- **Missing dependencies**: Ensure `package-lock.json` is committed

### Issue 4: Frontend shows old version after deployment

**Solution**:
1. Clear Netlify build cache:
   ```bash
   netlify build --clear-cache
   ```
2. Hard refresh browser: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
3. Check Netlify deploy logs for build errors

---

## Verification Checklist

Use this checklist to verify your production deployment:

### Backend (Fly.io)
- [ ] `fly status` shows app is running
- [ ] Visit `https://lusitanestate-backend.fly.dev/` returns API welcome message
- [ ] `fly logs` shows "✅ AWS S3 Client initialized successfully"
- [ ] All secrets are set: `fly secrets list`
- [ ] MongoDB connection is successful (check logs)

### Frontend (Netlify)
- [ ] Site is accessible at Netlify URL
- [ ] Browser console shows correct API URL when uploading
- [ ] `VITE_API_URL` environment variable is set in Netlify dashboard
- [ ] No CORS errors in browser console
- [ ] Authentication works (login/register)

### Image Upload
- [ ] Select image files
- [ ] Upload progress shows
- [ ] Images appear in property form
- [ ] Images are visible in S3 bucket
- [ ] Image URLs are publicly accessible
- [ ] Property creation succeeds with images

---

## Quick Debug Commands

**Check backend logs:**
```bash
fly logs
```

**Check backend secrets:**
```bash
fly secrets list
```

**Check Netlify environment variables:**
```bash
netlify env:list
```

**Restart backend:**
```bash
fly restart
```

**SSH into backend:**
```bash
fly ssh console
```

**Check S3 bucket contents:**
```bash
aws s3 ls s3://lusitanestate-images-2025/properties/
```

---

## Support

If you encounter issues not covered here:

1. **Check browser console** for detailed error messages
2. **Check backend logs**: `fly logs`
3. **Verify environment variables** are set correctly
4. **Test locally first** to isolate production-specific issues
5. **Check AWS CloudWatch** for billing/usage alerts

## Related Documentation

- [LOCAL_SETUP.md](./LOCAL_SETUP.md) - Local development setup
- [Fly.io Documentation](https://fly.io/docs/)
- [Netlify Documentation](https://docs.netlify.com/)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
