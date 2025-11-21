# AWS S3 Setup Guide - FREE TIER ONLY

This guide will help you set up AWS S3 for image uploads using **only the AWS Free Tier**. Follow these steps carefully to avoid any charges.

## AWS Free Tier Limits for S3

- **Storage**: 5 GB of standard storage
- **GET Requests**: 20,000 GET requests per month
- **PUT Requests**: 2,000 PUT requests per month
- **Data Transfer**: 15 GB of data transfer OUT per month
- **Valid for**: 12 months from AWS account creation

## Step 1: Create AWS Account

1. Go to [aws.amazon.com](https://aws.amazon.com)
2. Click "Create an AWS Account"
3. Fill in your email, password, and AWS account name
4. Choose **Personal** account type
5. Enter payment information (required but won't be charged if you stay within free tier)
6. Verify your identity via phone
7. Choose **Basic Support (Free)** plan

⚠️ **Important**: Set up billing alerts to avoid unexpected charges!

## Step 2: Set Up Billing Alerts

1. Go to AWS Console → Your Name (top right) → Billing Dashboard
2. Click "Billing preferences" in the left sidebar
3. Enable:
   - ✅ Receive Free Tier Usage Alerts
   - ✅ Receive Billing Alerts
4. Enter your email address
5. Save preferences
6. Go to CloudWatch (Services → CloudWatch)
7. Create a billing alarm:
   - Click "Alarms" → "Billing" → "Create alarm"
   - Set threshold to $1 (or $5 for safety buffer)
   - Create new SNS topic with your email
   - Confirm subscription via email

## Step 3: Create an S3 Bucket

1. Go to AWS Console → Services → S3
2. Click **"Create bucket"**
3. **Bucket name**: Choose a unique name (e.g., `lusitanestate-images-2024`)
   - Must be globally unique
   - Use lowercase, numbers, and hyphens only
   - **Write down this name** - you'll need it for `.env`
4. **AWS Region**: Choose closest to your users
   - Portugal/Europe: `eu-west-1` (Ireland)
   - US East: `us-east-1` (Virginia)
   - **Write down this region** - you'll need it for `.env`
5. **Object Ownership**: Keep default (ACLs disabled)
6. **Block Public Access settings**:
   - ⚠️ **UNCHECK** "Block all public access"
   - ✅ Check the acknowledgment box
   - This allows public read access to uploaded images
7. **Bucket Versioning**: Disabled (saves storage)
8. **Default encryption**: Disabled (free tier)
9. **Object Lock**: Disabled
10. Click **"Create bucket"**

## Step 4: Configure Bucket Policy for Public Read Access

1. Click on your newly created bucket
2. Go to **"Permissions"** tab
3. Scroll down to **"Bucket policy"**
4. Click **"Edit"**
5. Paste this policy (replace `YOUR-BUCKET-NAME` with your actual bucket name):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

6. Click **"Save changes"**

## Step 5: Configure CORS for Browser Uploads

1. Still in **"Permissions"** tab
2. Scroll to **"Cross-origin resource sharing (CORS)"**
3. Click **"Edit"**
4. Paste this CORS configuration:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag"]
  }
]
```

5. Click **"Save changes"**

⚠️ **Production Note**: Replace `"*"` in AllowedOrigins with your actual domain (e.g., `"https://lusitanestate.netlify.app"`)

## Step 6: Create IAM User for Programmatic Access

1. Go to AWS Console → Services → IAM
2. Click **"Users"** in left sidebar
3. Click **"Create user"**
4. **User name**: `real-estate-upload-user`
5. Click **"Next"**
6. **Set permissions**:
   - Choose **"Attach policies directly"**
   - **DO NOT** select AdministratorAccess
   - Click **"Create policy"** (opens new tab)

## Step 7: Create Custom IAM Policy (Minimal Permissions)

In the new tab:

1. Click **"JSON"** tab
2. Paste this policy (replace `YOUR-BUCKET-NAME`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:PutObjectAcl"
      ],
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket"
      ],
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME"
    }
  ]
}
```

3. Click **"Next"**
4. **Policy name**: `RealEstateS3UploadPolicy`
5. **Description**: `Minimal S3 permissions for real estate image uploads`
6. Click **"Create policy"**
7. Close this tab and return to the user creation tab

## Step 8: Attach Policy to User

1. Click the refresh button next to "Filter policies"
2. Search for `RealEstateS3UploadPolicy`
3. ✅ Check the box next to your policy
4. Click **"Next"**
5. Review and click **"Create user"**

## Step 9: Create Access Keys

