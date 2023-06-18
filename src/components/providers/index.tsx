"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: any }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster
          position="bottom-right"
          reverseOrder
          toastOptions={{
            style: {
              background: "#474678",
              color: "#ffffff",
            },
            duration: 3000
          }}
        />
      </QueryClientProvider>
    </>
  );
}
