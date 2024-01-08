// app/providers.tsx
"use client";

import { ThemeProvider as Provider } from "next-themes";
import React from "react";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Provider attribute="class" defaultTheme="dark">
      {children}
    </Provider>
  );
};
