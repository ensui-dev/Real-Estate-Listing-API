# Quick Fix for Production Upload Issue

## Problem
Image uploads work locally but fail in production (Netlify + Fly.io) with error: "An error occurred"

## Root Cause
The production deployment is likely missing required environment variables, causing:
- Frontend trying to connect to wrong API URL (localhost instead of production)
- Backend missing AWS S3 credentials
- CORS blocking requests from production domain

## Immediate Fix Steps

### Step 1: Configure Fly.io Backend Secrets (5 minutes)

Run these commands to set required secrets on your backend:

```bash
# Set AWS S3 credentials (REQUIRED for uploads)
fly secrets set AWS_ACCESS_KEY_ID="your_aws_access_key_id"
fly secrets set AWS_SECRET_ACCESS_KEY="your_aws_secret_access_key"
fly secrets set AWS_REGION="us-east-1"
fly secrets set AWS_S3_BUCKET_NAME="lusitanestate-images-2025"

# Set MongoDB connection (if not already set)
fly secrets set MONGODB_URI="your_mongodb_connection_string"

# Set JWT secret (if not already set)
fly secrets set JWT_SECRET="your_jwt_secret"
fly secrets set JWT_EXPIRE="30d"

# Set client URL for CORS (IMPORTANT!)
fly secrets set CLIENT_URL="https://your-netlify-site.netlify.app"

# Deploy with new secrets
fly deploy
```

**Verify secrets were set:**
```bash
fly secrets list
```

You should see all 7 secrets listed.

### Step 2: Configure Netlify Frontend Environment Variables (3 minutes)

**Option A: Via Netlify Dashboard**
1. Go to https://app.netlify.com
2. Select your site
3. Go to **Site settings** → **Build & deploy** → **Environment variables**
4. Click **Add a variable**
5. Add: `VITE_API_URL` = `https://lusitanestate-backend.fly.dev/api`
6. Click **Save**

**Option B: Via Netlify CLI**
```bash
netlify env:set VITE_API_URL "https://lusitanestate-backend.fly.dev/api"
```

**Verify it was set:**
```bash
netlify env:list
```

### Step 3: Redeploy Frontend (1 minute)

**Option A: Trigger redeploy from dashboard**
1. Go to Netlify dashboard → **Deploys**
2. Click **Trigger deploy** → **Deploy site**

**Option B: Git push**
```bash
git commit --allow-empty -m "Trigger Netlify redeploy"
git push
```

### Step 4: Test Upload (1 minute)

1. Visit your production site
2. Open browser DevTools (F12) → Console tab
3. Try uploading an image
4. Check console output:
   - Should see: `Uploading to: https://lusitanestate-backend.fly.dev/api`
   - Should NOT see: `http://localhost:5000/api`
5. If it still fails, copy ALL console error logs

## How to Verify Backend is Working

Visit: `https://lusitanestate-backend.fly.dev/`

You should see JSON response with:
```json
{
  "success": true,
  "message": "Welcome to Portuguese Real Estate CMS API",
  "endpoints": {
    "upload": "/api/upload (Authenticated users)"
  }
}
```

Check backend logs for AWS initialization:
```bash
fly logs
```

Look for:
```
✅ AWS S3 Client initialized successfully
📍 Region: us-east-1
🪣 Bucket: lusitanestate-images-2025
```

If you see:
```
❌ AWS S3 Configuration Error: Missing AWS configuration
```

Then AWS secrets are not set correctly. Go back to Step 1.

## Common Mistakes

1. **Wrong environment variable name on Netlify**
   - ❌ `API_URL` (wrong)
   - ❌ `REACT_APP_API_URL` (wrong)
   - ✅ `VITE_API_URL` (correct - Vite uses `VITE_` prefix)

2. **Wrong backend URL**
   - ❌ `https://lusitanestate-backend.fly.dev` (missing `/api`)
   - ✅ `https://lusitanestate-backend.fly.dev/api` (correct - with `/api`)

3. **Forgot to redeploy after setting variables**
   - Environment variables don't take effect until you redeploy

4. **CLIENT_URL doesn't match Netlify URL**
   - Make sure `CLIENT_URL` on Fly.io exactly matches your Netlify site URL
   - No trailing slash: `https://your-site.netlify.app` (not `.../`)

## Still Not Working?

Run these debug commands and share the output:

```bash
# Check Fly.io secrets
fly secrets list

# Check Netlify environment variables
netlify env:list

# Check backend logs
fly logs --app lusitanestate-backend

# Check if backend is responding
curl https://lusitanestate-backend.fly.dev/

# Test upload endpoint (requires authentication token)
curl -X POST https://lusitanestate-backend.fly.dev/api/upload/property-images \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "images=@test.jpg"
```

Open browser console on production site and try upload again. Copy ALL console output including:
- "Uploading to: ..."
- "Upload error - Full error object: ..."
- "Error message: ..."
- "Error response: ..."

## Complete Documentation

For comprehensive deployment guide with troubleshooting, see:
- [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md) - Full production deployment guide
- [LOCAL_SETUP.md](./LOCAL_SETUP.md) - Local development setup

## Summary of Changes Made

I've made the following changes to fix the upload functionality:

1. ✅ Added comprehensive error logging to `ImageUpload.jsx` for production debugging
2. ✅ Added AWS S3 upload middleware, controller, and routes to backend
3. ✅ Configured CORS with CLIENT_URL environment variable for production
4. ✅ Created comprehensive production deployment documentation
5. ✅ Committed and pushed all changes to `claude/mern-realestate-cms-setup-011CUhKekh337AL3Pn71HNnR`

**Next Step**: Pull latest code and follow Steps 1-4 above to configure production environment.
