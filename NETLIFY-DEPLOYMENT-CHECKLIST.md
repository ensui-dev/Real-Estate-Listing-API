# Netlify Deployment Troubleshooting Checklist

## Error: "Missing script: 'build'"

This error means Netlify can't find `package.json` or the build script in your repository.

---

## Step 1: Verify Your Frontend Repository Structure

Your frontend repository should have these files **in the root directory**:

```
your-frontend-repo/
├── .gitignore
├── index.html
├── package.json          ← MUST BE HERE
├── netlify.toml
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── .env.example
├── README.md
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── api/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── routes/
│   └── utils/
└── public/
```

---

## Step 2: Check Your Local Frontend Repository

Open Git Bash and run these commands:

```bash
# Navigate to your frontend repository
cd ~/Documents/frontend  # or wherever you created it

# Check if package.json exists at the root
ls -la | grep package.json

# If you see package.json, check its contents
cat package.json | grep "build"

# You should see: "build": "vite build",
```

**If you DON'T see package.json**, you need to copy files correctly.

---

## Step 3: Verify Files are Committed to Git

```bash
# Check git status
git status

# Check what files are tracked by git
git ls-files

# You should see package.json in the list
```

**If package.json is NOT in the list**, you need to add and commit it:

```bash
git add package.json
git commit -m "Add package.json"
git push
```

---

## Step 4: Check Your GitHub Repository

1. Go to your frontend repository on GitHub
2. Look at the file list on the main page
3. **You MUST see `package.json` in the root directory**
4. Click on `package.json` to view its contents
5. Verify it has this in the "scripts" section:
   ```json
   "scripts": {
     "dev": "vite",
     "build": "vite build",
     "preview": "vite preview"
   }
   ```

**If you DON'T see package.json on GitHub**, it wasn't pushed correctly.

---

## Step 5: Correct Netlify Configuration

In your Netlify dashboard:

### If Your Repository Root Has package.json:

**Site Settings → Build & deploy → Build settings:**
- **Base directory**: (leave empty)
- **Build command**: `npm run build`
- **Publish directory**: `dist`

### If Your Frontend is in a Subfolder (e.g., /frontend):

**Site Settings → Build & deploy → Build settings:**
- **Base directory**: `frontend`
- **Build command**: `npm run build`
- **Publish directory**: `frontend/dist`

---

## Step 6: Check Environment Variables

**Site Settings → Build & deploy → Environment variables:**

Make sure you have:
- **Key**: `VITE_API_URL`
- **Value**: Your backend URL (e.g., `https://your-app.fly.dev/api/v1`)

---

## Common Issues & Solutions

### Issue 1: Files in Wrong Place

**Problem**: You copied the contents of the `frontend/src` folder but not the root files.

**Solution**:
```bash
cd ~/Documents

# Remove the incorrect folder
rm -rf frontend

# Start fresh - copy the ENTIRE frontend folder from your monorepo
cp -r backend/frontend ./frontend

cd frontend

# Initialize git
git init
git add .
git commit -m "Initial commit: Frontend files"

# Add your GitHub remote (replace with your URL)
git remote add origin https://github.com/YOUR-USERNAME/your-frontend-repo.git

# Push to GitHub
git branch -M main
git push -u origin main --force
```

---

### Issue 2: .gitignore Blocking package.json

**Problem**: `.gitignore` might be blocking `package.json`.

**Solution**:
```bash
# Check .gitignore
cat .gitignore

# If you see "package.json" in there, remove that line
nano .gitignore  # or use your editor

# Force add package.json
git add -f package.json
git commit -m "Add package.json"
git push
```

---

### Issue 3: You're Deploying the Backend Repo

**Problem**: You connected the wrong repository to Netlify.

**Solution**:
1. Go to Netlify Dashboard
2. Click your site
3. Go to **Site settings** → **Build & deploy** → **Link repository**
4. Click **"Link to a different repository"**
5. Choose your **frontend repository** (not backend)

---

## Step 7: Quick Fix - Deploy the Frontend from Current Repo

If you still have the monorepo structure (backend + frontend in one repo), you can deploy from there:

**In Netlify:**
1. Site Settings → Build & deploy → Build settings
2. Set:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
3. Trigger a new deploy

---

## Verification Steps

After fixing the issue, verify:

1. **GitHub shows package.json** at the correct location
2. **Netlify build starts** and shows:
   ```
   npm install
   npm run build
   ```
3. **Build completes** with:
   ```
   dist/index.html                   [xx] kB
   dist/assets/index-xxxxx.js       [xxx] kB
   ```
4. **Site deploys** successfully

---

## Still Having Issues?

Share the following information:

1. Output of: `git ls-files` (from your frontend repo)
2. Your GitHub repository URL (frontend)
3. Screenshot of your Netlify build settings
4. Complete Netlify build log

---

## What I Recommend RIGHT NOW

The fastest solution is:

```bash
# 1. Navigate to where your monorepo is (the one with backend + frontend)
cd ~/Documents/backend

# 2. Go into the frontend folder
cd frontend

# 3. Create a new repo from this folder
git init
git add .
git commit -m "Initial commit: Portuguese Real Estate Frontend"

# 4. Create a new repository on GitHub called "real-estate-frontend"

# 5. Push this frontend folder to it
git remote add origin https://github.com/YOUR-USERNAME/real-estate-frontend.git
git branch -M main
git push -u origin main

# 6. In Netlify, connect to this NEW repository
# 7. Use these settings:
#    Base directory: (empty)
#    Build command: npm run build
#    Publish directory: dist
```

This ensures all files (including package.json) are in the root of your frontend repository.
