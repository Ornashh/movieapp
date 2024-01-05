"use client";

import { MovieList } from "@/components/movieList";
import { getNowPlaying } from "@/services";

const NowPlaying = () => {
  return <MovieList getMovies={getNowPlaying} title="Now playing movies" />;
};

export default NowPlaying;
