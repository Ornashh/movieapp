import { useState } from "react";
import Image from "next/image";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loading } from "@/components/ui/loading";
import { Alert } from "@/components/ui/alert";

import { useGetImagesQuery } from "@/store/services/injections/mediaApi";
import { BACKDROP_URL_ORIGINAL, BACKDROP_URL_SMALL } from "@/utils/constants";

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
      <div className="grid grid-cols-4 gap-2 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {images.backdrops.map(({ file_path }, index) => {
          return (
            <figure
              key={index}
              className="bg-accent rounded-md cursor-pointer min-w-[100px] relative overflow-hidden before:content-[''] before:block before:pt-[56%]"
              onClick={() => handleOpenDialog(file_path)}
            >
              <Image
                src={BACKDROP_URL_SMALL + file_path}
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

        <Dialog open={dialog.isOpen} onOpenChange={handleCloseDialog}>
          <DialogContent className="max-w-[1000px] max-h-[90vh] mx-auto">
            <div className="bg-accent relative overflow-hidden before:content-[''] before:block before:pt-[56%]">
              <Image
                src={BACKDROP_URL_ORIGINAL + dialog.filePath}
                width={1920}
                height={1080}
                alt=""
                priority={true}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
};
