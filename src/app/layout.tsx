import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";
import "swiper/css";
import "swiper/css/free-mode";

import { Providers } from "./providers";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
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
          <div className="flex gap-x-5 max-w-[1500px] mx-auto py-10 px-5 max-lg:flex-col max-lg:pt-5 max-lg:pb-[85px]">
            <Navigation />

            <div className="flex-1 flex flex-col gap-y-10 min-w-0">
              <div className="min-h-[calc(100vh-80px)] max-lg:min-h-[calc(100vh-105px)]">
                {children}
              </div>

              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
