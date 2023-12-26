import type { Metadata } from "next";
import { Person } from "@/types/person";
import { API_KEY } from "@/utils/constants";

export const getPerson = async (id: number): Promise<Person | undefined> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`
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
  const person = await getPerson(params.id);

  return {
    title: person ? person.name : "Not found",
  };
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
