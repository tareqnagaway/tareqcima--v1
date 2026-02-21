import type { Metadata } from 'next';
import { Tajawal, Outfit, Cinzel } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

// Font configurations
const tajawal = Tajawal({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['arabic', 'latin'],
  variable: '--font-arabic',
  display: 'swap',
});

const outfit = Outfit({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-english',
  display: 'swap',
});

const cinzel = Cinzel({
  weight: ['400', '600', '700', '900'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

// Metadata configuration for SEO
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://tareqcinema.com'),
  title: {
    default: 'Tareq Cinema | طارق سينما - Your Premium Streaming Platform',
    template: '%s | Tareq Cinema',
  },
  description: 'منصة طارق سينما - أفضل منصة لمشاهدة الأفلام والمسلسلات أونلاين بجودة عالية. شاهد أحدث الأفلام والمسلسلات العربية والعالمية مجاناً. Tareq Cinema - Watch movies and TV shows online in HD quality.',
  keywords: [
    'أفلام',
    'مسلسلات',
    'أفلام أونلاين',
    'مشاهدة أفلام',
    'طارق سينما',
    'movies',
    'tv shows',
    'streaming',
    'watch online',
    'HD movies',
    'Tareq Cinema',
  ],
  authors: [{ name: 'Tareq Cinema' }],
  creator: 'Tareq Cinema',
  publisher: 'Tareq Cinema',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_SA',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Tareq Cinema',
    title: 'Tareq Cinema | طارق سينما - Premium Streaming Platform',
    description: 'Watch the latest movies and TV shows in HD quality. Your cinema at home.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tareq Cinema',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tareq Cinema | طارق سينما',
    description: 'Watch the latest movies and TV shows in HD quality',
    images: ['/twitter-image.jpg'],
    creator: '@tareqcinema',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  category: 'entertainment',
};

// Viewport configuration
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
};

// JSON-LD Schema for Rich Results
const jsonLdWebsite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Tareq Cinema',
  alternateName: 'طارق سينما',
  url: process.env.NEXT_PUBLIC_SITE_URL,
  description: 'Premium streaming platform for movies and TV shows',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Tareq Cinema',
  url: process.env.NEXT_PUBLIC_SITE_URL,
  logo: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
  sameAs: [
    'https://facebook.com/tareqcinema',
    'https://twitter.com/tareqcinema',
    'https://instagram.com/tareqcinema',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://image.tmdb.org" />
        <link rel="preconnect" href="https://api.themoviedb.org" />
        
        {/* DNS Prefetch for video sources */}
        <link rel="dns-prefetch" href="https://vidsrc.xyz" />
        <link rel="dns-prefetch" href="https://www.2embed.cc" />
        <link rel="dns-prefetch" href="https://vidsrc.me" />
        
        {/* Google AdSense */}
        {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`}
            crossOrigin="anonymous"
          />
        )}
        
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body
        className={`${tajawal.variable} ${outfit.variable} ${cinzel.variable} font-english antialiased bg-black text-white cinema-grain`}
      >
        {children}
        
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: 'rgba(10, 10, 10, 0.95)',
              color: '#fff',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '12px',
              backdropFilter: 'blur(20px)',
            },
            success: {
              iconTheme: {
                primary: '#D4AF37',
                secondary: '#000',
              },
            },
            error: {
              iconTheme: {
                primary: '#DC143C',
                secondary: '#000',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
