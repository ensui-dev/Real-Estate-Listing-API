const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a property title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price cannot be negative']
  },
  propertyType: {
    type: String,
    required: [true, 'Please specify property type'],
    enum: ['house', 'apartment', 'condo', 'land', 'commercial', 'townhouse', 'villa']
  },
  status: {
    type: String,
    required: true,
    enum: ['for-sale', 'for-rent', 'sold', 'rented'],
    default: 'for-sale'
  },
  address: {
    street: {
      type: String,
      required: [true, 'Please provide street address']
    },
    city: {
      type: String,
      required: [true, 'Please provide city']
    },
    state: {
      type: String,
      required: [true, 'Please provide state']
    },
    zipCode: {
      type: String,
      required: [true, 'Please provide zip code']
    },
    country: {
      type: String,
      required: [true, 'Please provide country'],
      default: 'USA'
    }
  },
  bedrooms: {
    type: Number,
    required: [true, 'Please provide number of bedrooms'],
    min: [0, 'Bedrooms cannot be negative']
  },
  bathrooms: {
    type: Number,
    required: [true, 'Please provide number of bathrooms'],
    min: [0, 'Bathrooms cannot be negative']
  },
  squareFeet: {
    type: Number,
    required: [true, 'Please provide square footage'],
    min: [0, 'Square feet cannot be negative']
  },
  yearBuilt: {
    type: Number,
    min: [1800, 'Year built seems too old'],
    max: [new Date().getFullYear() + 1, 'Year built cannot be in the future']
  },
  parkingSpaces: {
    type: Number,
    default: 0,
    min: [0, 'Parking spaces cannot be negative']
  },
  features: [{
    type: String,
    trim: true
  }],
  images: [{
    type: String
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for search optimization
propertySchema.index({ 'address.city': 1, 'address.state': 1, status: 1, propertyType: 1 });
propertySchema.index({ price: 1 });

module.exports = mongoose.model('Property', propertySchema);