1. Click on the user you just created (`real-estate-upload-user`)
2. Go to **"Security credentials"** tab
3. Scroll to **"Access keys"**
4. Click **"Create access key"**
5. Choose **"Application running outside AWS"**
6. Click **"Next"**
7. **Description tag**: `Real Estate Backend`
8. Click **"Create access key"**
9. ⚠️ **IMPORTANT**: Copy both:
   - **Access key ID** (starts with `AKIA...`)
   - **Secret access key** (shown only once!)
10. Click **"Download .csv file"** for backup
11. Store these securely - you'll need them for `.env`

## Step 10: Configure Backend Environment Variables

1. Open your backend `.env` file
2. Add these variables with your actual values:

```env
# AWS S3 Configuration
AWS_ACCESS_KEY_ID=AKIA........................
AWS_SECRET_ACCESS_KEY=........................................
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=your-bucket-name
```

**Replace**:
- `AWS_ACCESS_KEY_ID`: Your access key from Step 9
- `AWS_SECRET_ACCESS_KEY`: Your secret key from Step 9
- `AWS_REGION`: Your bucket region from Step 3 (e.g., `us-east-1`, `eu-west-1`)
- `AWS_S3_BUCKET_NAME`: Your bucket name from Step 3

## Step 11: Deploy to Fly.io (Backend)

Set the environment variables as Fly.io secrets:

```bash
fly secrets set AWS_ACCESS_KEY_ID=your_access_key_here
fly secrets set AWS_SECRET_ACCESS_KEY=your_secret_key_here
fly secrets set AWS_REGION=us-east-1
fly secrets set AWS_S3_BUCKET_NAME=your-bucket-name
```

Then deploy:

```bash
fly deploy
```

## Step 12: Test Image Upload

1. Login to your application
2. Go to "Add Property"
3. Navigate to Step 5 (Images)
4. Click "Select Images" and choose a photo
5. Verify:
   - ✅ Upload progress shows
   - ✅ Image appears in preview
   - ✅ Image URL starts with `https://your-bucket-name.s3.amazonaws.com/`

## Monitoring Free Tier Usage

1. Go to AWS Console → Billing Dashboard
2. Click **"Free Tier"** in left sidebar
3. Monitor your usage:
   - S3 Standard Storage (should stay under 5 GB)
   - S3 GET requests (should stay under 20,000/month)
   - S3 PUT requests (should stay under 2,000/month)

## Best Practices to Stay Within Free Tier

1. **Limit Image Sizes**: Max 5MB per image (already configured)
2. **Limit Image Count**: Max 10 images per property (already configured)
3. **Monitor Usage**: Check AWS Free Tier dashboard weekly
4. **Delete Test Images**: Remove test uploads regularly
5. **Set Lifecycle Rules** (Optional):
   - Go to bucket → Management → Lifecycle rules
   - Delete incomplete multipart uploads after 7 days
   - This prevents orphaned data from consuming storage

## Troubleshooting

### Error: "Access Denied"
- Check IAM policy has correct bucket name
- Verify Access Keys are correct in `.env`
- Ensure bucket policy allows public read

### Error: "CORS Error"
- Verify CORS configuration in S3 bucket
- Check AllowedOrigins includes your frontend URL

### Error: "No such bucket"
- Verify bucket name in `.env` matches exactly
- Check AWS region is correct

### Images Not Loading
- Verify bucket policy allows public read
- Check image URL is publicly accessible
- Ensure "Block all public access" is OFF

## Cost Prevention Checklist

✅ Set up billing alerts at $1 threshold
✅ Monitor Free Tier usage weekly
✅ Keep total storage under 5 GB
✅ Keep PUT requests under 2,000/month
✅ Keep GET requests under 20,000/month
✅ Delete test/unused images regularly
✅ Review AWS bill monthly

## Security Best Practices

1. **Never commit AWS credentials to Git**
   - Already in `.gitignore`: `.env`
   - Use environment variables only

2. **Rotate Access Keys periodically**
   - Go to IAM → Users → Security credentials
   - Deactivate old key after creating new one

3. **Use minimal IAM permissions**
   - Our policy only allows S3 operations on one bucket
   - No other AWS services accessible

4. **Monitor CloudTrail logs**
   - AWS CloudTrail shows all API calls
   - Review for suspicious activity

## Additional Resources

- [AWS Free Tier](https://aws.amazon.com/free/)
- [S3 Pricing](https://aws.amazon.com/s3/pricing/)
- [IAM Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
- [S3 Security Best Practices](https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html)

---

**Questions or Issues?**

If you encounter any problems:
1. Check AWS Free Tier dashboard for usage
2. Review CloudWatch billing alarms
3. Verify all environment variables are set correctly
4. Check Fly.io logs: `fly logs`
5. Test locally first before deploying
