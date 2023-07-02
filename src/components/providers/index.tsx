"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import DeveloperCtx from "./DeveloperCtx";
import React from "react";
import useLocal from "@/utils/useStorage";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: any }) {
	var [dev, setDev] = useLocal('user.dev', false);


  return (
    <>
			<DeveloperCtx.Provider value={{dev, setDev}}>
				<QueryClientProvider client={queryClient}>
					{children}
					<Toaster
						position="bottom-right"
						reverseOrder
						toastOptions={{
							success:{iconTheme:{
								primary:"var(--green)",
								secondary:"var(--text-on-color)"
							}},
							error:{iconTheme:{
								primary:"var(--red)",
								secondary:"var(--text-on-color)"
							}},
							style: {
								background: "var(--bg3)",
								color: "var(--text)",
							},
							duration: 3000,
						}}
					/>
				</QueryClientProvider>
			</DeveloperCtx.Provider>
    </>
  );
}
