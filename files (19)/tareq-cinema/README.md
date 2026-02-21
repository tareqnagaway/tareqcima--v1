# 🎬 Tareq Cinema | طارق سينما

<div align="center">
  <img src="./public/logo.png" alt="Tareq Cinema Logo" width="200"/>
  
  ### Premium Streaming Platform - سينماك في منزلك
  
  [![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
  [![TMDB](https://img.shields.io/badge/TMDB-API-01d277?logo=themoviedatabase)](https://www.themoviedb.org/)
</div>

---

## ✨ Features

### 🎯 Core Features
- 🌐 **Multi-language Support** - Arabic (RTL) & English (LTR)
- 🎭 **Luxurious Dark Mode** - Cinematic UI with gold accents
- 📱 **Fully Responsive** - Mobile, Tablet, Desktop optimized
- ⚡ **High Performance** - Next.js 14 App Router, SWR caching
- 🔍 **Advanced Search** - Real-time search with filters
- 🎬 **Netflix-style Slider** - Smooth horizontal scrolling

### 🎥 Content Features
- 🔥 **Trending Content** - Daily/Weekly trending movies & series
- ⭐ **Top Rated** - Highest rated content
- 📅 **Upcoming** - Soon-to-be-released movies
- 🎭 **Genre Categories** - Action, Drama, Comedy, etc.
- 📺 **TV Series Support** - Full series with seasons & episodes

### 🎮 Player Features
- 🎥 **Multi-Source Player** - Automatic fallback (VidSrc, 2Embed, AutoEmbed, etc.)
- ⏯️ **Smart Controls** - Auto-hide controls, fullscreen, keyboard shortcuts
- 📊 **Watch Progress** - Track viewing progress
- 💾 **Continue Watching** - Resume from where you left off

### 👤 User Features (Optional Auth)
- ❤️ **My List / Watchlist** - Save favorites
- 💬 **Comments & Reviews** - (Coming with Auth)
- ⭐ **Ratings** - Rate movies and series
- 📝 **Watch History** - Track what you've watched

### 📈 SEO & Analytics
- 🔍 **Advanced SEO** - Dynamic meta tags, OpenGraph, JSON-LD schema
- 📊 **Google Analytics** - Track user behavior
- 💰 **Google AdSense** - Monetization ready
- 🗺️ **Dynamic Sitemap** - Auto-generated for search engines

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- TMDB API Key ([Get one here](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/tareq-cinema.git
cd tareq-cinema
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure environment variables**
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your API keys:
```env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url (optional)
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key (optional)
NEXT_PUBLIC_GOOGLE_ADSENSE_ID=ca-pub-xxxxxx (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX (optional)
```

4. **Add your logo**
```bash
# Place your logo at: public/logo.png
# Recommended size: 400x400px (transparent PNG)
```

5. **Run development server**
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📦 Project Structure

```
tareq-cinema/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Homepage
│   ├── movie/[id]/          # Movie details page
│   ├── series/[id]/         # TV series details page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── Navbar.tsx           # Navigation bar
│   ├── Hero.tsx             # Hero slider
│   ├── MovieCard.tsx        # Movie/series card
│   ├── MovieRow.tsx         # Horizontal scroll row
│   ├── VideoPlayer.tsx      # Video player with fallbacks
│   └── Footer.tsx           # Footer
├── lib/                     # Utilities & helpers
│   ├── tmdb.ts              # TMDB API wrapper
│   ├── i18n.ts              # Translations
│   └── store.ts             # Zustand state management
├── public/                  # Static assets
│   ├── logo.png             # Your logo
│   ├── favicon.ico          # Favicon
│   └── og-image.jpg         # Social media image
└── ...config files
```

---

## 🎨 Customization

### Colors
Edit `tailwind.config.js`:
```js
colors: {
  'tareq-gold': '#D4AF37',      // Primary gold
  'tareq-red': '#DC143C',        // Accent red
  'tareq-dark': '#0a0a0a',      // Background
}
```

### Fonts
The project uses:
- **Arabic**: Tajawal, Cairo
- **English**: Outfit, Sora
- **Display**: Cinzel, Playfair Display

Change in `app/layout.tsx`.

### Translations
Edit `lib/i18n.ts` to add/modify translations.

---

## 🌐 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Vercel**
```bash
npm i -g vercel
vercel
```

Or use [Vercel Dashboard](https://vercel.com/new):
- Import your GitHub repo
- Add environment variables
- Deploy! 🚀

### Manual Build
```bash
npm run build
npm run start
```

---

## 🔧 Configuration

### Video Sources
Edit `components/VideoPlayer.tsx` to add/remove video sources:
```ts
const VIDEO_SOURCES = [
  { name: 'VidSrc', getUrl: ... },
  { name: '2Embed', getUrl: ... },
  // Add more sources here
];
```

### SEO
Edit metadata in `app/layout.tsx`:
```ts
export const metadata: Metadata = {
  title: 'Your Site Name',
  description: 'Your description',
  // ...
};
```

---

## 📊 Analytics Setup

### Google Analytics
1. Create a GA4 property
2. Add measurement ID to `.env.local`:
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Google AdSense
1. Apply for AdSense
2. Add publisher ID:
```env
NEXT_PUBLIC_GOOGLE_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
```

---

## 🔐 Authentication (Optional)

We recommend [Supabase](https://supabase.com) for authentication:

1. Create a Supabase project
2. Add credentials to `.env.local`
3. Uncomment auth code in components

---

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### TMDB API Issues
- Check your API key is valid
- Ensure you're not exceeding rate limits (40 requests/10 seconds)
- Verify your IP isn't blocked

### Video Player Not Loading
- Check browser console for errors
- Try different video sources
- Ensure TMDB ID is correct

---

## 📝 License

This project is for educational purposes. Make sure to comply with:
- TMDB API Terms of Service
- Video embedding service terms
- Copyright laws in your jurisdiction

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push and create a Pull Request

---

## 📧 Support

For questions or issues:
- 📧 Email: support@tareqcinema.com
- 💬 Discord: [Join our server](#)
- 🐦 Twitter: [@tareqcinema](#)

---

## 🙏 Credits

- **TMDB** - Movie/TV data
- **Vercel** - Hosting
- **Next.js** - Framework
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations

---

<div align="center">
  
### Made with ❤️ by Tareq Cinema Team

**⭐ Star this repo if you found it useful!**

</div>
