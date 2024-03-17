import { PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

type Props = {
  isFullPage?: boolean;
};

export const Alert = ({
  isFullPage = false,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div
      className={cn(
        "text-center flex justify-center items-center",
        isFullPage ? "min-h-[inherit]" : "h-[25vh]"
      )}
    >
      {children}
    </div>
  );
};
