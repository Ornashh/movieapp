import { User2 } from "lucide-react";

import { Loading } from "../../ui/loading";
import { Alert } from "../../ui/alert";

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
                <User2 className="text-icon w-[25px] h-[25px] max-sm:w-[23px] max-sm:h-[23px]" />
                <div>
                  <div className="font-medium max-sm:text-sm">{author}</div>
                  <div className="text-sm text-secondary-foreground">
                    {dateFormat(created_at)}
                  </div>
                </div>
              </div>

              <p className="max-sm:text-sm">{content}</p>
            </div>
          );
        })}
      </div>
    );
  }
};
