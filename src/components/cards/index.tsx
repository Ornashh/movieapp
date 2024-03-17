import { useState } from "react";
import { LayoutGrid, LayoutList } from "lucide-react";

import { Grid } from "./grid";
import { List } from "./list";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Movie } from "@/types/movie";

type Props = {
  title: string;
  movies: Movie[] | undefined;
};

type ViewType = "grid" | "list";

const viewIcons = [
  { icon: <LayoutGrid className="svg" />, title: "Grid", value: "grid" },
  { icon: <LayoutList className="svg" />, title: "List", value: "list" },
];

export const Cards = ({ title, movies }: Props) => {
  const [view, setView] = useState<ViewType>("grid");

  const views: { [key: string]: JSX.Element } = {
    grid: <Grid movies={movies} />,
    list: <List movies={movies} />,
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex justify-between items-center gap-x-2">
        <h1 className="text-xl font-medium capitalize truncate max-sm:text-lg">
          {title}
        </h1>

        <div className="flex">
          {viewIcons.map(({ icon, title, value }, index) => {
            return (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      disabled={view === value}
                      onClick={() => setView(value as ViewType)}
                    >
                      {icon}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{title}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-y-6">{views[view]}</div>
    </div>
  );
};
