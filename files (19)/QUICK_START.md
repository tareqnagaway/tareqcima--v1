# 🚀 Tareq Cinema - Quick Start Guide

## ⚡ 5-Minute Setup

### 1️⃣ Install (1 minute)
```bash
cd tareq-cinema
npm install
```

### 2️⃣ Configure (30 seconds)
Your TMDB API key is already set: `f505b8b24c4f44c5af10da19a905da3b` ✅

### 3️⃣ Run (30 seconds)
```bash
npm run dev
```

### 4️⃣ Open Browser
Visit: http://localhost:3000 🎉

---

## 🌐 Deploy to Vercel (5 minutes)

### Method 1: One Command
```bash
npm i -g vercel
vercel login
vercel
```

### Method 2: GitHub + Dashboard
1. Push to GitHub
2. Import at vercel.com/new
3. Add env: `NEXT_PUBLIC_TMDB_API_KEY` = `f505b8b24c4f44c5af10da19a905da3b`
4. Deploy! ✨

---

## 📁 Project Structure

```
tareq-cinema/
├── app/                    # Pages
│   ├── page.tsx           # Homepage ⭐
│   ├── movie/[id]/        # Movie details
│   ├── search/            # Search page
│   └── my-list/           # Watchlist
├── components/            # UI Components
│   ├── Navbar.tsx         # Navigation
│   ├── Hero.tsx           # Hero slider
│   ├── MovieCard.tsx      # Movie card
│   ├── VideoPlayer.tsx    # Player with fallbacks
│   └── Footer.tsx         # Footer
├── lib/                   # Utilities
│   ├── tmdb.ts           # TMDB API
│   ├── i18n.ts           # Translations
│   └── store.ts          # State management
└── public/               # Assets
    └── logo.png          # Your logo ✅
```

---

## 🎯 Key Features

✅ **Movies & Series** - Full TMDB integration
✅ **Video Player** - 4 sources with auto-fallback
✅ **Arabic + English** - RTL/LTR support
✅ **Watchlist** - Save favorites
✅ **Search** - Live results
✅ **SEO Optimized** - Google-ready
✅ **Mobile Responsive** - Works everywhere
✅ **PWA Ready** - Installable as app

---

## 🛠️ Customization

### Change Colors
Edit `tailwind.config.js`:
```js
'tareq-gold': '#YOUR_COLOR'
```

### Add Your Logo
Replace `public/logo.png` with your image

### Change Translations
Edit `lib/i18n.ts`

---

## 📚 Documentation

- **Full Guide**: `README.md`
- **Deployment**: `DEPLOYMENT_GUIDE.md`
- **Features**: `FEATURES.md`

---

## 💡 Tips

1. **Test Locally First**: Run `npm run build` before deploying
2. **Check Console**: Look for errors in browser DevTools
3. **TMDB Rate Limit**: Max 40 requests per 10 seconds
4. **Video Issues**: Try different sources in VideoPlayer.tsx

---

## 🐛 Common Issues

**Build Error?**
```bash
rm -rf .next node_modules
npm install
```

**Videos Not Playing?**
- Check TMDB ID is correct
- Try different video source
- Check browser console

**Arabic Not Working?**
- Click language toggle (Globe icon)
- Check `useAppStore` is working

---

## 📞 Need Help?

Check these files in order:
1. `README.md` - Complete documentation
2. `DEPLOYMENT_GUIDE.md` - Deployment steps
3. `FEATURES.md` - All features explained

---

## 🎉 You're Ready!

**What you have:**
- ✅ Complete Next.js 14 streaming platform
- ✅ Production-ready code
- ✅ SEO optimized
- ✅ Multi-language support
- ✅ Video player with fallbacks
- ✅ Beautiful UI

**Next steps:**
1. Test locally
2. Deploy to Vercel
3. Add custom domain (optional)
4. Enable analytics (optional)
5. Add authentication (optional)

---

**Made with ❤️ - Start Building! 🚀**
