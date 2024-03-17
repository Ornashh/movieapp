import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";
import "swiper/css";
import "swiper/css/free-mode";

import { Providers } from "./providers";
import { Navigation } from "@/components/navigation";
import { cn } from "@/utils/cn";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Home",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "text-base text-foreground antialiased bg-background",
          roboto.className
        )}
      >
        <Providers>
          <div className="flex gap-x-5 max-w-[1200px] mx-auto pt-5 pb-10 px-5 max-md:mb-16">
            <Navigation />

            <div className="flex-1 flex flex-col gap-y-10 min-w-0">
              <div className="min-h-[calc(100vh-60px)] max-md:min-h-[calc(100vh-124px)]">
                {children}
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
