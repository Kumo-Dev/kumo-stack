"use client"
import { NextUIProvider as Provider } from "@nextui-org/system";
import React from "react";

const NextUIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Provider>{children}</Provider>;
};
export default NextUIProvider;
