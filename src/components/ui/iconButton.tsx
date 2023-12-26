import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = {
  icon: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton = ({ icon, ...props }: Props) => {
  return (
    <button
      type="button"
      {...props}
      className="rounded-md flex justify-center items-center p-2 duration-200 ease-in-out hover:bg-hover"
    >
      {icon}
    </button>
  );
};
