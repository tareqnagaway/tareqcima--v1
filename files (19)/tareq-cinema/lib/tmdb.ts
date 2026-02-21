import axios from 'axios';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';

// Axios instance with default config
const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

// Image URL helpers
export const getImageUrl = (path: string | null, size: 'w200' | 'w300' | 'w500' | 'w780' | 'original' = 'w500') => {
  if (!path) return '/placeholder-movie.jpg';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (path: string | null, size: 'w300' | 'w780' | 'w1280' | 'original' = 'original') => {
  if (!path) return '/placeholder-backdrop.jpg';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

// Interfaces
export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  video: boolean;
}

export interface TVShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  original_language: string;
  origin_country: string[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
  production_companies: Array<{
    id: number;
    name: string;
    logo_path: string | null;
  }>;
  credits?: {
    cast: Cast[];
    crew: Crew[];
  };
  videos?: {
    results: Video[];
  };
  similar?: {
    results: Movie[];
  };
}

export interface TVShowDetails extends TVShow {
  genres: Genre[];
  number_of_episodes: number;
  number_of_seasons: number;
  episode_run_time: number[];
  status: string;
  tagline: string;
  created_by: Array<{
    id: number;
    name: string;
  }>;
  credits?: {
    cast: Cast[];
    crew: Crew[];
  };
  videos?: {
    results: Video[];
  };
  similar?: {
    results: TVShow[];
  };
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

// API Functions

// Movies
export const getTrendingMovies = async (timeWindow: 'day' | 'week' = 'week', language: string = 'en-US') => {
  const response = await tmdbApi.get(`/trending/movie/${timeWindow}`, {
    params: { language },
  });
  return response.data;
};

export const getPopularMovies = async (page: number = 1, language: string = 'en-US') => {
  const response = await tmdbApi.get('/movie/popular', {
    params: { page, language },
  });
  return response.data;
};

export const getTopRatedMovies = async (page: number = 1, language: string = 'en-US') => {
  const response = await tmdbApi.get('/movie/top_rated', {
    params: { page, language },
  });
  return response.data;
};

export const getUpcomingMovies = async (page: number = 1, language: string = 'en-US') => {
  const response = await tmdbApi.get('/movie/upcoming', {
    params: { page, language },
  });
  return response.data;
};

export const getNowPlayingMovies = async (page: number = 1, language: string = 'en-US') => {
  const response = await tmdbApi.get('/movie/now_playing', {
    params: { page, language },
  });
  return response.data;
};

export const getMovieDetails = async (movieId: number, language: string = 'en-US') => {
  const response = await tmdbApi.get(`/movie/${movieId}`, {
    params: {
      language,
      append_to_response: 'credits,videos,similar,recommendations',
    },
  });
  return response.data;
};

// TV Shows
export const getTrendingTVShows = async (timeWindow: 'day' | 'week' = 'week', language: string = 'en-US') => {
  const response = await tmdbApi.get(`/trending/tv/${timeWindow}`, {
    params: { language },
  });
  return response.data;
};

export const getPopularTVShows = async (page: number = 1, language: string = 'en-US') => {
  const response = await tmdbApi.get('/tv/popular', {
    params: { page, language },
  });
  return response.data;
};

export const getTopRatedTVShows = async (page: number = 1, language: string = 'en-US') => {
  const response = await tmdbApi.get('/tv/top_rated', {
    params: { page, language },
  });
  return response.data;
};

export const getTVShowDetails = async (tvId: number, language: string = 'en-US') => {
  const response = await tmdbApi.get(`/tv/${tvId}`, {
    params: {
      language,
      append_to_response: 'credits,videos,similar,recommendations',
    },
  });
  return response.data;
};

// Search
export const searchMulti = async (query: string, page: number = 1, language: string = 'en-US') => {
  const response = await tmdbApi.get('/search/multi', {
    params: { query, page, language },
  });
  return response.data;
};

export const searchMovies = async (query: string, page: number = 1, language: string = 'en-US') => {
  const response = await tmdbApi.get('/search/movie', {
    params: { query, page, language },
  });
  return response.data;
};

export const searchTVShows = async (query: string, page: number = 1, language: string = 'en-US') => {
  const response = await tmdbApi.get('/search/tv', {
    params: { query, page, language },
  });
  return response.data;
};

// Genres
export const getMovieGenres = async (language: string = 'en-US') => {
  const response = await tmdbApi.get('/genre/movie/list', {
    params: { language },
  });
  return response.data;
};

export const getTVGenres = async (language: string = 'en-US') => {
  const response = await tmdbApi.get('/genre/tv/list', {
    params: { language },
  });
  return response.data;
};

export const getMoviesByGenre = async (genreId: number, page: number = 1, language: string = 'en-US') => {
  const response = await tmdbApi.get('/discover/movie', {
    params: {
      with_genres: genreId,
      page,
      language,
      sort_by: 'popularity.desc',
    },
  });
  return response.data;
};

export const getTVShowsByGenre = async (genreId: number, page: number = 1, language: string = 'en-US') => {
  const response = await tmdbApi.get('/discover/tv', {
    params: {
      with_genres: genreId,
      page,
      language,
      sort_by: 'popularity.desc',
    },
  });
  return response.data;
};

// Configuration
export const getConfiguration = async () => {
  const response = await tmdbApi.get('/configuration');
  return response.data;
};

export default tmdbApi;
