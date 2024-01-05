import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now playing",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
