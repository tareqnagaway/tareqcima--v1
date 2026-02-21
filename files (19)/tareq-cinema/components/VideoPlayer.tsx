'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Maximize, Volume2, VolumeX, Play, Pause, Settings, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import toast from 'react-hot-toast';

interface VideoPlayerProps {
  movieId?: number;
  tvId?: number;
  season?: number;
  episode?: number;
  title: string;
  onClose: () => void;
}

// Video source providers in priority order
const VIDEO_SOURCES = [
  {
    name: 'VidSrc',
    getUrl: (type: 'movie' | 'tv', id: number, season?: number, episode?: number) => {
      if (type === 'movie') {
        return `https://vidsrc.xyz/embed/movie/${id}`;
      }
      return `https://vidsrc.xyz/embed/tv/${id}/${season}/${episode}`;
    },
  },
  {
    name: '2Embed',
    getUrl: (type: 'movie' | 'tv', id: number, season?: number, episode?: number) => {
      if (type === 'movie') {
        return `https://www.2embed.cc/embed/${id}`;
      }
      return `https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}`;
    },
  },
  {
    name: 'VidSrc.me',
    getUrl: (type: 'movie' | 'tv', id: number, season?: number, episode?: number) => {
      if (type === 'movie') {
        return `https://vidsrc.me/embed/movie?tmdb=${id}`;
      }
      return `https://vidsrc.me/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`;
    },
  },
  {
    name: 'AutoEmbed',
    getUrl: (type: 'movie' | 'tv', id: number, season?: number, episode?: number) => {
      if (type === 'movie') {
        return `https://autoembed.co/movie/tmdb/${id}`;
      }
      return `https://autoembed.co/tv/tmdb/${id}-${season}-${episode}`;
    },
  },
];

export default function VideoPlayer({
  movieId,
  tvId,
  season,
  episode,
  title,
  onClose,
}: VideoPlayerProps) {
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();
  
  const updateWatchProgress = useAppStore((state) => state.updateWatchProgress);
  const preferences = useAppStore((state) => state.preferences);
  
  const type: 'movie' | 'tv' = movieId ? 'movie' : 'tv';
  const id = movieId || tvId || 0;
  const currentSource = VIDEO_SOURCES[currentSourceIndex];
  const videoUrl = currentSource.getUrl(type, id, season, episode);
  
  // Auto-hide controls
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);
  
  // Track watch progress
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real implementation, you'd get actual progress from the video element
      // For now, we'll just track that the user is watching
      updateWatchProgress({
        id,
        type,
        progress: 0,
        duration: 0,
        lastWatched: new Date().toISOString(),
      });
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [id, type, updateWatchProgress]);
  
  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoading(false);
    setError(false);
  };
  
  // Handle iframe error
  const handleIframeError = () => {
    setIsLoading(false);
    setError(true);
    toast.error(`${currentSource.name} failed to load`, {
      icon: '⚠️',
    });
  };
  
  // Try next source
  const tryNextSource = () => {
    if (currentSourceIndex < VIDEO_SOURCES.length - 1) {
      setCurrentSourceIndex(currentSourceIndex + 1);
      setIsLoading(true);
      setError(false);
      toast.loading(`Trying ${VIDEO_SOURCES[currentSourceIndex + 1].name}...`, {
        duration: 2000,
      });
    } else {
      toast.error('All video sources failed. Please try again later.', {
        icon: '❌',
      });
    }
  };
  
  // Fullscreen
  const toggleFullscreen = () => {
    if (iframeRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        iframeRef.current.requestFullscreen();
      }
    }
  };
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            onClose();
          }
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onClose]);
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
      >
        {/* Video Container */}
        <div className="relative w-full h-full">
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="text-center space-y-4">
                <div className="loading-spinner mx-auto" />
                <p className="text-white text-lg">Loading {currentSource.name}...</p>
              </div>
            </div>
          )}
          
          {/* Error State */}
          {error && !isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="text-center space-y-4 p-8">
                <RefreshCw className="w-16 h-16 text-tareq-gold mx-auto" />
                <h3 className="text-white text-xl font-semibold">Video failed to load</h3>
                <p className="text-white/60">
                  {currentSource.name} couldn't load this video
                </p>
                {currentSourceIndex < VIDEO_SOURCES.length - 1 ? (
                  <button
                    onClick={tryNextSource}
                    className="btn-primary"
                  >
                    Try {VIDEO_SOURCES[currentSourceIndex + 1].name}
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentSourceIndex(0)}
                    className="btn-primary"
                  >
                    Start Over
                  </button>
                )}
              </div>
            </div>
          )}
          
          {/* Video Iframe */}
          <iframe
            ref={iframeRef}
            src={videoUrl}
            className="w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
          
          {/* Controls Overlay */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80 pointer-events-none"
              >
                {/* Top Bar */}
                <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between pointer-events-auto">
                  <div>
                    <h2 className="text-white text-xl md:text-2xl font-bold drop-shadow-lg">
                      {title}
                    </h2>
                    {tvId && season && episode && (
                      <p className="text-white/80 text-sm mt-1">
                        Season {season} • Episode {episode}
                      </p>
                    )}
                  </div>
                  
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-all"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
                
                {/* Bottom Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-auto">
                  <div className="flex items-center justify-between">
                    {/* Source Info */}
                    <div className="flex items-center gap-4">
                      <span className="text-white/80 text-sm">
                        Source: <span className="text-tareq-gold font-medium">{currentSource.name}</span>
                      </span>
                      
                      {currentSourceIndex < VIDEO_SOURCES.length - 1 && (
                        <button
                          onClick={tryNextSource}
                          className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-white transition-all"
                        >
                          Switch Source
                        </button>
                      )}
                    </div>
                    
                    {/* Controls */}
                    <button
                      onClick={toggleFullscreen}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                    >
                      <Maximize className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
