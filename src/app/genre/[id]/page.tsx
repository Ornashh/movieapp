"use client";

import { useEffect, useState } from "react";

import { Cards } from "@/components/cards";
import { Loading } from "@/components/ui/loading";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

import { Movie } from "@/types/movie";
import { getGenre } from "@/services";
import { useGetGenresQuery } from "@/rtk/services/injections/genresApi";

type Props = { params: { id: string } };

const Genre = ({ params }: Props) => {
  const genreId = Number(params.id);
  const [genre, setGenre] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(2);
  const [isLoadMore, setIsLoadMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const { data: genres } = useGetGenresQuery();

  const genreName = genres?.genres.find(({ id }) => id === genreId)?.name;

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    try {
      const response = await getGenre({ id: genreId, page });
      setGenre([...genre, ...response.results]);
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
        const response = await getGenre({ id: genreId, page: 1 });
        setGenre(response.results);
      } catch (error: any) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loading isFullPage />;
  }

  if (genre.length === 0) {
    return <Alert isFullPage>Genre not found</Alert>;
  }

  return (
    <div className="flex flex-col gap-y-6">
      <Breadcrumbs>
        <div>Genre</div>
        <div className="truncate">{genreName ? genreName : "Loading..."}</div>
      </Breadcrumbs>

      <Cards title={genreName || ""} movies={genre} />

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

export default Genre;
