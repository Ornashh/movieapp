"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Search as SearchLogo } from "lucide-react";

import { Cards } from "@/components/cards";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { Alert } from "@/components/ui/alert";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

import { Movie } from "@/types/movie";
import { search } from "@/services";

const Search = () => {
  const [name, setName] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(2);
  const [isLoadMore, setIsLoadMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.trim() === "" && value.length === 1) return;

    setInputValue(value);
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue) {
      setName(inputValue);
    }
  };

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    try {
      const response = await search({
        query: name,
        page: page,
      });
      setSearchResults([...searchResults, ...response.results]);
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
      if (name) {
        setIsLoading(true);
        try {
          const response = await search({
            query: name,
            page: 1,
          });
          setSearchResults(response.results);

          if (response.page === response.total_pages) {
            setIsLoadMore(false);
          }
        } catch (error: any) {
          const errorMessage = error.response.data.status_message;
          setError(errorMessage);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    setPage(2);
    setIsLoadMore(true);
  }, [name]);

  return (
    <div className="flex flex-col gap-y-6">
      {name ? (
        <Breadcrumbs>
          <div>Search</div>
          <div className="capitalize">{name}</div>
        </Breadcrumbs>
      ) : (
        <Breadcrumbs>
          <div>Search</div>
        </Breadcrumbs>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-popover border border-border rounded-xl flex items-center h-14 pl-3 overflow-hidden"
      >
        <Button size="icon" variant="ghost">
          <SearchLogo className="svg" />
        </Button>
        <input
          type="text"
          name="search"
          placeholder="Search movie"
          value={inputValue}
          onChange={handleChange}
          className="w-full h-14 px-3"
        />
      </form>

      {isLoading ? (
        <Loading />
      ) : error ? (
        <Alert>{error}</Alert>
      ) : searchResults.length > 0 ? (
        <div className="flex flex-col gap-y-6">
          <Cards title={name} movies={searchResults} />

          {isLoadMore && (
            <div className="flex justify-center">
              <Button disabled={isLoadingMore} onClick={handleLoadMore}>
                Load more
              </Button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Search;
