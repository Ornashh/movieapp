import type { Metadata } from "next";
import { Genres } from "@/types/genres";
import { API_KEY } from "@/utils/constants";

const getGenres = async (): Promise<Genres> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
  );

  return await response.json();
};

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const genreId = Number(params.id);
  const genres = await getGenres();

  const genreName = genres?.genres?.find(({ id }) => id === genreId)?.name;

  return {
    title: genreName ? genreName : "Not found",
  };
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
