"use client";
import {
  QueryClient,
  QueryClientProvider as OriginalQueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode } from "react";

const makeQueryClient = () => {
  return new QueryClient();
};

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (typeof window === "undefined") {
    return makeQueryClient();
  } else if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
};

export const QueryClientProvider = ({ children }: { children: ReactNode }) => {
  const QueryClient = getQueryClient();
  return (
    <OriginalQueryClientProvider client={QueryClient}>
      {children}
    </OriginalQueryClientProvider>
  );
};