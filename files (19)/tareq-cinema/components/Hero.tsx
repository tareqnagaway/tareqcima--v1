'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Info, Volume2, VolumeX, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getImageUrl, getBackdropUrl, type Movie } from '@/lib/tmdb';
import { useTranslation } from '@/lib/i18n';
import { useAppStore } from '@/lib/store';

interface HeroProps {
  movies: Movie[];
}

export default function Hero({ movies }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const locale = useAppStore((state) => state.locale);
  const { t } = useTranslation(locale);
  
  const currentMovie = movies[currentIndex];
  
  // Auto-rotate hero every 5 seconds
  useEffect(() => {
    if (movies.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [movies.length]);
  
  if (!currentMovie) return null;
  
  const backdropUrl = getBackdropUrl(currentMovie.backdrop_path);
  const title = currentMovie.title || currentMovie.original_title;
  const overview = currentMovie.overview || '';
  const rating = currentMovie.vote_average || 0;
  
  return (
    <div className="relative w-full h-[70vh] lg:h-[85vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={backdropUrl}
              alt={title}
              fill
              className="object-cover"
              priority
              quality={100}
            />
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 hero-gradient" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
          </div>
          
          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 lg:px-8 h-full flex flex-col justify-center lg:justify-end lg:pb-20">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="max-w-2xl space-y-6"
            >
              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white drop-shadow-2xl leading-tight">
                {title}
              </h1>
              
              {/* Rating & Year */}
              <div className="flex items-center gap-4 text-sm md:text-base">
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Star className="w-5 h-5 fill-tareq-gold text-tareq-gold" />
                  <span className="font-bold text-tareq-gold">{rating.toFixed(1)}</span>
                  <span className="text-white/60">/10</span>
                </div>
                
                {currentMovie.release_date && (
                  <div className="bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="font-semibold text-white">
                      {new Date(currentMovie.release_date).getFullYear()}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Overview */}
              <p className="text-base md:text-lg text-white/90 leading-relaxed line-clamp-3 drop-shadow-lg max-w-xl">
                {overview}
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href={`/movie/${currentMovie.id}`}
                  className="btn-primary flex items-center gap-3 text-base md:text-lg group"
                >
                  <Play className="w-5 h-5 md:w-6 md:h-6 fill-black group-hover:scale-110 transition-transform" />
                  <span>{t('watchNow')}</span>
                </Link>
                
                <Link
                  href={`/movie/${currentMovie.id}#details`}
                  className="btn-secondary flex items-center gap-3 text-base md:text-lg group"
                >
                  <Info className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                  <span>{t('moreInfo')}</span>
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Navigation Dots */}
          {movies.length > 1 && (
            <div className="absolute bottom-8 right-8 z-20 flex items-center gap-2">
              {movies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1 transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? 'w-8 bg-tareq-gold'
                      : 'w-6 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
          
          {/* Sound Toggle (for future trailer integration) */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="absolute bottom-8 left-8 z-20 p-3 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 hover:bg-black/60 transition-all duration-300 hover:scale-110"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-white" />
            ) : (
              <Volume2 className="w-5 h-5 text-white" />
            )}
          </button>
        </motion.div>
      </AnimatePresence>
      
      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
}
