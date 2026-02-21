import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Interfaces
interface WatchlistItem {
  id: number;
  type: 'movie' | 'tv';
  title: string;
  poster_path: string | null;
  vote_average: number;
  addedAt: string;
}

interface WatchProgress {
  id: number;
  type: 'movie' | 'tv';
  progress: number; // percentage 0-100
  lastWatched: string;
  duration: number; // in seconds
}

interface UserPreferences {
  theme: 'dark' | 'light' | 'cinema';
  autoplay: boolean;
  quality: 'auto' | '720p' | '1080p' | '4k';
  subtitles: boolean;
  language: 'en' | 'ar';
}

interface AppState {
  // Watchlist
  watchlist: WatchlistItem[];
  addToWatchlist: (item: WatchlistItem) => void;
  removeFromWatchlist: (id: number, type: 'movie' | 'tv') => void;
  isInWatchlist: (id: number, type: 'movie' | 'tv') => boolean;
  clearWatchlist: () => void;
  
  // Watch Progress
  watchProgress: WatchProgress[];
  updateWatchProgress: (item: WatchProgress) => void;
  getWatchProgress: (id: number, type: 'movie' | 'tv') => WatchProgress | undefined;
  clearWatchProgress: () => void;
  
  // User Preferences
  preferences: UserPreferences;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  
  // Language
  locale: 'en' | 'ar';
  setLocale: (locale: 'en' | 'ar') => void;
  
  // Search History
  searchHistory: string[];
  addSearchQuery: (query: string) => void;
  clearSearchHistory: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Watchlist State
      watchlist: [],
      
      addToWatchlist: (item) =>
        set((state) => {
          const exists = state.watchlist.some(
            (w) => w.id === item.id && w.type === item.type
          );
          if (exists) return state;
          return {
            watchlist: [...state.watchlist, { ...item, addedAt: new Date().toISOString() }],
          };
        }),
      
      removeFromWatchlist: (id, type) =>
        set((state) => ({
          watchlist: state.watchlist.filter((item) => !(item.id === id && item.type === type)),
        })),
      
      isInWatchlist: (id, type) => {
        return get().watchlist.some((item) => item.id === id && item.type === type);
      },
      
      clearWatchlist: () => set({ watchlist: [] }),
      
      // Watch Progress State
      watchProgress: [],
      
      updateWatchProgress: (item) =>
        set((state) => {
          const existing = state.watchProgress.findIndex(
            (p) => p.id === item.id && p.type === item.type
          );
          
          if (existing !== -1) {
            const updated = [...state.watchProgress];
            updated[existing] = { ...item, lastWatched: new Date().toISOString() };
            return { watchProgress: updated };
          }
          
          return {
            watchProgress: [...state.watchProgress, { ...item, lastWatched: new Date().toISOString() }],
          };
        }),
      
      getWatchProgress: (id, type) => {
        return get().watchProgress.find((item) => item.id === id && item.type === type);
      },
      
      clearWatchProgress: () => set({ watchProgress: [] }),
      
      // Preferences State
      preferences: {
        theme: 'dark',
        autoplay: true,
        quality: 'auto',
        subtitles: true,
        language: 'en',
      },
      
      updatePreferences: (prefs) =>
        set((state) => ({
          preferences: { ...state.preferences, ...prefs },
        })),
      
      // Language State
      locale: 'en',
      
      setLocale: (locale) =>
        set((state) => ({
          locale,
          preferences: { ...state.preferences, language: locale },
        })),
      
      // Search History State
      searchHistory: [],
      
      addSearchQuery: (query) =>
        set((state) => {
          const trimmed = query.trim();
          if (!trimmed) return state;
          
          const filtered = state.searchHistory.filter((q) => q !== trimmed);
          return {
            searchHistory: [trimmed, ...filtered].slice(0, 10), // Keep last 10
          };
        }),
      
      clearSearchHistory: () => set({ searchHistory: [] }),
    }),
    {
      name: 'tareq-cinema-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        watchlist: state.watchlist,
        watchProgress: state.watchProgress,
        preferences: state.preferences,
        locale: state.locale,
        searchHistory: state.searchHistory,
      }),
    }
  )
);

// Selectors for optimized re-renders
export const selectWatchlist = (state: AppState) => state.watchlist;
export const selectWatchProgress = (state: AppState) => state.watchProgress;
export const selectPreferences = (state: AppState) => state.preferences;
export const selectLocale = (state: AppState) => state.locale;
export const selectSearchHistory = (state: AppState) => state.searchHistory;
