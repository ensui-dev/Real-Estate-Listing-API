# Deploy Backend to Fly.io

The backend code has been updated to restrict access to pending/rejected properties. Follow these steps to deploy:

## Prerequisites
- Fly CLI installed on your machine
- Logged in to Fly.io (`fly auth login`)

## Deployment Steps

### 1. Pull the latest changes from GitHub

```bash
git pull origin claude/react-frontend-011CUhKekh337AL3Pn71HNnR
```

### 2. Verify you have the latest commits

```bash
git log --oneline -3
```

You should see:
- `a0e0082 feat: Restrict direct access to non-approved properties`
- `4ddeeec fix: Hide pending properties from public listing`
- `9ed20fb feat: Add PropertyDetail page for individual property viewing`

### 3. Deploy to Fly.io

```bash
# Make sure you're in the project root directory
cd /path/to/Real-Estate-Listing-API

# Deploy (this uses the fly.toml configuration)
fly deploy
```

### 4. Verify deployment

```bash
# Check deployment status
fly status

# View logs
fly logs
```

### 5. Test the changes

After deployment:
- Try accessing a pending property URL while logged out → Should show 404
- Login as the property owner → Should be able to view the pending property
- Login as admin → Should be able to view all properties

## What Changed

### Backend Files Modified:
1. **src/middleware/auth.js** - Added `optionalAuth` middleware
2. **src/controllers/propertyController.js** - Added approval status checks to `getProperty`
3. **src/routes/propertyRoutes.js** - Applied `optionalAuth` to property detail route

### How It Works:
- **Approved properties**: Visible to everyone
- **Pending/Rejected properties**: Only visible to owner and admin when authenticated
- **Unauthenticated users**: Get 404 for non-approved properties

## Troubleshooting

If deployment fails:
1. Check Fly.io status: `fly status`
2. View logs: `fly logs`
3. Restart app: `fly apps restart lusitanestate-backend`

If you get authentication errors:
1. Login again: `fly auth login`
2. List your apps: `fly apps list`
