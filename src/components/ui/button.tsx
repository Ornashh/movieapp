import { ButtonHTMLAttributes, PropsWithChildren } from "react";

export const Button = ({
  children,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <div>
      <button
        type="button"
        {...props}
        className="font-medium text-primary-foreground bg-primary rounded-md py-2 px-4 max-sm:text-sm"
      >
        {children}
      </button>
    </div>
  );
};
