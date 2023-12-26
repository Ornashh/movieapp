import { Details as DetailsComponent } from "@/components/details";

type Props = {
  params: { id: string };
};

const Details = ({ params }: Props) => {
  const movieId = Number(params.id);

  return <DetailsComponent movieId={movieId} />;
};

export default Details;
