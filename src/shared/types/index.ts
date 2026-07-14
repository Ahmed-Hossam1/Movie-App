// ─── TMDB API Response Types ─────────────────────────────────────────────────

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
  runtime?: number;
  status?: string;
  revenue?: number;
  genres?: Genre[];
}

export interface TvShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
  last_episode_to_air?: { air_date: string };
  status?: string;
  tagline?: string;
  homepage?: string;
  languages?: string[];
  genres?: Genre[];
  seasons?: Season[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Season {
  id: number;
  name: string;
  poster_path: string | null;
  season_number: number;
  episode_count: number;
  air_date?: string;
}

export interface CastMember {
  id: number;
  name: string;
  profile_path: string | null;
  character?: string;
}

export interface Review {
  id: string;
  author: string;
  content: string;
  author_details: {
    username: string;
    avatar_path: string | null;
    rating?: number;
  };
}

export interface VideoResult {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface Person {
  id: number;
  name: string;
  biography?: string;
  birthday?: string;
  place_of_birth?: string;
  profile_path: string | null;
}

// ─── Context Types ────────────────────────────────────────────────────────────

export interface MovieContextValue {
  ImgConfig: string;
  isloading: boolean;
  Setloading: (value: boolean) => void;
  GetVideo: (movieID: string | number) => Promise<void>;
  Video: VideoResult[];
  iSVideoplayed: boolean;
  SetVideoplayed: (value: boolean) => void;
  Get_Tv_Video: (TvId: string | number) => Promise<void>;
  Tv_Video: VideoResult[];
  iS_Tv_Videoplayed: boolean;
  Set_Tv_Videoplayed: (value: boolean) => void;
}
