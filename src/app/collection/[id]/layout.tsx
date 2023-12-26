import { Metadata } from "next/types";
import { Collections } from "@/types/collection";
import { API_KEY } from "@/utils/constants";

const getCollections = async (id: number): Promise<Collections | undefined> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/collection/${id}?api_key=${API_KEY}&language=en-US`
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
  const collection = await getCollections(params.id);

  return {
    title: collection ? collection.name : "Not found",
  };
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
