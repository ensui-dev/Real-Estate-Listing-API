# Fly.io Deployment Fix - Port Configuration Issue

## The Problem

Your backend is running successfully, but Fly.io can't connect to it because of a port mismatch:

- **Your app is listening on**: Port 5000
- **Fly.io proxy expects**: Port 3000 (or 8080)

Evidence from logs:
```
✅ Server running in production mode on port 5000
✅ MongoDB Connected: ac-5kangsl-shard-00-02.dl5iyke.mongodb.net

❌ [PC01] instance refused connection. is your app listening on 0.0.0.0:3000?
```

## The Solution

I've created a correct `fly.toml` configuration file that:
1. Sets `PORT=8080` as an environment variable
2. Configures Fly.io proxy to expect port `8080`
3. Your `server.js` will read this PORT and listen on 8080

---

## Fix Steps (In Your Backend Folder)

### Step 1: Copy the Updated fly.toml

From your backend folder on your local machine:

```bash
# Navigate to your backend repository
cd ~/Documents/backend  # or wherever your backend is

# Pull the latest fly.toml from the repo
git pull origin claude/react-frontend-011CUhKekh337AL3Pn71HNnR

# Or manually create fly.toml with the content below
```

**If you need to create it manually, save this as `fly.toml`:**

```toml
# fly.toml app configuration file
app = 'lusitanestate-backend'
primary_region = 'cdg'

[build]

[env]
  PORT = '8080'
  NODE_ENV = 'production'

[http_service]
  internal_port = 8080
  force_https = true
  auto_stop_machines = 'stop'
  auto_start_machines = true
  min_machines_running = 1
  processes = ['app']

  [[http_service.checks]]
    interval = '15s'
    timeout = '10s'
    grace_period = '5s'
    method = 'GET'
    path = '/'

[[vm]]
  memory = '1gb'
  cpu_kind = 'shared'
  cpus = 1
```

### Step 2: Redeploy to Fly.io

```bash
# Make sure you're in your backend folder
cd ~/Documents/backend

# Deploy with the updated configuration
fly deploy
```

### Step 3: Monitor the Deployment

Watch the logs in real-time:

```bash
fly logs
```

You should now see:
```
✅ Server running in production mode on port 8080
✅ MongoDB Connected: ac-5kangsl-shard-00-xx.dl5iyke.mongodb.net
✅ Machine started successfully
```

### Step 4: Test the API

Once deployed, test your API:

```bash
# Check the welcome endpoint
curl https://lusitanestate-backend.fly.dev/

# Should return JSON with API information
```

Or open in your browser:
```
https://lusitanestate-backend.fly.dev/
```

You should see:
```json
{
  "success": true,
  "message": "Welcome to Portuguese Real Estate CMS API",
  "version": "2.0.0",
  ...
}
```

---

## What Changed

### Before (Incorrect):
- No fly.toml or incorrect port configuration
- App listened on port 5000 (default from .env)
- Fly.io proxy expected port 3000
- ❌ Connection refused

### After (Correct):
- fly.toml sets `PORT=8080` environment variable
- App reads PORT from environment (8080)
- Fly.io proxy expects port 8080 (internal_port)
- ✅ Connection successful

---

## Understanding the Configuration

### Port 8080
- This is Fly.io's standard internal port
- Your app will listen on 8080 **inside the Fly.io container**
- Fly.io's proxy forwards HTTPS traffic (443) to your app's internal port (8080)
- Users access your API via: `https://lusitanestate-backend.fly.dev` (port 443)

### Health Checks
The configuration includes health checks:
```toml
[[http_service.checks]]
  method = 'GET'
  path = '/'
```
- Fly.io pings your `/` endpoint every 15 seconds
- If it fails, Fly.io restarts your machine
- This keeps your API healthy

### Auto Stop/Start
```toml
auto_stop_machines = 'stop'
auto_start_machines = true
min_machines_running = 1
```
- Keeps at least 1 machine running
- Stops excess machines when not needed (saves money)
- Auto-starts when traffic comes in

---

## Verification Checklist

After deployment, verify:

- [ ] `fly logs` shows: "Server running in production mode on port 8080"
- [ ] `fly logs` shows: "MongoDB Connected"
- [ ] No "[PC01] instance refused connection" errors
- [ ] `curl https://lusitanestate-backend.fly.dev/` returns JSON
- [ ] Browser access works: https://lusitanestate-backend.fly.dev/
- [ ] Health check passes: `fly checks list`

---

## Update Your Frontend

Once the backend is deployed successfully, update your frontend's environment variable:

### In Netlify:
1. Go to **Site configuration** → **Environment variables**
2. Set `VITE_API_URL` to:
   ```
   https://lusitanestate-backend.fly.dev/api
   ```
   Note: Remove `/v1` if your routes don't use it, or add it if they do

3. Redeploy frontend: **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

---

## Troubleshooting

### Still Getting Port Errors?

**Check your fly.toml:**
```bash
cat fly.toml | grep -A 5 "\[http_service\]"
```

Should show:
```toml
[http_service]
  internal_port = 8080
```

**Check environment variables on Fly.io:**
```bash
fly secrets list
```

**Check if PORT is set:**
```bash
fly ssh console
echo $PORT
# Should output: 8080
exit
```

### MongoDB Connection Issues?

**Verify your MongoDB URI secret:**
```bash
fly secrets list
```

You should see `MONGODB_URI` listed.

**If missing, set it:**
```bash
fly secrets set MONGODB_URI="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/real-estate-cms?retryWrites=true&w=majority"
```

### App Crashes on Startup?

**Check logs for errors:**
```bash
fly logs
```

**Common issues:**
- Missing JWT_SECRET: `fly secrets set JWT_SECRET="your-secret-here"`
- Missing MONGODB_URI: See above
- Missing dependencies: Check package.json is committed

---

## Quick Commands Reference

```bash
# Deploy
fly deploy

# Watch logs in real-time
fly logs

# Check app status
fly status

# List secrets
fly secrets list

# Set a secret
fly secrets set KEY="value"

# SSH into machine
fly ssh console

# Restart app
fly apps restart lusitanestate-backend

# Scale machines
fly scale count 1  # Run 1 machine
fly scale count 2  # Run 2 machines

# Check health
fly checks list
```

---

## Expected Final Result

After fixing and deploying:

1. **Backend URL**: `https://lusitanestate-backend.fly.dev`
2. **API Endpoint**: `https://lusitanestate-backend.fly.dev/api`
3. **Health**: All checks green
4. **Logs**: No errors
5. **Frontend**: Can connect and fetch data

---

## Next Steps

1. Fix the backend deployment (follow steps above)
2. Test the API endpoints
3. Update frontend environment variable
4. Deploy frontend to Netlify
5. Test the full stack application

Your backend code is perfect - it's just a configuration issue! 🚀
