'use client';

import { Heart, Trash2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MovieCard from '@/components/MovieCard';
import { useAppStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';

export default function MyListPage() {
  const locale = useAppStore((state) => state.locale);
  const watchlist = useAppStore((state) => state.watchlist);
  const clearWatchlist = useAppStore((state) => state.clearWatchlist);
  const { t } = useTranslation(locale);
  
  // Convert watchlist items to Movie/TVShow format for MovieCard
  const watchlistItems = watchlist.map((item) => ({
    id: item.id,
    [item.type === 'movie' ? 'title' : 'name']: item.title,
    poster_path: item.poster_path,
    vote_average: item.vote_average,
    [item.type === 'movie' ? 'release_date' : 'first_air_date']: item.addedAt,
    overview: '',
    backdrop_path: null,
    vote_count: 0,
    popularity: 0,
    adult: false,
    genre_ids: [],
    original_language: 'en',
    video: false,
    ...(item.type === 'movie' 
      ? { original_title: item.title }
      : { 
          name: item.title,
          original_name: item.title,
          origin_country: []
        }
    ),
  }));
  
  const handleClearAll = () => {
    if (window.confirm(locale === 'en' 
      ? 'Are you sure you want to clear your entire watchlist?' 
      : 'هل أنت متأكد من حذف جميع عناصر قائمتك؟'
    )) {
      clearWatchlist();
    }
  };
  
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <div className="container mx-auto px-4 lg:px-8 py-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-tareq-gold/20 rounded-full">
              <Heart className="w-8 h-8 text-tareq-gold fill-tareq-gold" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
                {t('myList')}
              </h1>
              <p className="text-white/60 mt-1">
                {watchlist.length} {watchlist.length === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
          
          {watchlist.length > 0 && (
            <button
              onClick={handleClearAll}
              className="btn-ghost flex items-center gap-2 text-sm"
            >
              <Trash2 className="w-4 h-4" />
              <span>{locale === 'en' ? 'Clear All' : 'حذف الكل'}</span>
            </button>
          )}
        </div>
        
        {/* Watchlist Grid */}
        {watchlist.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {watchlistItems.map((item, index) => (
              <MovieCard 
                key={`${item.id}-${index}`} 
                item={item as any}
                index={index}
              />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-white/20" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {locale === 'en' ? 'Your list is empty' : 'قائمتك فارغة'}
            </h3>
            <p className="text-white/60 mb-8">
              {locale === 'en' 
                ? 'Start adding movies and series to your watchlist' 
                : 'ابدأ بإضافة الأفلام والمسلسلات إلى قائمتك'
              }
            </p>
            <a href="/" className="btn-primary inline-flex items-center gap-2">
              <span>{locale === 'en' ? 'Browse Content' : 'تصفح المحتوى'}</span>
            </a>
          </div>
        )}
      </div>
      
      <Footer />
    </main>
  );
}
