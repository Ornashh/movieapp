import { Person as PersonComponent } from "@/components/person";

type Props = { params: { id: string } };

const Person = ({ params }: Props) => {
  const personId = Number(params.id);

  return <PersonComponent personId={personId} />;
};

export default Person;
