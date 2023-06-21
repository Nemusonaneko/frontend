import NavBar from "@/components/navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/providers";
import "../theme/_import";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
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

  /* it should be noted that chrome extentions that add classes to html will cause
     next to soft-throw "Prop `className` did not match", EG:

     Warning: Prop `className` did not match. Server: "original dzmwtxok idc0_343" Client: "original"

     this can be ignored!
  */
  return (
    <html lang="en" className="original">
      <body className={`${inter.className} bg-[color:var(--bg0)] text-[color:var(--text)]`}>
        <Providers>
          <NavBar />
          <div className="m-auto max-w-7xl px-1 py-1">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
