import { User } from "lucide-react";

import { Loading } from "@/components/ui/loading";
import { Alert } from "@/components/ui/alert";

import { useGetReviewsQuery } from "@/rtk/services/injections/mediaApi";
import { dateFormat } from "@/utils/helpers";

export const Reviews = ({ id }: { id: number }) => {
  const { data: reviews, isLoading } = useGetReviewsQuery(id, { skip: !id });

  if (isLoading) {
    return <Loading />;
  }

  if (reviews?.results.length === 0) {
    return <Alert>No reviews</Alert>;
  }

  if (reviews) {
    return (
      <div className="grid grid-cols-1 gap-4 max-md:grid-cols-1">
        {reviews?.results.map(({ id, author, content, created_at }) => {
          return (
            <div
              key={id}
              className="border-b border-border flex flex-col gap-y-4 pb-4 last:border-none last:pb-0"
            >
              <div className="flex items-center gap-x-2">
                <div className="bg-accent rounded-full flex justify-center items-center w-10 h-10 max-sm:w-8 max-sm:h-8">
                  <User className="text-icon w-5 h-5 max-sm:w-4 max-sm:h-4" />
                </div>

                <div>
                  <div>{author}</div>
                  <div className="text-sm text-muted-foreground">
                    {dateFormat(created_at)}
                  </div>
                </div>
              </div>

              <p>{content}</p>
            </div>
          );
        })}
      </div>
    );
  }
};
