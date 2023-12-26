import { PropsWithChildren } from "react";
import { Dialog as HDialog } from "@headlessui/react";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const Dialog = ({
  open,
  onClose,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <HDialog open={open} onClose={onClose} className="relative z-50">
      <div
        className="bg-black/80 backdrop-blur fixed inset-0"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-5">
        <HDialog.Panel className="rounded-xl w-full max-w-[1000px] max-h-[600px] mx-auto overflow-hidden">
          <button
            type="button"
            aria-label="close"
            onClick={onClose}
            className="flex justify-center items-center absolute top-0 right-0 w-10 h-10"
          >
            <X className="text-[#fafafa] w-5 h-5" />
          </button>

          {children}
        </HDialog.Panel>
      </div>
    </HDialog>
  );
};
