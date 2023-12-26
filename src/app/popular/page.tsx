"use client";

import { MovieList } from "@/components/movieList";
import { getPopular } from "@/services";

const Popular = () => {
  return <MovieList getMovies={getPopular} title="Popular movies" />;
};

export default Popular;
