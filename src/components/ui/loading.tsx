import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

export const Loading = ({ isFullPage = false }: { isFullPage?: boolean }) => {
  return (
    <div
      className={cn(
        "flex justify-center items-center",
        isFullPage ? "h-full max-lg:h-[calc(100vh-105px)]" : "h-[25vh]"
      )}
    >
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  );
};
