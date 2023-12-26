"use client";

import { MovieList } from "@/components/movieList";
import { getTopRated } from "@/services";

const TopRated = () => {
  return <MovieList getMovies={getTopRated} title="Top rated movies" />;
};

export default TopRated;
