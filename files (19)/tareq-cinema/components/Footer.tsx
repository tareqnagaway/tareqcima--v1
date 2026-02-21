'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Youtube, Mail, Heart } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';

export default function Footer() {
  const locale = useAppStore((state) => state.locale);
  const { t, isRTL } = useTranslation(locale);
  
  const footerLinks = [
    {
      title: t('aboutUs'),
      links: [
        { label: t('aboutUs'), href: '/about' },
        { label: t('contactUs'), href: '/contact' },
        { label: 'Blog', href: '/blog' },
        { label: t('faq'), href: '/faq' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: t('termsOfService'), href: '/terms' },
        { label: t('privacyPolicy'), href: '/privacy' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'DMCA', href: '/dmca' },
      ],
    },
    {
      title: t('movies'),
      links: [
        { label: t('popular'), href: '/movies/popular' },
        { label: t('topRated'), href: '/movies/top-rated' },
        { label: t('upcoming'), href: '/movies/upcoming' },
        { label: t('nowPlaying'), href: '/movies/now-playing' },
      ],
    },
    {
      title: t('series'),
      links: [
        { label: t('popular'), href: '/series/popular' },
        { label: t('topRated'), href: '/series/top-rated' },
        { label: t('trending'), href: '/series/trending' },
      ],
    },
  ];
  
  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/tareqcinema', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/tareqcinema', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/tareqcinema', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/@tareqcinema', label: 'YouTube' },
  ];
  
  return (
    <footer className="relative bg-tareq-darker border-t border-white/10 mt-20" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-16 h-16">
                <Image
                  src="/logo.png"
                  alt="Tareq Cinema Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            
            <h3 className="text-2xl font-display font-bold gradient-text">
              Tareq Cinema
            </h3>
            
            <p className="text-white/60 text-sm leading-relaxed">
              {t('tagline')} • Your premium destination for movies and TV shows
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/10 hover:bg-tareq-gold hover:text-black transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Links Columns */}
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="text-white font-semibold text-lg">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-tareq-gold transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="max-w-xl">
            <h4 className="text-white font-semibold text-lg mb-2">
              {locale === 'en' ? 'Subscribe to our newsletter' : 'اشترك في نشرتنا الإخبارية'}
            </h4>
            <p className="text-white/60 text-sm mb-4">
              {locale === 'en' 
                ? 'Get the latest updates on new releases and exclusive content'
                : 'احصل على آخر التحديثات حول الإصدارات الجديدة والمحتوى الحصري'
              }
            </p>
            
            <form className="flex gap-2">
              <input
                type="email"
                placeholder={locale === 'en' ? 'Enter your email' : 'أدخل بريدك الإلكتروني'}
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-tareq-gold transition-all"
              />
              <button
                type="submit"
                className="btn-primary whitespace-nowrap"
              >
                <Mail className="w-4 h-4 mr-2" />
                {locale === 'en' ? 'Subscribe' : 'اشترك'}
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <p>
              © {new Date().getFullYear()} Tareq Cinema. {t('allRightsReserved')}.
            </p>
            
            <p className="flex items-center gap-2">
              {locale === 'en' ? 'Made with' : 'صُنع بـ'}
              <Heart className="w-4 h-4 fill-tareq-red text-tareq-red" />
              {locale === 'en' ? 'by Tareq Cinema Team' : 'من فريق طارق سينما'}
            </p>
            
            <p className="text-xs text-white/40">
              Powered by TMDB API
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
