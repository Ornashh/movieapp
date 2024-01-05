import { useState } from "react";
import Image from "next/image";

import { Dialog } from "../dialog";
import { Loading } from "@/components/ui/loading";
import { Alert } from "@/components/ui/alert";

import { useGetVideosQuery } from "@/rtk/services/injections/mediaApi";

const initialDialogState = {
  isOpen: false,
  key: "",
};

export const Videos = ({ id }: { id: number }) => {
  const [dialog, setDialog] = useState(initialDialogState);
  const { data: videos, isLoading } = useGetVideosQuery(id, { skip: !id });

  const handleOpenDialog = (key: string) => setDialog({ isOpen: true, key });

  const handleCloseDialog = () => setDialog(initialDialogState);

  if (isLoading) {
    return <Loading />;
  }

  if (videos?.results.length === 0) {
    return <Alert>No videos</Alert>;
  }

  if (videos) {
    return (
      <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {videos?.results.map(({ id, key, name, type }) => {
          const src = `https://img.youtube.com/vi/${key}/maxresdefault.jpg`;

          return (
            <div key={id} className="flex flex-col gap-y-2">
              <figure
                className="bg-hover rounded-md cursor-pointer min-w-[100px] relative overflow-hidden before:content-[''] before:block before:pt-[56%]"
                onClick={() => handleOpenDialog(key)}
              >
                <Image
                  src={src}
                  width={1280}
                  height={720}
                  alt={name}
                  className="absolute top-0 left-0 w-full h-full object-cover transition-opacity opacity-0 duration-500"
                  onLoadingComplete={(img) => img.classList.remove("opacity-0")}
                />
              </figure>
              <div className="text-sm truncate">{type}</div>
            </div>
          );
        })}

        <Dialog open={dialog.isOpen} onClose={handleCloseDialog}>
          <div className="bg-hover relative overflow-hidden before:content-[''] before:block before:pt-[56%]">
            <div className="absolute top-0 left-0 w-full h-full">
              <iframe
                title="frame"
                src={`https://www.youtube.com/embed/${dialog.key}?autoplay=0&mute=1`}
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
};
