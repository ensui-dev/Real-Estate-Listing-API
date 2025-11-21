# Complete Setup Guide - Portuguese Real Estate CMS
## From Zero to Running Application

This guide will walk you through setting up both the backend and frontend from scratch.

---

## Prerequisites

Before starting, ensure you have:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)
- **MongoDB Atlas Account** (free) - [Sign up here](https://www.mongodb.com/cloud/atlas/register)
- **Code Editor** (VS Code recommended)

---

## Part 1: Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Cluster

1. **Sign up/Login** to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

2. **Create a New Project**
   - Click "New Project"
   - Name it: `portuguese-realestate-cms`
   - Click "Create Project"

3. **Create a Cluster**
   - Click "Build a Database"
   - Choose **M0 FREE** tier
   - **Cloud Provider**: AWS
   - **Region**: Choose closest to Portugal (e.g., `eu-west-1` - Ireland or `eu-central-1` - Frankfurt)
   - **Cluster Name**: `Cluster0` (default is fine)
   - Click "Create"
   - Wait 3-5 minutes for cluster creation

### Step 2: Create Database User

1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. **Authentication Method**: Password
4. **Username**: `realestateadmin` (or your choice)
5. **Password**: Click "Autogenerate Secure Password" and **SAVE IT SOMEWHERE SAFE**
6. **Database User Privileges**: Select "Read and write to any database"
7. Click "Add User"

### Step 3: Configure Network Access

1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. **For Development**: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - ⚠️ For production, restrict to specific IPs
4. Click "Confirm"

### Step 4: Get Connection String

1. Go back to "Database" (left sidebar)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. **Driver**: Node.js
5. **Version**: 5.5 or later
6. Copy the connection string - it looks like:
   ```
   mongodb+srv://realestateadmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
7. **IMPORTANT**: Replace `<password>` with your actual password from Step 2
8. **SAVE THIS CONNECTION STRING** - you'll need it soon

---

## Part 2: Backend Setup

### Step 1: Clone Backend Repository

```bash
# Navigate to where you want to store your projects
cd ~/projects

# Clone the backend repository
git clone <your-backend-repo-url> real-estate-backend

# Navigate into backend directory
cd real-estate-backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages (Express, Mongoose, JWT, etc.)

### Step 3: Create Environment File

```bash
# Create .env file from example
cp .env.example .env
```

Now **edit the `.env` file** with your preferred editor:

```bash
# For VS Code:
code .env

# Or use nano:
nano .env
```

**Update these values:**

```env
NODE_ENV=development
PORT=5000

# PASTE YOUR MONGODB CONNECTION STRING HERE (from Part 1, Step 4)
MONGODB_URI=mongodb+srv://realestateadmin:YOUR_PASSWORD_HERE@cluster0.xxxxx.mongodb.net/real-estate-cms?retryWrites=true&w=majority

# Generate a secure JWT secret (see command below)
JWT_SECRET=your_super_secure_jwt_secret_key_here_minimum_32_characters

# JWT token expiration
JWT_EXPIRE=30d

# Frontend URL (we'll set this up next)
CLIENT_URL=http://localhost:3000
```

**To generate a secure JWT_SECRET**, run this command:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy the output and paste it as your `JWT_SECRET` value.

### Step 4: Start Backend Server

```bash
npm run dev
```

**You should see:**
```
Server running on port 5000
MongoDB Connected: cluster0-xxxxx.mongodb.net
```

✅ **Backend is now running on http://localhost:5000**

**Test it:**
```bash
# In a new terminal window:
curl http://localhost:5000/api/v1/properties
```

You should get: `{"success":true,"count":0,"data":[]}`

### Step 5: Create Admin User (Optional but Recommended)

Keep the backend running, and in a **new terminal**:

```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "Admin123!",
    "role": "admin"
  }'
```

**Save the token** from the response - you'll need it to access admin routes.

---

## Part 3: Frontend Setup

### Step 1: Clone Frontend Repository

Open a **new terminal window** (keep backend running in the other):

```bash
# Navigate to your projects folder
cd ~/projects

# Clone the frontend repository
git clone <your-frontend-repo-url> real-estate-frontend

# Navigate into frontend directory
cd real-estate-frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install React, Vite, Tailwind CSS, React Query, Axios, and other dependencies.

### Step 3: Create Environment File

```bash
# Create .env file from example
cp .env.example .env
```

**Edit the `.env` file:**

```bash
code .env
# or
nano .env
```

**Set the backend URL:**

```env
# For local development
VITE_API_URL=http://localhost:5000/api/v1

# For production (update after deploying backend to Fly.io)
# VITE_API_URL=https://your-app-name.fly.dev/api/v1
```

### Step 4: Start Frontend Development Server

```bash
npm run dev
```

**You should see:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

✅ **Frontend is now running on http://localhost:3000**

---

## Part 4: Test the Full Stack

Now you have:
- **Database**: MongoDB Atlas (cloud)
- **Backend**: Running on http://localhost:5000
- **Frontend**: Running on http://localhost:3000

### Test the Application

1. **Open your browser** to http://localhost:3000

2. **You should see the home page** with:
   - Portuguese Real Estate CMS header
   - Hero section
   - Navigation menu

3. **Test Registration:**
   - Click "Registar" (Register)
   - Fill in the form
   - Submit
   - You should be logged in and redirected to dashboard

4. **Test Login:**
   - Click "Entrar" (Login)
   - Use your credentials
   - You should see the dashboard

5. **Browse Properties:**
   - Click "Propriedades" (Properties)
   - You should see property filters and listing grid
   - Initially empty (no properties yet)

---

## Part 5: Verify Everything is Connected

### Check Backend Logs

In your backend terminal, you should see requests coming in:

```
GET /api/v1/properties 200 - 15.234 ms
POST /api/v1/auth/login 200 - 156.789 ms
```

### Check Database

1. Go to **MongoDB Atlas Dashboard**
2. Click "Browse Collections" on your cluster
3. You should see the `real-estate-cms` database
4. Collections: `users`, `properties`, `agents`, `agencies`, etc.
5. Click `users` to see registered users

---

## Part 6: Working Directory Structure

You should now have:

```
~/projects/
├── real-estate-backend/          # Backend repository
│   ├── src/
│   │   ├── models/               # Mongoose schemas
│   │   ├── controllers/          # Business logic
│   │   ├── routes/               # API endpoints
│   │   ├── middleware/           # Auth, error handling
│   │   └── utils/                # Helpers
│   ├── .env                      # Backend environment variables
│   ├── package.json
│   └── server.js                 # Entry point
│
└── real-estate-frontend/         # Frontend repository
    ├── src/
    │   ├── api/                  # API client functions
    │   ├── components/           # React components
    │   ├── pages/                # Page components
    │   ├── context/              # Auth context
    │   ├── hooks/                # Custom hooks
    │   └── utils/                # Helpers, constants
    ├── .env                      # Frontend environment variables
    ├── package.json
    └── vite.config.js            # Vite configuration
```

---

## Common Workflows

### Daily Development Workflow

```bash
# Terminal 1 - Backend
cd ~/projects/real-estate-backend
npm run dev

# Terminal 2 - Frontend
cd ~/projects/real-estate-frontend
npm run dev
```

### Stopping the Applications

- Press `Ctrl + C` in each terminal to stop the servers

### Restarting After Changes

**Backend:**
- If using `npm run dev` (with nodemon), it auto-restarts on file changes
- If server doesn't restart, press `Ctrl + C` and run `npm run dev` again

**Frontend:**
- Vite auto-reloads on file changes
- Just save your files and check the browser

---

## Troubleshooting

### Backend Won't Start

**Problem:** `MongooseServerSelectionError: Could not connect to any servers`

**Solutions:**
1. Check your `MONGODB_URI` in `.env` - ensure password is correct
2. Verify MongoDB Atlas Network Access allows your IP
3. Check if MongoDB Atlas cluster is running (green status)

---

**Problem:** `Port 5000 already in use`

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process (use PID from above command)
kill -9 <PID>

# Or change PORT in .env to 5001
```

---

### Frontend Won't Start

**Problem:** `ECONNREFUSED` when fetching data

**Solutions:**
1. Ensure backend is running on `http://localhost:5000`
2. Check `VITE_API_URL` in frontend `.env` matches backend URL
3. Restart frontend dev server after changing `.env`

---

**Problem:** `401 Unauthorized` errors

**Solutions:**
1. Token might be expired - logout and login again
2. Clear localStorage in browser DevTools (Application → Storage → Clear)
3. Backend `JWT_SECRET` changed - regenerate tokens

---

### CORS Errors

**Problem:** `Access to fetch blocked by CORS policy`

**Solution:**
Check backend `.env` has correct `CLIENT_URL`:
```env
CLIENT_URL=http://localhost:3000
```

Ensure `server.js` has CORS configured:
```javascript
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
```

---

## Next Steps

### Add Sample Data

Create some properties to test the application:

1. Login as admin
2. Use Postman or cURL to create properties via API
3. Or create a seed script in backend

### Deploy to Production

When ready to deploy:

1. **Backend to Fly.io**: See `BACKEND-README.md` → Deployment section
2. **Frontend to Netlify**: See `FRONTEND-README.md` → Deployment section
3. Update environment variables with production URLs

---

## Quick Reference

### Backend
- **URL**: http://localhost:5000
- **API Base**: http://localhost:5000/api/v1
- **Logs**: Terminal running `npm run dev`
- **Restart**: `Ctrl + C` then `npm run dev`

### Frontend
- **URL**: http://localhost:3000
- **Logs**: Terminal running `npm run dev`
- **Restart**: Usually auto-reloads, or `Ctrl + C` then `npm run dev`

### Database
- **MongoDB Atlas**: https://cloud.mongodb.com
- **View Data**: Database → Browse Collections
- **Connection String**: Saved in backend `.env`

---

## Getting Help

If you encounter issues:

1. Check the detailed documentation:
   - **Backend**: See `BACKEND-README.md`
   - **Frontend**: See `FRONTEND-README.md`

2. Check logs in both terminal windows

3. Verify environment variables are correct

4. Ensure all services are running:
   - MongoDB Atlas cluster (green status)
   - Backend server (port 5000)
   - Frontend dev server (port 3000)

---

**You're all set! 🚀**

Happy coding with your Portuguese Real Estate CMS!
