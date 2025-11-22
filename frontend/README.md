# Portuguese Real Estate CMS - Frontend

React frontend for the Portuguese Real Estate CMS platform.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **TanStack Query (React Query)** - Data fetching and caching
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form handling
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **React Icons** - Icon library

## Features

- User authentication (login/register)
- Property listings with advanced filtering
- Portuguese market specifics (districts, energy certificates, IMT calculator)
- Role-based access (Buyer, Seller, Agent, Admin)
- Responsive design
- Admin dashboard
- User dashboard
- Property management

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Backend API running (see backend repository)

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your backend API URL
# VITE_API_URL=http://localhost:5000/api
```

### Development

```bash
# Start development server
npm run dev

# Server will run on http://localhost:3000
```

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

For production (Netlify), set in dashboard:
```env
VITE_API_URL=https://your-backend-api.fly.dev/api
```

## Project Structure

```
src/
├── api/              # API service files
│   ├── axios.js      # Axios configuration
│   ├── auth.js       # Authentication APIs
│   ├── properties.js # Property APIs
│   ├── agencies.js   # Agency APIs
│   ├── agents.js     # Agent APIs
│   └── admin.js      # Admin APIs
├── components/       # React components
│   ├── common/       # Shared components
│   ├── property/     # Property components
│   ├── agent/        # Agent components
│   ├── agency/       # Agency components
│   └── admin/        # Admin components
├── context/          # React Context
│   └── AuthContext.jsx
├── hooks/            # Custom React hooks
│   ├── useProperties.js
│   └── useAdmin.js
├── pages/            # Page components
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Properties.jsx
│   ├── Dashboard.jsx
│   └── NotFound.jsx
├── routes/           # Route guards
│   ├── PrivateRoute.jsx
│   └── AdminRoute.jsx
├── utils/            # Utility functions
│   ├── constants.js
│   ├── districts.js
│   ├── imtCalculator.js
│   └── helpers.js
├── App.jsx           # Main App component
├── main.jsx          # Entry point
└── index.css         # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Key Features Implementation

### Authentication
- JWT-based authentication
- Role-based access control
- Protected routes
- Persistent login state

### Property Listings
- Advanced filtering (district, type, price, bedrooms)
- Property cards with images
- Energy certificate display
- IMT calculator
- Favorite properties

### Portuguese Market Features
- 20 Portuguese districts
- Energy certificate ratings (A+ to F)
- IMT (Property Transfer Tax) calculator
- Portuguese currency formatting (EUR)
- Portuguese ZIP code validation
- Square meters (primary) with auto-conversion to sq ft

### User Roles

**Buyer**
- Browse and search properties
- Save favorites
- Submit inquiries
- Leave reviews

**Seller**
- Create and manage property listings
- View inquiries
- Track property statistics

**Agent**
- All seller features
- Agency association
- Professional profile
- Performance metrics

**Admin**
- Dashboard with statistics
- User management
- Property approval/rejection
- Agency verification
- System settings

## Deployment to Netlify

### Option 1: GitHub Integration

1. Push code to GitHub
2. Go to [Netlify](https://app.netlify.com/)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub
5. Select your frontend repository
6. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
7. Add environment variables:
   - `VITE_API_URL` = your backend URL
8. Deploy

### Option 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build
npm run build

# Deploy
netlify deploy --prod
```

## API Integration

All API calls go through the Axios instance (`src/api/axios.js`) which:
- Adds JWT token to requests automatically
- Handles 401 errors (redirects to login)
- Provides consistent error handling
- Returns only the data from responses

Example API usage:

```javascript
import { propertiesAPI } from './api/properties';

// Get properties
const properties = await propertiesAPI.getProperties({ district: 'Lisboa' });

// Create property
const newProperty = await propertiesAPI.createProperty(propertyData);
```

## State Management

- **React Context** for global auth state
- **React Query** for server state (caching, refetching)
- **Local state** for component-specific data

## Styling

Tailwind CSS with custom components:
- `btn-primary` - Primary button
- `btn-secondary` - Secondary button
- `card` - Card container
- `badge` - Badge/tag
- `input-field` - Form input

Custom colors:
- Primary: Blue tones (#0ea5e9)

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Support

For issues and questions, please create an issue in the GitHub repository.

## License

MIT License

---

**Built with ❤️ for the Portuguese real estate market**
