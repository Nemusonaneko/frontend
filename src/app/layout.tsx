import NavBar from "@/components/navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/providers";
import "../theme/_import";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nemu's Waifu Gen",
  description: "Free Stable Diffusion interface for people who dont want to drop thousands on a good GPU UwU",
  icons: { icon: "/favicon.ico" },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="original">
      <head>
        <link key="idx-url" rel="canonical" href="https://waifus.nemusona.com/" />
        <meta key="graph-title" property="og:title" content={metadata.title} />
        <meta key="graph-desc" property="og:description" content={metadata.description} />
        <meta key="graph-img" property="og:image" content="https://waifus.nemusona.com/DogO.png" />
      </head>
      <body className={`${inter.className} bg-[color:var(--bg0)] text-[color:var(--text)]`}>
        <Providers>
          <NavBar />
          <div className="m-auto max-w-7xl px-1 py-1">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
