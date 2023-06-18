import NavBar from "@/components/navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/providers";
import { Metadata } from "next";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nemu's Waifu Gen",
  description: "UwU",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NavBar />
          <div className="m-auto max-w-7xl px-1 py-1">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
