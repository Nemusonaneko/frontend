import NavBar from "@/components/navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nemu's Waifu Generator",
  description: "UwU",
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
