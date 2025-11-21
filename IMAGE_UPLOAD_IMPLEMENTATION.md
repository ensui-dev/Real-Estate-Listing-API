# Image Upload Implementation Guide

## Overview

This application now uses **AWS S3** for all image uploads instead of URL inputs. This provides:
- ✅ Secure, scalable cloud storage
- ✅ Fast CDN delivery
- ✅ Automatic image optimization
- ✅ Better user experience
- ✅ Free tier compatible (5GB storage, 20k GET, 2k PUT/month)

## Architecture

```
User Browser → Frontend → Backend API → AWS S3 → Public URL
                  ↓           ↓
            ImageUpload   Upload Middleware
            Component    (Multer + S3)
```

## Backend Implementation

### Files Created/Modified

#### 1. `src/config/s3.js`
- AWS S3 client configuration
- Uses environment variables for credentials

#### 2. `src/middleware/upload.js`
- Multer configuration with S3 storage
- File type validation (images only)
- File size limit (5MB per file)
- File count limit (10 files per upload)
- Auto-generated unique filenames with UUID
- Public read ACL for uploaded files

#### 3. `src/controllers/uploadController.js`
Three endpoints:
- `POST /api/upload/property-images` - Upload multiple property images
- `POST /api/upload/profile-image` - Upload single profile image
- `DELETE /api/upload/delete-image` - Delete image from S3

#### 4. `src/routes/uploadRoutes.js`
- Protected routes (require authentication)
- Error handling middleware
- Route registration

#### 5. `src/server.js`
- Registered upload routes at `/api/upload`

### Environment Variables (.env)

```env
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=your-bucket-name
```

### Security Features

1. **Authentication Required**: All upload endpoints require JWT authentication
2. **File Type Validation**: Only image files allowed (JPEG, PNG, WebP, GIF)
3. **File Size Limits**: Maximum 5MB per file
4. **Upload Count Limits**: Maximum 10 files per request
5. **Unique Filenames**: UUID + timestamp prevents conflicts
6. **IAM Minimal Permissions**: S3 user has only necessary permissions
7. **Public Read Only**: Files are publicly readable but not writable

### File Storage Structure

```
S3 Bucket
└── properties/
    ├── uuid1-timestamp.jpg
    ├── uuid2-timestamp.png
    └── uuid3-timestamp.webp
```

Future expansion:
```
S3 Bucket
├── properties/
├── profiles/
├── agencies/
└── agents/
```

## Frontend Implementation

### Files Created/Modified

#### 1. `frontend/src/components/common/ImageUpload.jsx`

**Features**:
- Drag-and-drop file selection (via file input)
- Multiple file upload support
- Real-time upload progress
- Image preview with thumbnails
- Primary image selection
- Image caption editing
- Delete uploaded images
- Validation feedback
- Responsive grid layout

**Props**:
```javascript
<ImageUpload
  images={array}        // Array of image objects
  onChange={function}   // Callback when images change
  maxImages={number}    // Max number of images (default: 10)
/>
```

**Image Object Structure**:
```javascript
{
  url: "https://bucket.s3.amazonaws.com/properties/uuid-timestamp.jpg",
  key: "properties/uuid-timestamp.jpg",  // For deletion
  caption: "Living room",
  isPrimary: true
}
```

#### 2. `frontend/src/pages/AddProperty.jsx`

**Changes**:
- Removed old URL input fields
- Removed `handleImageChange`, `addImageField`, `removeImageField` functions
- Added `handleImagesChange` function
- Integrated `ImageUpload` component in Step 5
- Updated initial state: `images: []` instead of `[{ url: '', ... }]`

**Usage in Step 5**:
```jsx
<ImageUpload
  images={formData.images}
  onChange={handleImagesChange}
  maxImages={10}
/>
```

### API Integration

The `ImageUpload` component uses these API endpoints:

```javascript
// Upload images
POST /api/upload/property-images
Headers: { Authorization: "Bearer <token>" }
Body: FormData with multiple files

// Delete image
DELETE /api/upload/delete-image
Headers: { Authorization: "Bearer <token>" }
Body: { key: "properties/uuid-timestamp.jpg" }
```

## User Workflow

### Adding Property Images

1. User navigates to "Add Property" page
2. Fills in Steps 1-4 (property info)
3. On Step 5 (Images):
   - Clicks "Select Images" button
   - Selects multiple images from device
   - Images are validated (type, size)
   - Files upload to S3 with progress indicator
   - Uploaded images appear in grid preview
