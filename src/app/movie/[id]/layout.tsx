import type { Metadata } from "next";
import { Details } from "@/types/movie";
import { API_KEY } from "@/utils/constants";

export const getDetails = async (id: number): Promise<Details | undefined> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
  );

  if (!response.ok) {
    return undefined;
  }

  return await response.json();
};

export const generateMetadata = async ({
  params,
}: {
  params: { id: number };
}): Promise<Metadata> => {
  const details = await getDetails(params.id);

  return {
    title: details ? details.title : "Not found",
  };
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
