'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Plus, Check, Star, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { getImageUrl, type Movie, type TVShow } from '@/lib/tmdb';
import { useAppStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import toast from 'react-hot-toast';

interface MovieCardProps {
  item: Movie | TVShow;
  index?: number;
}

export default function MovieCard({ item, index = 0 }: MovieCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const locale = useAppStore((state) => state.locale);
  const watchlist = useAppStore((state) => state.watchlist);
  const addToWatchlist = useAppStore((state) => state.addToWatchlist);
  const removeFromWatchlist = useAppStore((state) => state.removeFromWatchlist);
  const { t } = useTranslation(locale);
  
  const isMovie = 'title' in item;
  const type = isMovie ? 'movie' : 'tv';
  const title = isMovie ? item.title : (item as TVShow).name;
  const posterUrl = getImageUrl(item.poster_path, 'w500');
  const rating = item.vote_average || 0;
  const year = isMovie 
    ? item.release_date?.split('-')[0] 
    : (item as TVShow).first_air_date?.split('-')[0];
  
  const isInWatchlist = watchlist.some(w => w.id === item.id && w.type === type);
  
  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWatchlist) {
      removeFromWatchlist(item.id, type);
      toast.success(t('removeFromList'), {
        icon: '✓',
      });
    } else {
      addToWatchlist({
        id: item.id,
        type,
        title,
        poster_path: item.poster_path,
        vote_average: rating,
        addedAt: new Date().toISOString(),
      });
      toast.success(t('addToList'), {
        icon: '♥',
      });
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      className="group relative"
    >
      <Link href={`/${type}/${item.id}`} className="block">
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-tareq-gray shadow-lg">
          {/* Poster Image */}
          <Image
            src={posterUrl}
            alt={title}
            fill
            className={`object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            } group-hover:scale-110`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-tareq-gray animate-pulse" />
          )}
          
          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 flex flex-col justify-end p-4 space-y-3">
              {/* Title */}
              <h3 className="text-white font-semibold text-sm md:text-base line-clamp-2 drop-shadow-lg">
                {title}
              </h3>
              
              {/* Rating & Year */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-tareq-gold text-tareq-gold" />
                  <span className="text-white font-medium">{rating.toFixed(1)}</span>
                </div>
                {year && (
                  <span className="text-white/80">{year}</span>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-tareq-gold hover:bg-tareq-gold-light text-black rounded-md transition-all duration-300 font-semibold text-xs"
                >
                  <Play className="w-3 h-3 fill-black" />
                  <span>{t('watchNow')}</span>
                </button>
                
                <button
                  onClick={handleWatchlistToggle}
                  className={`p-2 rounded-md transition-all duration-300 ${
                    isInWatchlist
                      ? 'bg-tareq-gold text-black'
                      : 'bg-white/20 hover:bg-white/30 text-white'
                  }`}
                  aria-label={isInWatchlist ? t('removeFromList') : t('addToList')}
                >
                  {isInWatchlist ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Rating Badge (Always Visible) */}
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-full">
            <Star className="w-3 h-3 fill-tareq-gold text-tareq-gold" />
            <span className="text-white text-xs font-bold">{rating.toFixed(1)}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
