'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import MovieCard from './MovieCard';
import { type Movie, type TVShow } from '@/lib/tmdb';

interface MovieRowProps {
  title: string;
  items: (Movie | TVShow)[];
}

export default function MovieRow({ title, items }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.clientWidth * 0.8;
      const newScrollLeft =
        direction === 'left'
          ? rowRef.current.scrollLeft - scrollAmount
          : rowRef.current.scrollLeft + scrollAmount;
      
      rowRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };
  
  if (!items || items.length === 0) return null;
  
  return (
    <div className="relative group/row mb-12">
      {/* Title */}
      <h2 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-white mb-4 px-4 lg:px-8 gradient-text">
        {title}
      </h2>
      
      {/* Scroll Buttons */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 h-full w-12 lg:w-16 bg-gradient-to-r from-black/80 to-transparent flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 hover:from-black/90"
        aria-label="Scroll Left"
      >
        <ChevronLeft className="w-8 h-8 text-white drop-shadow-lg" />
      </button>
      
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 h-full w-12 lg:w-16 bg-gradient-to-l from-black/80 to-transparent flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 hover:from-black/90"
        aria-label="Scroll Right"
      >
        <ChevronRight className="w-8 h-8 text-white drop-shadow-lg" />
      </button>
      
      {/* Movies Grid */}
      <div
        ref={rowRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-4 lg:px-8 pb-2"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            className="flex-none w-[150px] sm:w-[180px] md:w-[200px] lg:w-[220px]"
          >
            <MovieCard item={item} index={index} />
          </div>
        ))}
      </div>
      
      {/* Hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
