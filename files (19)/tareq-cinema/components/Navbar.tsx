'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Menu, X, Globe, User, Heart, LogOut, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const router = useRouter();
  const pathname = usePathname();
  const locale = useAppStore((state) => state.locale);
  const setLocale = useAppStore((state) => state.setLocale);
  const { t, isRTL } = useTranslation(locale);
  
  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle language toggle
  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    setLocale(newLocale);
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLocale;
  };
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };
  
  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/movies', label: t('movies') },
    { href: '/series', label: t('series') },
    { href: '/my-list', label: t('myList') },
  ];
  
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`navbar-glass transition-all duration-300 ${
        isScrolled ? 'py-3 bg-black/95 shadow-lg shadow-black/50' : 'py-5 bg-gradient-to-b from-black/80 to-transparent'
      }`}
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
            <div className="relative w-12 h-12 lg:w-16 lg:h-16">
              <Image
                src="/logo.png"
                alt="Tareq Cinema Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden md:block">
              <h1 className="text-2xl lg:text-3xl font-display font-bold gradient-text">
                Tareq Cinema
              </h1>
              <p className="text-xs text-tareq-gold/80">{t('tagline')}</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all duration-300 hover:text-tareq-gold ${
                  pathname === link.href
                    ? 'text-tareq-gold border-b-2 border-tareq-gold pb-1'
                    : 'text-white/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Right Actions */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 hover:bg-tareq-gold/20 transition-all duration-300 hover:scale-105"
              aria-label="Toggle Language"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{locale.toUpperCase()}</span>
            </button>
            
            {/* User Menu - Will be implemented with Auth */}
            <Link
              href="/login"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-tareq-gold text-black font-semibold hover:bg-tareq-gold-light transition-all duration-300 hover:scale-105"
            >
              <User className="w-4 h-4" />
              <span className="text-sm">{t('login')}</span>
            </Link>
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-white/10 transition-all duration-300"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/10 mt-4"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 text-base font-medium transition-colors ${
                    pathname === link.href ? 'text-tareq-gold' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-tareq-gold/20 transition-all"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">{locale === 'en' ? 'العربية' : 'English'}</span>
                </button>
                
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-tareq-gold text-black font-semibold"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="text-sm">{t('login')}</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
            onClick={() => setIsSearchOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
            
            {/* Search Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-tareq-gold" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="w-full pl-16 pr-6 py-5 bg-tareq-gray/50 backdrop-blur-xl border-2 border-tareq-gold/30 rounded-2xl text-white text-lg focus:outline-none focus:border-tareq-gold transition-all"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-full transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </form>
              
              <p className="mt-4 text-sm text-white/60 text-center">
                {t('searchPlaceholder')}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
