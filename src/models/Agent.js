const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  agencyName: {
    type: String,
    required: [true, 'Please provide agency name'],
    trim: true,
    maxlength: [200, 'Agency name cannot be more than 200 characters']
  },
  licenseNumber: {
    type: String,
    required: [true, 'Please provide license number'],
    unique: true,
    trim: true
  },
  specialization: [{
    type: String,
    enum: ['residential', 'commercial', 'luxury', 'rentals', 'land', 'investment']
  }],
  bio: {
    type: String,
    maxlength: [1000, 'Bio cannot be more than 1000 characters']
  },
  yearsOfExperience: {
    type: Number,
    min: [0, 'Years of experience cannot be negative']
  },
  averageRating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5']
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  propertiesListed: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Agent', agentSchema);
