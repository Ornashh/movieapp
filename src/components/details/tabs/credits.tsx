import { Carousel } from "@/components/carousel";
import { Loading } from "@/components/ui/loading";
import { Alert } from "@/components/ui/alert";
import { useGetCreditsQuery } from "@/store/services/injections/creditsApi";

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
        title="Top cast"
        href={`/movie/${id}/credits`}
        data={credits.cast.slice(0, 20)}
      />
    );
  }
};
