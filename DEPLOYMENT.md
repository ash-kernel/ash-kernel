# 🚀 Deployment Guide

This guide covers multiple deployment options for your portfolio.

## Table of Contents
- [Vercel (Recommended)](#vercel-recommended)
- [Netlify](#netlify)
- [Docker](#docker)
- [Manual Server](#manual-server)

---

## Vercel (Recommended)

Vercel is the creator of Next.js and offers the best deployment experience.

### Prerequisites
- GitHub account
- Vercel account (free)

### Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Configure Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration steps

### Environment Variables (Optional)

If you want higher GitHub API rate limits:
1. Generate a GitHub Personal Access Token
2. In Vercel: Settings → Environment Variables
3. Add `GITHUB_TOKEN` with your token

**Deploy Time**: ~2 minutes  
**URL Format**: `your-project.vercel.app`

---

## Netlify

### Prerequisites
- GitHub account
- Netlify account (free)

### Steps

1. **Push to GitHub** (same as Vercel)

2. **Deploy on Netlify**
   - Visit [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repo
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Click "Deploy site"

3. **Configure**
   - Netlify will auto-detect Next.js
   - Essential plugin will be installed automatically

**Deploy Time**: ~3 minutes  
**URL Format**: `your-site.netlify.app`

---

## Docker

Perfect for self-hosting or cloud platforms.

### Create Dockerfile

Create `Dockerfile` in project root:

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Build and Run

```bash
# Build image
docker build -t portfolio .

# Run container
docker run -p 3000:3000 portfolio
```

### Docker Compose (Optional)

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  portfolio:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

---

## Manual Server (VPS/Cloud)

For deployment on your own server (DigitalOcean, AWS, etc.)

### Prerequisites
- Server with Node.js 18+
- Domain name (optional)
- Nginx (recommended)

### Steps

1. **Prepare Server**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Install PM2 (process manager)
   sudo npm install -g pm2
   ```

2. **Deploy Application**
   ```bash
   # Clone repository
   git clone <your-repo-url>
   cd portfolio
   
   # Install dependencies
   npm install
   
   # Build
   npm run build
   
   # Start with PM2
   pm2 start npm --name "portfolio" -- start
   pm2 save
   pm2 startup
   ```

3. **Configure Nginx (Optional)**

   Create `/etc/nginx/sites-available/portfolio`:

   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable and restart:
   ```bash
   sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

4. **SSL with Let's Encrypt (Recommended)**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

---

## Performance Optimization

### After Deployment

1. **Enable Caching**
   - Vercel/Netlify: Automatic
   - Manual: Configure CDN (Cloudflare recommended)

2. **Monitor Performance**
   - Use [PageSpeed Insights](https://pagespeed.web.dev/)
   - Target: 90+ score

3. **Analytics (Optional)**
   - Vercel Analytics
   - Google Analytics
   - Plausible (privacy-friendly)

---

## Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Port Already in Use
```bash
# Change port in package.json
"start": "next start -p 3001"
```

### GitHub API Rate Limit
- Add `GITHUB_TOKEN` environment variable
- Or increase cache duration in `lib/github.ts`

---

## Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All navigation links work
- [ ] Projects fetch from GitHub
- [ ] Images load properly
- [ ] Mobile responsive
- [ ] Command palette works (Ctrl+K)
- [ ] Performance score 90+
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Analytics configured (if desired)

---

## Need Help?

- Next.js Docs: https://nextjs.org/docs
- Vercel Support: https://vercel.com/support
- GitHub Issues: Create an issue in your repo

Happy deploying! 🚀
