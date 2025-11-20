# Portuguese Real Estate CMS - Frontend

A modern, responsive React application for browsing and managing real estate listings in Portugal. Features role-based dashboards, Portuguese market specifics (districts, energy certificates, IMT calculator), and seamless integration with the backend API.

## 🚀 Features

- **Modern React 18** with Hooks and Context API
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Role-Based Access** - Different views for Buyers, Sellers, Agents, and Admins
- **Portuguese Market Integration** - 20 districts, energy certificates, IMT calculator
- **Advanced Property Search** - Filter by district, type, price, bedrooms
- **Authentication System** - JWT-based with persistent login
- **Real-time Data** - React Query for caching and automatic updates
- **Form Validation** - React Hook Form with Yup validation
- **Toast Notifications** - User-friendly feedback
- **Admin Dashboard** - Property approval, user management, statistics

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)
- **Backend API** running - [Backend Repository](https://github.com/YOUR_USERNAME/Real-Estate-CMS-Backend)

## 🛠️ Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/Real-Estate-CMS-Frontend.git
cd Real-Estate-CMS-Frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- **react** (18.2.0) - UI library
- **react-router-dom** (6.20.0) - Client-side routing
- **@tanstack/react-query** (5.8.4) - Data fetching and caching
- **axios** (1.6.2) - HTTP client
- **tailwindcss** (3.3.5) - CSS framework
- **react-hook-form** (7.48.2) - Form handling
- **react-toastify** (9.1.3) - Toast notifications
- **react-icons** (4.12.0) - Icon library
- **vite** (5.0.0) - Build tool and dev server
- And more...

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file:

```env
# Backend API URL
# Development (local backend)
VITE_API_URL=http://localhost:5000/api

# Production (deployed backend)
# VITE_API_URL=https://your-backend-api.fly.dev/api
```

**IMPORTANT:**
- The variable MUST start with `VITE_` (Vite requirement)
- Update the URL to match your backend API location
- For production, use your deployed backend URL (Fly.io, Heroku, etc.)

### Step 4: Ensure Backend is Running

The frontend needs the backend API to function. Make sure your backend is running:

**If running backend locally:**
```bash
# In your backend directory
npm run dev
# Backend should be running at http://localhost:5000
```

**Or use the deployed backend:**
```env
VITE_API_URL=https://your-backend-name.fly.dev/api
```

### Step 5: Start Development Server

```bash
npm run dev
```

The application will open at: `http://localhost:3000`

You should see the homepage with:
- Hero section
- Property search
- Features showcase

## 🎯 Running the Application

### Development Mode (with Hot Reload)

```bash
npm run dev
```

- Server runs on `http://localhost:3000`
- Automatically reloads when you save changes
- Shows helpful error messages

### Build for Production

```bash
npm run build
```

- Creates optimized production build in `dist/` folder
- Minifies code and optimizes assets
- Ready for deployment

### Preview Production Build

```bash
npm run preview
```

- Preview the production build locally
- Runs on `http://localhost:4173`

### Lint Code

```bash
npm run lint
```

## 📱 Application Features

### Public Pages (No Login Required)

#### 1. Home Page (`/`)
- Hero section with search
- Feature highlights
- Call-to-action buttons
- Quick links to properties, agencies, agents

#### 2. Properties Page (`/properties`)
- Browse all approved properties
- **Filters:**
  - District (20 Portuguese districts)
  - Property Type (Apartment, House, Villa, etc.)
  - Price Range (Min/Max)
  - Number of Bedrooms
- Property cards with:
  - Primary image
  - Price in EUR (€)
  - Location (City, District)
  - Bedrooms, Bathrooms, Square Meters
  - Energy Certificate rating
  - Status badge (For Sale, For Rent, etc.)

#### 3. Agencies Page (`/agencies`)
- List of all real estate agencies
- Filter by district
- Filter by verified status
- Agency cards with contact info

#### 4. Agents Page (`/agents`)
- List of all verified agents
- Agent profiles with ratings
- Specializations and languages

#### 5. Login Page (`/login`)
- Email and password authentication
- "Remember me" option
- Link to registration page

#### 6. Register Page (`/register`)
- Create new account
- Choose role:
  - **Buyer** - Browse and save properties
  - **Seller** - List properties
  - **Agent** - Professional account
- Form validation

### Protected Pages (Login Required)

#### 1. Dashboard (`/dashboard`)
- **For Buyers:**
  - Saved favorite properties
  - Saved searches
  - Inquiries sent
  - Reviews written

- **For Sellers:**
  - My properties list
  - Create new property listing
  - View inquiries received
  - Property statistics (views, favorites)

- **For Agents:**
  - All seller features +
  - Agency information
  - Performance metrics
  - Client inquiries

#### 2. My Properties (Sellers/Agents)
- View all your listings
- Edit property details
- Delete properties
- Track views and inquiries

### Admin Pages (Admin Role Only)

#### Admin Dashboard (`/admin`)
- **Overview Statistics:**
  - Total users, properties, agents, agencies
  - Pending approvals
  - Recent activity

- **User Management:**
  - View all users
  - Change user roles
  - Delete users
  - Filter by role

- **Property Management:**
  - View all properties (including pending)
  - Approve/Reject properties
  - Bulk approve multiple properties
  - View rejection reasons
  - Delete properties

- **Agency Management:**
  - Verify agencies
  - View agency statistics
  - Manage agents

## 🇵🇹 Portuguese Market Features

### 20 Portuguese Districts

Properties are organized by district:

**Mainland:**
- Aveiro, Beja, Braga, Bragança, Castelo Branco
- Coimbra, Évora, Faro, Guarda, Leiria
- Lisboa, Portalegre, Porto, Santarém, Setúbal
- Viana do Castelo, Vila Real, Viseu

**Islands:**
- Açores, Madeira

Each district includes major cities for detailed filtering.

### Energy Certificates

All properties display energy efficiency ratings:

- **A+** - Most efficient (Green)
- **A** - Excellent (Green)
- **B, B-** - Good (Yellow-Green)
- **C, D** - Average (Yellow-Orange)
- **E, F** - Poor (Red)
- **Exempt** - Older buildings or special cases
- **Pending** - Certificate in process

Displayed with color-coded badges for easy identification.

### IMT Calculator

**IMT (Imposto Municipal sobre Transmissões)** - Portuguese Property Transfer Tax

The calculator automatically shows estimated tax on property detail pages:

- **Residential Properties:** Progressive rates 0-8%
- **Commercial Properties:** Flat 6.5%
- **Islands (Açores/Madeira):** 20% reduction
- Displays both amount and effective rate

Example:
```
Property: €300,000 (Residential, Lisboa)
IMT: €16,025 (5.34%)
```

### Property Types in Portuguese

All property types use Portuguese terminology:
- Apartamento (Apartment)
- Casa (House)
- Moradia (Villa)
- Terreno (Land)
- Comercial (Commercial)
- Escritório (Office)
- And more...

### Currency & Formatting

- **Currency:** Euro (€) in Portuguese format
- **Numbers:** Portuguese thousands separator
- **Dates:** DD/MM/YYYY format
- **Square Meters:** Primary measurement (auto-converts to sq ft)
- **ZIP Codes:** Portuguese format (XXXX-XXX)

## 🎨 User Interface

### Design System

**Colors:**
- Primary: Blue tones (#0ea5e9, #0284c7)
- Success: Green
- Warning: Yellow
- Danger: Red
- Neutral: Grays

**Typography:**
- Font: System font stack (optimized for Portuguese characters)
- Headings: Bold, clear hierarchy
- Body: 16px base size for readability

**Components:**
- **Buttons:** Primary, Secondary, Danger
- **Cards:** Elevated with hover effects
- **Badges:** Color-coded by status
- **Forms:** Clear labels, validation feedback
- **Loading:** Spinner with Portuguese text

### Responsive Design

**Mobile (< 768px):**
- Hamburger menu
- Single column layouts
- Touch-friendly buttons
- Optimized image sizes

**Tablet (768px - 1024px):**
- 2-column grids
- Collapsible navigation
- Balanced layouts

**Desktop (> 1024px):**
- 3-column grids
- Full navigation bar
- Sidebar filters
- Hover effects

## 📂 Project Structure

```
Real-Estate-CMS-Frontend/
├── src/
│   ├── api/                      # API Service Layer
│   │   ├── axios.js              # Axios configuration
│   │   ├── auth.js               # Authentication APIs
│   │   ├── properties.js         # Property APIs
│   │   ├── agents.js             # Agent APIs
│   │   ├── agencies.js           # Agency APIs
│   │   ├── admin.js              # Admin APIs
│   │   ├── inquiries.js          # Inquiry APIs
│   │   ├── reviews.js            # Review APIs
│   │   └── favorites.js          # Favorites APIs
│   │
│   ├── components/               # React Components
│   │   ├── common/               # Shared Components
│   │   │   ├── Navbar.jsx        # Navigation bar
│   │   │   ├── Footer.jsx        # Footer with links
│   │   │   └── Loading.jsx       # Loading spinner
│   │   ├── property/             # Property Components
│   │   │   ├── PropertyCard.jsx  # Property display card
│   │   │   └── PropertyList.jsx  # Property grid
│   │   ├── agent/                # Agent Components
│   │   ├── agency/               # Agency Components
│   │   └── admin/                # Admin Components
│   │
│   ├── context/                  # React Context
│   │   └── AuthContext.jsx       # Authentication state
│   │
│   ├── hooks/                    # Custom React Hooks
│   │   ├── useProperties.js      # Property data hooks
│   │   └── useAdmin.js           # Admin operations hooks
│   │
│   ├── pages/                    # Page Components
│   │   ├── Home.jsx              # Landing page
│   │   ├── Login.jsx             # Login page
│   │   ├── Register.jsx          # Registration page
│   │   ├── Properties.jsx        # Property listings
│   │   ├── PropertyDetail.jsx    # Single property view
│   │   ├── Dashboard.jsx         # User dashboard
│   │   ├── AdminDashboard.jsx    # Admin panel
│   │   ├── Agents.jsx            # Agent listings
│   │   ├── Agencies.jsx          # Agency listings
│   │   └── NotFound.jsx          # 404 page
│   │
│   ├── routes/                   # Route Protection
│   │   ├── PrivateRoute.jsx      # Authenticated users only
│   │   └── AdminRoute.jsx        # Admin role only
│   │
│   ├── utils/                    # Utility Functions
│   │   ├── constants.js          # App constants
│   │   ├── districts.js          # Portuguese districts data
│   │   ├── imtCalculator.js      # IMT tax calculator
│   │   └── helpers.js            # Helper functions
│   │
│   ├── App.jsx                   # Main App component
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles (Tailwind)
│
├── public/                       # Static Assets
├── index.html                    # HTML template
├── .env.example                  # Environment template
├── .gitignore                    # Git ignore file
├── package.json                  # Dependencies
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind configuration
├── postcss.config.js             # PostCSS configuration
├── netlify.toml                  # Netlify deployment config
└── README.md                     # This file
```

## 🔐 Authentication Flow

1. **Registration:**
   - User fills registration form
   - Frontend sends POST to `/api/auth/register`
   - Backend creates user and returns JWT token
   - Token stored in localStorage
   - User redirected to dashboard

2. **Login:**
   - User enters email/password
   - Frontend sends POST to `/api/auth/login`
   - Backend validates and returns JWT token
   - Token stored in localStorage
   - User redirected to dashboard

3. **Authenticated Requests:**
   - Axios interceptor adds token to all requests
   - Header: `Authorization: Bearer <token>`
   - Backend validates token
   - Returns requested data

4. **Protected Routes:**
   - PrivateRoute checks if user is authenticated
   - Redirects to /login if not authenticated
   - AdminRoute also checks if user has admin role

5. **Logout:**
   - Clear token from localStorage
   - Reset auth context
   - Redirect to home page

## 🚀 Deployment to Netlify

### Method 1: GitHub Integration (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Netlify:**
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub"
   - Select your frontend repository

3. **Configure build settings:**
   - **Branch to deploy:** `main`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 18

4. **Add environment variables:**
   - Go to Site settings → Environment variables
   - Add variable:
     - **Key:** `VITE_API_URL`
     - **Value:** `https://your-backend-api.fly.dev/api`

5. **Deploy:**
   - Click "Deploy site"
   - Wait for build to complete (2-3 minutes)
   - Your site will be live at: `https://random-name.netlify.app`

6. **Custom domain (optional):**
   - Go to Domain settings
   - Add custom domain
   - Follow DNS configuration instructions

### Method 2: Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Build your app
npm run build

# Deploy to production
netlify deploy --prod

# Follow prompts:
# - Publish directory: dist
```

Your site will be deployed and you'll get a live URL.

### Method 3: Drag & Drop

1. Build your app:
   ```bash
   npm run build
   ```

2. Go to [Netlify Drop](https://app.netlify.com/drop)

3. Drag the `dist` folder to the upload area

4. Get your live URL instantly

**Note:** This method doesn't set environment variables. Best for testing only.

## 🔄 Update Backend URL After Deployment

After deploying both frontend and backend:

1. **Update frontend environment variable in Netlify:**
   - Go to Site settings → Environment variables
   - Update `VITE_API_URL` to your Fly.io backend URL
   - Trigger new deployment

2. **Update backend CORS in Fly.io:**
   ```bash
   flyctl secrets set CLIENT_URL="https://your-frontend.netlify.app"
   ```

This allows the frontend and backend to communicate across domains.

## 🧪 Testing the Application

### Test User Registration
1. Go to `/register`
2. Fill in form:
   - Name: "João Silva"
   - Email: "joao@test.com"
   - Password: "senha123"
   - Role: "Buyer"
3. Click "Criar Conta"
4. Should redirect to dashboard
5. Check localStorage has token

### Test Property Browsing
1. Go to `/properties`
2. Properties should load from backend
3. Try filters:
   - Select "Lisboa" district
   - Select "Apartment" type
   - Set price range
4. Click on a property card
5. Should show property details

### Test Authentication
1. Try accessing `/dashboard` without login
2. Should redirect to `/login`
3. Login with test account
4. Should now access dashboard
5. Click "Sair" (logout)
6. Should redirect to home

### Test Admin Features (if you have admin account)
1. Login as admin user
2. Go to `/admin`
3. Check dashboard statistics load
4. Try approving a property
5. Check user management features

## 🐛 Troubleshooting

### "Cannot connect to backend" error

**Problem:** Frontend can't reach backend API

**Solutions:**
1. Check backend is running: `curl http://localhost:5000`
2. Verify `VITE_API_URL` in `.env` is correct
3. Check backend CORS allows your frontend origin
4. Look at browser console for exact error

### Login doesn't work

**Problem:** Can't login even with correct credentials

**Solutions:**
1. Check backend `/api/auth/login` endpoint works (use Postman/curl)
2. Open browser DevTools → Network tab
3. Check the login request:
   - Status should be 200
   - Response should have `token` field
4. Check localStorage stores the token: `localStorage.getItem('token')`

### Properties don't show

**Problem:** Property page is empty

**Solutions:**
1. Check backend has properties: `curl http://localhost:5000/api/properties`
2. Open browser console for errors
3. Check if properties need admin approval (check with backend admin)
4. Verify React Query is fetching: check Network tab

### "Failed to fetch" error

**Problem:** Network request fails immediately

**Solutions:**
1. Check you're online
2. Verify backend URL doesn't have typos
3. Check backend is running and accessible
4. Try accessing backend URL directly in browser

### Styling looks broken

**Problem:** Tailwind CSS not working

**Solutions:**
1. Ensure `npm install` completed successfully
2. Check `tailwind.config.js` exists
3. Restart dev server: `npm run dev`
4. Clear browser cache: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Build fails

**Problem:** `npm run build` fails

**Solutions:**
1. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules
   npm install
   ```
2. Check Node.js version: `node --version` (should be 18+)
3. Look at error message for specific missing dependency
4. Try clearing Vite cache:
   ```bash
   rm -rf node_modules/.vite
   npm run build
   ```

## 🔧 Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VITE_API_URL` | Yes | Backend API base URL | `http://localhost:5000/api` |
| `VITE_GOOGLE_MAPS_API_KEY` | No | Google Maps API key (for maps) | `AIzaSy...` |

**Note:** Variables MUST start with `VITE_` to be accessible in the app.

## 📊 Performance Optimization

The app includes several optimizations:

- **React Query Caching** - Reduces API calls
- **Lazy Loading** - Code splitting for faster initial load
- **Image Optimization** - Responsive images
- **Minification** - Compressed JavaScript and CSS
- **Tree Shaking** - Removes unused code
- **CDN Hosting** - Netlify serves from global CDN

## 🎯 Browser Support

- **Chrome** - Latest 2 versions ✅
- **Firefox** - Latest 2 versions ✅
- **Safari** - Latest 2 versions ✅
- **Edge** - Latest 2 versions ✅
- **Mobile Safari** - iOS 12+ ✅
- **Chrome Mobile** - Latest ✅

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Make your changes
4. Commit with clear message:
   ```bash
   git commit -m "Add amazing feature"
   ```
5. Push to your fork:
   ```bash
   git push origin feature/amazing-feature
   ```
6. Open a Pull Request

### Code Style

- Use functional components with hooks
- Follow existing naming conventions
- Add comments for complex logic
- Keep components small and focused
- Use Tailwind for styling (avoid custom CSS)

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For issues, questions, or contributions:
- **GitHub Issues:** [Create an issue](https://github.com/YOUR_USERNAME/Real-Estate-CMS-Frontend/issues)
- **Email:** support@realestate-cms.pt

## 🙏 Acknowledgments

- **React Team** - Amazing framework
- **Vite** - Blazing fast build tool
- **Tailwind CSS** - Beautiful utility-first CSS
- **TanStack Query** - Powerful data synchronization
- **Netlify** - Easy deployment and hosting

---

**Built for the Portuguese real estate market with ❤️**

Need the backend? Check out the [Backend Repository](https://github.com/YOUR_USERNAME/Real-Estate-CMS-Backend)
