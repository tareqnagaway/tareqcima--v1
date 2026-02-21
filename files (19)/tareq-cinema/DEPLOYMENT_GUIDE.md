# 🚀 Tareq Cinema - Deployment Guide

## 📋 Pre-Deployment Checklist

### 1. Required Accounts
- [ ] GitHub account
- [ ] Vercel account ([vercel.com](https://vercel.com))
- [ ] TMDB API account ([themoviedb.org](https://www.themoviedb.org))
- [ ] (Optional) Supabase account for Auth
- [ ] (Optional) Google Analytics & AdSense accounts

### 2. Required Files
- [ ] Your logo at `public/logo.png` (current: ✅ Film strip logo)
- [ ] favicon.ico (will be generated from logo)
- [ ] og-image.jpg for social media (optional)

---

## 🔧 Step 1: Local Setup

### Install Dependencies
```bash
cd tareq-cinema
npm install
```

### Configure Environment
```bash
cp .env.local .env.local
```

Edit `.env.local`:
```env
# REQUIRED
NEXT_PUBLIC_TMDB_API_KEY=f505b8b24c4f44c5af10da19a905da3b

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=Tareq Cinema

# Optional - Supabase (for Auth & Comments)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Optional - Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_GOOGLE_ADSENSE_ID=
```

### Test Locally
```bash
npm run dev
```
Visit http://localhost:3000 - verify everything works!

---

## 📦 Step 2: Prepare for Production

### Build Test
```bash
npm run build
```

If build succeeds ✅, you're ready!

### Create Production-Optimized Logo
```bash
# Generate different sizes (optional - Vercel will do this)
# 16x16, 32x32, 180x180 (Apple), 192x192, 512x512
```

### Update Metadata
Edit `app/layout.tsx`:
- Change site URL
- Update social media handles
- Add Google verification codes

---

## 🌐 Step 3: Deploy to Vercel

### Method 1: Vercel CLI (Fastest)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

Follow prompts:
- Link to existing project? → No
- Project name? → tareq-cinema
- Directory? → ./
- Override settings? → No

4. **Set Environment Variables**
```bash
vercel env add NEXT_PUBLIC_TMDB_API_KEY
```
Paste your API key when prompted.

5. **Deploy to Production**
```bash
vercel --prod
```

### Method 2: GitHub + Vercel Dashboard (Recommended for teams)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tareq-cinema.git
git push -u origin main
```

2. **Import to Vercel**
- Go to [vercel.com/new](https://vercel.com/new)
- Click "Import Git Repository"
- Select your GitHub repo
- Add environment variables:
  - `NEXT_PUBLIC_TMDB_API_KEY` = `f505b8b24c4f44c5af10da19a905da3b`
  - `NEXT_PUBLIC_SITE_URL` = `https://your-domain.vercel.app`
- Click "Deploy"

---

## 🎯 Step 4: Custom Domain (Optional)

### Add Domain in Vercel
1. Go to Project Settings → Domains
2. Add your domain (e.g., `tareqcinema.com`)
3. Follow DNS configuration instructions:

**For Namecheap/GoDaddy:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.21.21
```

4. Wait for propagation (5-60 minutes)

### Update Environment
```bash
vercel env add NEXT_PUBLIC_SITE_URL production
# Enter: https://tareqcinema.com
```

---

## 📊 Step 5: Analytics Setup

### Google Analytics
1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to Vercel environment:
```bash
vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID production
```

### Google AdSense (Monetization)
1. Apply at [adsense.google.com](https://www.google.com/adsense)
2. Get Publisher ID (ca-pub-XXXXXXXXXXXXXXXX)
3. Add to environment:
```bash
vercel env add NEXT_PUBLIC_GOOGLE_ADSENSE_ID production
```
4. Place ad units in code (see AdSense docs)

---

## 🔐 Step 6: Authentication Setup (Optional)

### Supabase Setup
1. Create project at [supabase.com](https://supabase.com)
2. Go to Project Settings → API
3. Copy:
   - Project URL
   - anon public key
   - service_role key (keep secret!)

4. Add to Vercel:
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
```

5. Create database tables:
```sql
-- Users profile
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Comments
CREATE TABLE comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  movie_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Ratings
CREATE TABLE ratings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  movie_id INTEGER NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 10),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, movie_id)
);
```

---

## 🔍 Step 7: SEO Optimization

### Google Search Console
1. Add property at [search.google.com/search-console](https://search.google.com/search-console)
2. Verify ownership (Vercel DNS TXT record)
3. Submit sitemap: `https://your-domain.com/sitemap.xml`

### Bing Webmaster Tools
1. Add site at [bing.com/webmasters](https://www.bing.com/webmasters)
2. Verify ownership
3. Submit sitemap

---

## 🚀 Step 8: Performance Optimization

### Enable Caching
Already configured in `vercel.json`:
- TMDB API responses cached for 60s
- Static assets cached indefinitely

### Image Optimization
- Vercel automatically optimizes images
- Uses WebP format when supported
- Responsive images for different screen sizes

### Performance Monitoring
- Check [pagespeed.web.dev](https://pagespeed.web.dev)
- Target: 90+ score on mobile & desktop

---

## 📱 Step 9: PWA Installation (Optional)

Users can install Tareq Cinema as an app:

**Desktop:**
- Chrome: Click install icon in address bar
- Edge: Settings → Apps → Install

**Mobile:**
- iOS Safari: Share → Add to Home Screen
- Android Chrome: Menu → Install app

---

## 🔄 Step 10: Continuous Deployment

### Auto-Deploy on Git Push
Vercel automatically deploys when you push to `main`:
```bash
git add .
git commit -m "Update feature X"
git push
```

### Preview Deployments
Every branch gets a preview URL:
```bash
git checkout -b new-feature
# Make changes
git push origin new-feature
```
Vercel creates a preview at: `tareq-cinema-git-new-feature.vercel.app`

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Not Working
```bash
# List all env vars
vercel env ls

# Pull env to local
vercel env pull .env.local
```

### TMDB API Rate Limit
- Limit: 40 requests per 10 seconds
- Solution: Implement caching (already done!)

### Images Not Loading
- Check `next.config.js` has TMDB domain
- Verify TMDB API key is correct

---

## 📈 Post-Launch Checklist

- [ ] Test on multiple devices (mobile, tablet, desktop)
- [ ] Test both languages (Arabic RTL & English LTR)
- [ ] Verify video player works with all sources
- [ ] Check search functionality
- [ ] Test watchlist persistence
- [ ] Verify SEO meta tags (View Source)
- [ ] Submit sitemap to search engines
- [ ] Set up analytics tracking
- [ ] Monitor error logs in Vercel dashboard
- [ ] Test PWA installation
- [ ] Share on social media!

---

## 🎉 Success!

Your Tareq Cinema platform is now live! 🚀

**Next Steps:**
1. Monitor analytics
2. Gather user feedback
3. Add more features (auth, comments, etc.)
4. Scale as needed

**Support:**
- Vercel docs: [vercel.com/docs](https://vercel.com/docs)
- Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)
- TMDB API docs: [developers.themoviedb.org](https://developers.themoviedb.org)

---

## 💰 Cost Estimate

### Free Tier (Good for starting)
- Vercel: Free (100GB bandwidth/month)
- TMDB API: Free (40 req/10s)
- Supabase: Free (500MB database, 2GB storage)
- Domain: $10-15/year

### Pro Tier (For scaling)
- Vercel Pro: $20/month (1TB bandwidth)
- Supabase Pro: $25/month (8GB database)
- CDN: Consider Cloudflare (free)

---

**Made with ❤️ for Tareq Cinema**
