"use client";

import { Cards } from "@/components/cards";
import { Loading } from "@/components/ui/loading";
import { Alert } from "@/components/ui/alert";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

import { useGetCollectionQuery } from "@/store/services/injections/moviesApi";

type Props = { params: { id: string } };

const Collection = ({ params }: Props) => {
  const collectionId = Number(params.id);
  const { data, isLoading, error } = useGetCollectionQuery(collectionId);

  if (isLoading) {
    return <Loading isFullPage />;
  }

  if (error) {
    // @ts-ignore
    const errorMsg = error.data.status_message;

    return <Alert isFullPage>{errorMsg}</Alert>;
  }

  if (data) {
    return (
      <div className="flex flex-col gap-y-6">
        <Breadcrumbs>
          <div>Collection</div>
          <div className="truncate">{data ? data.name : "Loading..."}</div>
        </Breadcrumbs>

        <Cards title={data.name} movies={data.parts} />
      </div>
    );
  }
};

export default Collection;
