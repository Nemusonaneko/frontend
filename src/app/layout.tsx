"use client"
import NavBar from "@/components/navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "react-query";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export const metadata = {
  title: {
    default: "Nemu's Waifu Generator",
    template: "%s | Nemu's Waifu Generator"
  },
  description: "UwU"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <NavBar />
          <div className="m-auto max-w-7xl px-1 py-1">{children}</div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
