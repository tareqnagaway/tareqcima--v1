'use client';

import { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getTrendingTVShows,
  getPopularTVShows,
  type Movie,
  type TVShow,
} from '@/lib/tmdb';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MovieRow from '@/components/MovieRow';
import Footer from '@/components/Footer';
import toast from 'react-hot-toast';

export default function HomePage() {
  const locale = useAppStore((state) => state.locale);
  const { t } = useTranslation(locale);
  
  const [heroMovies, setHeroMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [trendingTV, setTrendingTV] = useState<TVShow[]>([]);
  const [popularTV, setPopularTV] = useState<TVShow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all data in parallel
        const [
          trendingMoviesData,
          popularMoviesData,
          topRatedMoviesData,
          upcomingMoviesData,
          trendingTVData,
          popularTVData,
        ] = await Promise.all([
          getTrendingMovies('week', locale === 'ar' ? 'ar-SA' : 'en-US'),
          getPopularMovies(1, locale === 'ar' ? 'ar-SA' : 'en-US'),
          getTopRatedMovies(1, locale === 'ar' ? 'ar-SA' : 'en-US'),
          getUpcomingMovies(1, locale === 'ar' ? 'ar-SA' : 'en-US'),
          getTrendingTVShows('week', locale === 'ar' ? 'ar-SA' : 'en-US'),
          getPopularTVShows(1, locale === 'ar' ? 'ar-SA' : 'en-US'),
        ]);
        
        // Set hero movies (top 5 trending)
        setHeroMovies(trendingMoviesData.results.slice(0, 5));
        
        // Set all categories
        setTrendingMovies(trendingMoviesData.results);
        setPopularMovies(popularMoviesData.results);
        setTopRatedMovies(topRatedMoviesData.results);
        setUpcomingMovies(upcomingMoviesData.results);
        setTrendingTV(trendingTVData.results);
        setPopularTV(popularTVData.results);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error(t('error'), {
          icon: '⚠️',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [locale, t]);
  
  // Set HTML direction based on locale
  useEffect(() => {
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
  }, [locale]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="loading-spinner mx-auto" />
          <p className="text-white text-lg">{t('loading')}</p>
        </div>
      </div>
    );
  }
  
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      {heroMovies.length > 0 && <Hero movies={heroMovies} />}
      
      {/* Content Sections */}
      <div className="relative -mt-20 z-10 space-y-8">
        {/* Trending Movies */}
        {trendingMovies.length > 0 && (
          <MovieRow title={t('trending')} items={trendingMovies} />
        )}
        
        {/* Popular Movies */}
        {popularMovies.length > 0 && (
          <MovieRow title={`${t('popular')} ${t('movies')}`} items={popularMovies} />
        )}
        
        {/* Trending TV Shows */}
        {trendingTV.length > 0 && (
          <MovieRow title={`${t('trending')} ${t('series')}`} items={trendingTV} />
        )}
        
        {/* Top Rated Movies */}
        {topRatedMovies.length > 0 && (
          <MovieRow title={t('topRated')} items={topRatedMovies} />
        )}
        
        {/* Popular TV Shows */}
        {popularTV.length > 0 && (
          <MovieRow title={`${t('popular')} ${t('series')}`} items={popularTV} />
        )}
        
        {/* Upcoming Movies */}
        {upcomingMovies.length > 0 && (
          <MovieRow title={t('upcoming')} items={upcomingMovies} />
        )}
      </div>
      
      <Footer />
    </main>
  );
}
