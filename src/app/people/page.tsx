"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Loading } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

import { getPopularPeople } from "@/services";
import { Person } from "@/types/people";
import { POSTER_NOT_FOUND, POSTER_URL } from "@/utils/constants";

const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [page, setPage] = useState<number>(2);
  const [isLoadMore, setIsLoadMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    try {
      const response = await getPopularPeople(page);
      setPeople([...people, ...response.results]);
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
        const response = await getPopularPeople(1);
        setPeople(response.results);
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

  return (
    <div className="flex flex-col gap-y-6">
      <Breadcrumbs>
        <div>People</div>
      </Breadcrumbs>

      <div className="flex flex-col gap-y-4">
        <h1 className="text-xl font-medium capitalize truncate max-sm:text-lg">
          Popular people
        </h1>

        <div className="grid grid-cols-5 gap-4 max-md:grid-cols-4 max-sm:grid-cols-3">
          {people?.map(({ id, name, profile_path }) => {
            return (
              <div key={id} className="flex flex-col gap-y-2">
                <Link href={`/people/${id}`} className="flex flex-col gap-y-2">
                  <figure className="bg-hover rounded-md relative overflow-hidden before:content-[''] before:block before:pt-[150%]">
                    <Image
                      src={
                        profile_path
                          ? POSTER_URL + profile_path
                          : POSTER_NOT_FOUND
                      }
                      width={500}
                      height={750}
                      priority
                      alt={name}
                      className="absolute top-0 left-0 w-full h-full object-cover transition-opacity opacity-0 duration-500"
                      onLoadingComplete={(img) =>
                        img.classList.remove("opacity-0")
                      }
                    />
                  </figure>
                </Link>

                <Link
                  href={`/people/${id}`}
                  className="text-base flex max-sm:text-sm"
                >
                  {name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {isLoadMore && (
        <div className="flex justify-center">
          <Button
            aria-label="more"
            disabled={isLoadingMore}
            onClick={handleLoadMore}
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default People;
