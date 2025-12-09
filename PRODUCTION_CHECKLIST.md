# Production Deployment Checklist

## ✅ Pre-Deployment Checks

### 1. Environment Variables
- [ ] Create `.env` file with production values
- [ ] Set `NEXT_PUBLIC_APP_URL` to your production domain
- [ ] Configure `MONGODB_URI` with production database
- [ ] Set `NODE_ENV=production`
- [ ] Add search engine verification codes (optional)
- [ ] Set secure `SESSION_SECRET`

### 2. Build Verification
- [x] Build completes successfully (`npm run build`)
- [x] No TypeScript errors
- [x] No linting errors
- [x] All routes generate correctly
- [x] Sitemap.xml generates
- [x] Robots.txt generates
- [x] Manifest.webmanifest generates

### 3. SEO Files
- [x] Metadata configured in layout.tsx
- [x] Open Graph tags configured
- [x] Twitter Card metadata configured
- [x] Structured data (JSON-LD) added
- [x] Sitemap.ts created
- [x] Robots.ts created
- [ ] Create og-image.png (1200x630px)
- [ ] Create icon-192.png (192x192px)
- [ ] Create icon-512.png (512x512px)
- [ ] Create logo.png for structured data

### 4. Security
- [x] Security headers configured in next.config.js
- [x] X-Powered-By header removed
- [x] HTTPS enforced (Strict-Transport-Security)
- [x] XSS protection enabled
- [x] Content-Type-Options configured
- [x] Frame options configured

### 5. Performance
- [x] Compression enabled
- [x] SWC minifier enabled
- [x] Image optimization configured
- [x] Static pages pre-rendered where possible

### 6. Database
- [ ] MongoDB connection tested
- [ ] Database indexes created (if needed)
- [ ] Backup strategy in place

### 7. PM2 Configuration
- [x] Ecosystem config created
- [x] Build script configured
- [ ] Logs directory created (`mkdir -p logs`)
- [ ] PM2 process monitoring set up

## 🚀 Deployment Steps

### Step 1: Build the Application
```bash
npm run build
```

### Step 2: Start with PM2
```bash
# Create logs directory
mkdir -p logs

# Start application
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
```

### Step 3: Verify Deployment
- [ ] Application starts without errors
- [ ] Homepage loads correctly
- [ ] All routes accessible
- [ ] API endpoints working
- [ ] Database connections working
- [ ] File uploads working
- [ ] PDF processing working

### Step 4: SEO Setup
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify robots.txt accessible
- [ ] Test Open Graph tags (Facebook Sharing Debugger)
- [ ] Test Twitter Cards (Twitter Card Validator)
- [ ] Verify structured data (Google Rich Results Test)

### Step 5: Monitoring
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Set up analytics (Google Analytics)
- [ ] Monitor PM2 logs
- [ ] Set up uptime monitoring
- [ ] Configure alerts for downtime

## 📋 Post-Deployment

### Immediate Checks
- [ ] Test all PDF tools
- [ ] Test user registration/login
- [ ] Test file uploads
- [ ] Check console for errors
- [ ] Verify HTTPS is working
- [ ] Check page load speeds

### SEO Verification
- [ ] Google Search Console verified
- [ ] Sitemap submitted
- [ ] Robots.txt accessible
- [ ] Meta tags visible in page source
- [ ] Structured data validated

### Performance
- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals
- [ ] Verify compression working
- [ ] Check CDN (if using)

## 🔧 Maintenance

### Regular Tasks
- [ ] Monitor PM2 logs weekly
- [ ] Check database size monthly
- [ ] Review error logs weekly
- [ ] Update dependencies quarterly
- [ ] Backup database regularly

### Updates
- [ ] Test updates in staging first
- [ ] Run `npm audit` regularly
- [ ] Keep Next.js updated
- [ ] Monitor security advisories

## 📝 Notes

- PM2 will automatically restart the app if it crashes
- Logs are stored in `./logs/` directory
- Build runs automatically before starting in PM2 config
- Application runs on port 3000 by default (configurable in ecosystem.config.js)

