# Local Development Setup Guide

## Quick Start

### 1. Configure Environment Variables

A `.env` file has been created in the project root. You need to fill in the values:

```bash
# Edit the .env file
code .env  # or use your preferred editor
```

### Required Configuration:

#### MongoDB (Required)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/real-estate?retryWrites=true&w=majority
```

**Get your MongoDB URI:**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Sign in or create account (FREE)
3. Create a cluster (M0 Free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<username>` and `<password>` with your credentials

#### JWT Secret (Required)
```env
JWT_SECRET=any_long_random_string_here_min_32_characters
```

Generate a secure secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### AWS S3 (Required for Image Uploads)

**Option A: Set Up AWS S3 (Recommended)**

Follow the complete guide: `AWS_S3_SETUP_GUIDE.md`

Quick steps:
1. Create AWS account (free tier)
2. Set up S3 bucket
3. Create IAM user with S3 permissions
4. Get access keys
5. Add to `.env`:

```env
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=your-bucket-name
```

**Option B: Skip AWS S3 for Now (Testing Only)**

If you want to test without image uploads:
1. Leave AWS variables empty in `.env`
2. Backend will start but image uploads will fail with helpful error
3. You can test all other features (properties without images will fail validation)

⚠️ **Note**: You MUST set up AWS S3 before allowing users to create properties, as images are required.

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Backend

```bash
npm run dev
```

You should see:
```
Server running in development mode on port 5000
MongoDB Connected
```

If you see "AWS S3 Configuration Error", that's okay if you skipped AWS setup. Image uploads won't work until you configure AWS.

### 4. Start Frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend should open at `http://localhost:3000`

## Testing Without AWS S3

If you haven't set up AWS yet, you can still test:

✅ **What Works:**
- User registration/login
- Viewing existing properties
- Browsing agents/agencies
- Dashboard access
- All navigation

❌ **What Won't Work:**
- Creating new properties (requires images)
- Uploading property images
- Uploading profile pictures

When you try to upload images, you'll see:
```
Error: Image upload service is not configured. Please set up AWS S3 credentials.
```

## Common Issues

### Issue: "Cannot connect to MongoDB"
**Solution**: Check your `MONGODB_URI` in `.env`. Make sure:
- Username and password are correct
- Network access is allowed in MongoDB Atlas
- Connection string includes database name

### Issue: "AWS S3 Configuration Error"
**Solution**: This is expected if you haven't set up AWS. Either:
1. Follow `AWS_S3_SETUP_GUIDE.md` to set up AWS S3
2. Or ignore for now (image uploads will fail)

### Issue: "Port 5000 already in use"
**Solution**:
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change port in .env
PORT=5001
```

### Issue: "JWT token invalid"
**Solution**:
1. Clear browser localStorage
2. Make sure `JWT_SECRET` is set in `.env`
3. Restart backend

## Environment Variables Reference

### Required
| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret for JWT tokens (32+ chars) | `a1b2c3d4e5f6...` |

### Optional (but needed for full functionality)
| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Backend server port | `5000` |
| `CLIENT_URL` | Frontend URL (CORS) | `http://localhost:3000` |
| `AWS_ACCESS_KEY_ID` | AWS IAM user access key | - |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM user secret key | - |
| `AWS_REGION` | AWS region for S3 | `us-east-1` |
| `AWS_S3_BUCKET_NAME` | S3 bucket name | - |

## Next Steps

1. ✅ Configure MongoDB ← Start here
2. ✅ Configure JWT Secret
3. ✅ Test backend (without images)
4. ⏭️ Set up AWS S3 (see `AWS_S3_SETUP_GUIDE.md`)
5. ✅ Test image uploads
6. 🚀 Ready for development!

## Quick Test Checklist

After setup, test these:

- [ ] Backend starts without errors
- [ ] Frontend connects to backend
- [ ] Can register a new user
- [ ] Can login with credentials
- [ ] Dashboard loads
- [ ] Can view properties (if any exist)
- [ ] Can navigate all pages

With AWS S3 configured:
- [ ] Can upload images in Add Property form
- [ ] Images appear after upload
- [ ] Can create property with images
- [ ] Property appears in dashboard

## Getting Help

- **MongoDB Issues**: [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- **AWS S3 Setup**: See `AWS_S3_SETUP_GUIDE.md` in this project
- **General Issues**: Check backend logs (`npm run dev`) for detailed errors