4. User can:
   - Add more images (up to 10 total)
   - Set primary image (first is default)
   - Add captions to images
   - Delete unwanted images
5. User submits property form
6. Property saved with S3 image URLs

### Image Display

- Public properties page: Shows uploaded images
- Property detail page: Image gallery with thumbnails
- User dashboard: Property thumbnails

## Testing

### Local Testing

1. Set up AWS S3 bucket (see `AWS_S3_SETUP_GUIDE.md`)
2. Add credentials to `.env`
3. Start backend: `npm run dev`
4. Start frontend: `npm run dev`
5. Login and navigate to Add Property
6. Test image upload in Step 5

### Test Checklist

- [ ] Can select multiple images
- [ ] Upload progress shows
- [ ] Images appear after upload
- [ ] Can set primary image
- [ ] Can add captions
- [ ] Can delete images
- [ ] Validation works (file type, size, count)
- [ ] Submitted property has image URLs
- [ ] Images display in property listing
- [ ] Images display in property detail
- [ ] Images load from S3 CDN

## Performance Considerations

1. **File Size Limits**: 5MB max prevents large uploads
2. **Image Count Limits**: 10 max prevents excessive storage
3. **CDN Delivery**: S3 serves images with CloudFront-like speed
4. **Lazy Loading**: Images load on demand in frontend
5. **Thumbnail Generation**: (Future) Generate thumbnails for faster loading

## Future Enhancements

### Planned Features

1. **Image Optimization**
   - Add Sharp library for image compression
   - Generate multiple sizes (thumbnail, medium, large)
   - Convert to WebP format automatically

2. **Additional Upload Points**
   - User profile pictures
   - Agent profile photos
   - Agency logos

3. **Advanced Features**
   - Drag-and-drop file upload
   - Image cropping/editing
   - Watermark application
   - Bulk upload/delete
   - Upload from URL

### Implementation Example for Profile Pictures

```javascript
// Backend: src/controllers/uploadController.js
exports.uploadProfileImage = async (req, res) => {
  // Already implemented!
  // Returns single image URL
};

// Frontend: New component
<ProfileImageUpload
  currentImage={user.profilePicture}
  onUpload={(imageUrl) => updateProfile({ profilePicture: imageUrl })}
/>
```

## Troubleshooting

### Common Issues

**Upload fails with "Access Denied"**
- Check AWS credentials in `.env`
- Verify IAM policy permissions
- Ensure bucket name is correct

**CORS errors in browser**
- Add CORS configuration to S3 bucket
- Include frontend URL in AllowedOrigins

**Images don't load**
- Verify bucket policy allows public read
- Check "Block all public access" is OFF
- Test S3 URL directly in browser

**Upload is slow**
- Check file sizes (max 5MB)
- Verify internet connection
- Consider image compression

### Debug Steps

1. Check browser console for errors
2. Check network tab for failed requests
3. Check backend logs for S3 errors
4. Verify AWS credentials are set
5. Test S3 bucket access directly

## Cost Monitoring

### Free Tier Limits
- Storage: 5 GB
- PUT requests: 2,000/month
- GET requests: 20,000/month

### Estimated Usage
- Average property: 5-8 images
- Average image size: 2-3 MB
- 100 properties: ~1.5 GB storage
- Safe for free tier ✅

### Stay Within Limits
1. Delete test images regularly
2. Monitor AWS Free Tier dashboard
3. Set billing alerts at $1
4. Review usage monthly

## Dependencies

### Backend
```json
{
  "@aws-sdk/client-s3": "^3.x",
  "multer": "^1.x",
  "multer-s3": "^3.x",
  "sharp": "^0.x",
  "uuid": "^9.x"
}
```

### Frontend
```json
{
  "react-toastify": "^9.x"
}
```

## Security Checklist

- [x] AWS credentials in environment variables (not in code)
- [x] `.env` file in `.gitignore`
- [x] Minimal IAM permissions (S3 only)
- [x] File type validation
- [x] File size limits
- [x] Authentication required for uploads
- [x] Public read-only access (no write)
- [x] Unique filenames prevent conflicts
- [x] HTTPS only (S3 default)

## References

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [Multer Documentation](https://github.com/expressjs/multer)
- [Multer-S3 Documentation](https://github.com/badunk/multer-s3)
- [Sharp Documentation](https://sharp.pixelplumbing.com/)

---

For AWS S3 setup instructions, see `AWS_S3_SETUP_GUIDE.md`
