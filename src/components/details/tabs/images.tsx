import { useState } from "react";
import Image from "next/image";

import { Dialog } from "../dialog";
import { Loading } from "../../ui/loading";
import { Alert } from "../../ui/alert";

import { useGetImagesQuery } from "@/rtk/services/injections/mediaApi";

type Props = {
  id: number;
};

const initialDialogState = {
  isOpen: false,
  filePath: "",
};

export const Images = ({ id }: Props) => {
  const [dialog, setDialog] = useState(initialDialogState);
  const { data: images, isLoading } = useGetImagesQuery(id, { skip: !id });

  const handleOpenDialog = (filePath: string) =>
    setDialog({ isOpen: true, filePath });

  const handleCloseDialog = () => setDialog(initialDialogState);

  if (isLoading) {
    return <Loading />;
  }

  if (images?.backdrops.length === 0) {
    return <Alert>No images</Alert>;
  }

  if (images) {
    return (
      <div className="grid gap-4 grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {images.backdrops.map(({ file_path }, index) => {
          return (
            <figure
              key={index}
              className="bg-hover rounded-md cursor-pointer min-w-[100px] relative overflow-hidden before:content-[''] before:block before:pt-[60%]"
              onClick={() => handleOpenDialog(file_path)}
            >
              <Image
                src={"https://image.tmdb.org/t/p/w780" + file_path}
                width={780}
                height={439}
                alt=""
                loading="lazy"
                className="absolute top-0 left-0 w-full h-full object-cover transition-opacity opacity-0 duration-500"
                onLoadingComplete={(img) => img.classList.remove("opacity-0")}
              />
            </figure>
          );
        })}

        <Dialog open={dialog.isOpen} onClose={handleCloseDialog}>
          <div className="bg-hover relative overflow-hidden before:content-[''] before:block before:pt-[56%]">
            <Image
              src={"https://image.tmdb.org/t/p/original" + dialog.filePath}
              width={1920}
              height={1080}
              alt=""
              priority={true}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
        </Dialog>
      </div>
    );
  }
};
