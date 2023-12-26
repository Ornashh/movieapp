export type Images = {
  backdrops: Backdrop[];
  id: number;
  logos: Logo[];
  posters: Poster[];
};

export type Backdrop = {
  aspect_ratio: number;
  height: number;
  iso_639_1?: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

type Logo = {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

type Poster = {
  aspect_ratio: number;
  height: number;
  iso_639_1?: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

export type Videos = {
  id: number;
  results: Video[];
};

type Video = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

export type Reviews = {
  id: number;
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
};

type Review = {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
};

type AuthorDetails = {
  name: string;
  username: string;
  avatar_path?: string;
  rating?: number;
};
