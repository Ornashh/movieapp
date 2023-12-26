"use client";

import { PropsWithChildren } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { store } from "@/rtk/store";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider
        enableSystem
        attribute="class"
        defaultTheme="light"
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ReduxProvider>
  );
};
