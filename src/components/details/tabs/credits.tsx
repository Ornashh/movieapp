import { Carousel } from "../../carousel";
import { Loading } from "../../ui/loading";
import { Alert } from "../../ui/alert";
import { useGetCreditsQuery } from "@/rtk/services/injections/creditsApi";

type Props = {
  id: number;
};

export const Credits = ({ id }: Props) => {
  const { data: credits, isLoading } = useGetCreditsQuery(id, {
    skip: !id,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (credits?.cast?.length === 0) {
    return <Alert>No credits</Alert>;
  }

  if (credits) {
    return (
      <Carousel
        title="Credits"
        href={`/movie/${id}/credits`}
        data={credits.cast}
      />
    );
  }
};
