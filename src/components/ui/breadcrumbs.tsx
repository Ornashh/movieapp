import { Children, Fragment, PropsWithChildren } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const Breadcrumbs = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center gap-x-2 w-full overflow-hidden">
      <Link href="/">Home</Link>
      <ChevronRight className="svg" />

      {Children.map(children, (child, index) => (
        <Fragment key={index}>
          {child}
          {index < Children.count(children) - 1 && (
            <ChevronRight className="svg" />
          )}
        </Fragment>
      ))}
    </div>
  );
};
