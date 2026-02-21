'use client';

import { useEffect, useState } from 'react';
import { use } from 'react';
import Image from 'next/image';
import { Play, Plus, Check, Star, Calendar, Clock, Share2, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MovieRow from '@/components/MovieRow';
import VideoPlayer from '@/components/VideoPlayer';
import { useAppStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import {
  getMovieDetails,
  getBackdropUrl,
  getImageUrl,
  type MovieDetails,
} from '@/lib/tmdb';
import toast from 'react-hot-toast';

export default function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const movieId = parseInt(unwrappedParams.id);
  
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  
  const locale = useAppStore((state) => state.locale);
  const watchlist = useAppStore((state) => state.watchlist);
  const addToWatchlist = useAppStore((state) => state.addToWatchlist);
  const removeFromWatchlist = useAppStore((state) => state.removeFromWatchlist);
  const { t } = useTranslation(locale);
  
  const isInWatchlist = watchlist.some(w => w.id === movieId && w.type === 'movie');
  
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        const data = await getMovieDetails(movieId, locale === 'ar' ? 'ar-SA' : 'en-US');
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie:', error);
        toast.error(t('error'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMovie();
  }, [movieId, locale, t]);
  
  const handleWatchlistToggle = () => {
    if (!movie) return;
    
    if (isInWatchlist) {
      removeFromWatchlist(movieId, 'movie');
      toast.success(t('removeFromList'));
    } else {
      addToWatchlist({
        id: movieId,
        type: 'movie',
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        addedAt: new Date().toISOString(),
      });
      toast.success(t('addToList'));
    }
  };
  
  const handleShare = async () => {
    try {
      await navigator.share({
        title: movie?.title,
        text: movie?.overview,
        url: window.location.href,
      });
    } catch (error) {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="loading-spinner" />
      </div>
    );
  }
  
  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-xl">Movie not found</p>
      </div>
    );
  }
  
  const backdropUrl = getBackdropUrl(movie.backdrop_path);
  const posterUrl = getImageUrl(movie.poster_path, 'w500');
  const rating = movie.vote_average || 0;
  const year = movie.release_date?.split('-')[0];
  const runtime = movie.runtime;
  const director = movie.credits?.crew.find(c => c.job === 'Director');
  
  return (
    <>
      <main className="min-h-screen bg-black">
        <Navbar />
        
        {/* Hero Section */}
        <div className="relative w-full h-[60vh] lg:h-[80vh]">
          {/* Background */}
          <div className="absolute inset-0">
            <Image
              src={backdropUrl}
              alt={movie.title}
              fill
              className="object-cover"
              priority
              quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
          </div>
          
          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 lg:px-8 h-full flex items-end pb-12">
            <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-end w-full">
              {/* Poster */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="hidden lg:block flex-shrink-0"
              >
                <div className="relative w-64 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border-4 border-tareq-gold/30">
                  <Image
                    src={posterUrl}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
              
              {/* Info */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex-1 space-y-6"
              >
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white drop-shadow-2xl">
                  {movie.title}
                </h1>
                
                {movie.tagline && (
                  <p className="text-xl text-tareq-gold italic">"{movie.tagline}"</p>
                )}
                
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                  <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Star className="w-5 h-5 fill-tareq-gold text-tareq-gold" />
                    <span className="font-bold text-white">{rating.toFixed(1)}</span>
                    <span className="text-white/60">/10</span>
                  </div>
                  
                  {year && (
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
                      <Calendar className="w-4 h-4 text-tareq-gold" />
                      <span className="text-white">{year}</span>
                    </div>
                  )}
                  
                  {runtime && (
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
                      <Clock className="w-4 h-4 text-tareq-gold" />
                      <span className="text-white">{runtime} {t('minutes')}</span>
                    </div>
                  )}
                </div>
                
                {/* Genres */}
                {movie.genres && movie.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span key={genre.id} className="category-badge">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setIsPlayerOpen(true)}
                    className="btn-primary flex items-center gap-3 text-lg"
                  >
                    <Play className="w-6 h-6 fill-black" />
                    <span>{t('watchNow')}</span>
                  </button>
                  
                  <button
                    onClick={handleWatchlistToggle}
                    className={`btn-secondary flex items-center gap-3 ${
                      isInWatchlist ? 'bg-tareq-gold text-black' : ''
                    }`}
                  >
                    {isInWatchlist ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>{t('removeFromList')}</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" />
                        <span>{t('addToList')}</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={handleShare}
                    className="btn-ghost flex items-center gap-3"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>{t('share')}</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Details Section */}
        <div className="container mx-auto px-4 lg:px-8 py-12 space-y-12">
          {/* Overview */}
          <div className="max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
              {t('overview')}
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              {movie.overview}
            </p>
            
            {director && (
              <p className="text-white/60 mt-4">
                <span className="text-tareq-gold font-semibold">Director:</span> {director.name}
              </p>
            )}
          </div>
          
          {/* Cast */}
          {movie.credits?.cast && movie.credits.cast.length > 0 && (
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-6">
                {t('cast')}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {movie.credits.cast.slice(0, 12).map((actor) => (
                  <div key={actor.id} className="text-center space-y-2">
                    <div className="relative aspect-square rounded-full overflow-hidden bg-tareq-gray">
                      {actor.profile_path && (
                        <Image
                          src={getImageUrl(actor.profile_path, 'w200')}
                          alt={actor.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{actor.name}</p>
                      <p className="text-white/60 text-xs">{actor.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Similar Movies */}
          {movie.similar && movie.similar.results.length > 0 && (
            <MovieRow title={t('similar')} items={movie.similar.results} />
          )}
        </div>
        
        <Footer />
      </main>
      
      {/* Video Player Modal */}
      {isPlayerOpen && (
        <VideoPlayer
          movieId={movieId}
          title={movie.title}
          onClose={() => setIsPlayerOpen(false)}
        />
      )}
    </>
  );
}
