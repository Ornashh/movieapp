"use client";

import { useEffect, useState } from "react";

import { Cards } from "@/components/cards";
import { Loading } from "@/components/ui/loading";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

import { Movie, Movies } from "@/types/movie";

type Props = {
  title: string;
  getMovies: (page: number) => Promise<Movies>;
};

export const MovieList = ({ title, getMovies }: Props) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(2);
  const [isLoadMore, setIsLoadMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    try {
      const response = await getMovies(page);
      setMovies([...movies, ...response.results]);
      setPage((prevPage) => prevPage + 1);

      if (response.page === response.total_pages) {
        setIsLoadMore(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMovies(1);
        setMovies(response.results);
      } catch (error: any) {
        const errorMessage = error.response.data.status_message;
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [getMovies]);

  if (isLoading) {
    return <Loading isFullPage />;
  }

  if (error) {
    return <Alert isFullPage>{error}</Alert>;
  }

  return (
    <div className="flex flex-col gap-y-6">
      <Breadcrumbs>
        <div>{title}</div>
      </Breadcrumbs>

      <Cards title={title} movies={movies} />

      {isLoadMore && (
        <div className="flex justify-center">
          <Button disabled={isLoadingMore} onClick={handleLoadMore}>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};
