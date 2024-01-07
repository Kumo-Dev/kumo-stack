"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
import { FC, ReactNode, useState } from "react";
import superjson from "superjson";

import { trpc } from "./client";
httpBatchLink({
  url: "http://localhost:3000/api/trpc",
});

const transformer = superjson;

function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function getUrl() {
  return getBaseUrl() + "/api/trpc";
}

const TRPCProvider: FC<{ children: ReactNode; cookies: string }> = ({
  children,
  cookies
}) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    {
      return trpc.createClient({
        transformer,
        links: [
          loggerLink({
            enabled: (op) => process.env.NODE_ENV === "development" ||
              (op.direction === "down" && op.result instanceof Error),
          }),
          unstable_httpBatchStreamLink({
            url: getUrl(),
            headers() {
              return {
                cookie: cookies,
                "x-trpc-source": "react",
              };
            },
          }),
        ],
      });
    }
    )
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
export default TRPCProvider;
