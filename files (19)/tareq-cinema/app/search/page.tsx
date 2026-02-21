'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search as SearchIcon, Filter } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MovieCard from '@/components/MovieCard';
import { useAppStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { searchMulti, type Movie, type TVShow } from '@/lib/tmdb';
import toast from 'react-hot-toast';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState<(Movie | TVShow)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [filter, setFilter] = useState<'all' | 'movie' | 'tv'>('all');
  
  const locale = useAppStore((state) => state.locale);
  const addSearchQuery = useAppStore((state) => state.addSearchQuery);
  const { t } = useTranslation(locale);
  
  useEffect(() => {
    if (!query) return;
    
    const fetchResults = async () => {
      try {
        setIsLoading(true);
        addSearchQuery(query);
        
        const data = await searchMulti(query, 1, locale === 'ar' ? 'ar-SA' : 'en-US');
        
        // Filter by type if needed
        let filtered = data.results.filter(
          (item: any) => item.media_type === 'movie' || item.media_type === 'tv'
        );
        
        if (filter !== 'all') {
          filtered = filtered.filter((item: any) => item.media_type === filter);
        }
        
        setResults(filtered);
        setTotalResults(data.total_results);
      } catch (error) {
        console.error('Search error:', error);
        toast.error(t('error'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResults();
  }, [query, filter, locale, t, addSearchQuery]);
  
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <div className="container mx-auto px-4 lg:px-8 py-24">
        {/* Search Header */}
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
            {t('searchResults')}
          </h1>
          
          {query && (
            <p className="text-white/60 text-lg">
              {totalResults} {totalResults === 1 ? 'result' : 'results'} for "{query}"
            </p>
          )}
          
          {/* Filters */}
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-white/60" />
            <div className="flex gap-2">
              {['all', 'movie', 'tv'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type as typeof filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === type
                      ? 'bg-tareq-gold text-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {type === 'all' ? 'All' : type === 'movie' ? t('movies') : t('series')}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="loading-spinner" />
          </div>
        )}
        
        {/* Results Grid */}
        {!isLoading && results.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {results.map((item, index) => (
              <MovieCard key={`${item.id}-${index}`} item={item} index={index} />
            ))}
          </div>
        )}
        
        {/* No Results */}
        {!isLoading && results.length === 0 && query && (
          <div className="text-center py-20">
            <SearchIcon className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">{t('noResults')}</h3>
            <p className="text-white/60">{t('tryDifferentSearch')}</p>
          </div>
        )}
        
        {/* Empty State */}
        {!query && (
          <div className="text-center py-20">
            <SearchIcon className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">
              {locale === 'en' ? 'Start searching' : 'ابدأ البحث'}
            </h3>
            <p className="text-white/60">{t('searchPlaceholder')}</p>
          </div>
        )}
      </div>
      
      <Footer />
    </main>
  );
}
