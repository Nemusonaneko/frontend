"use client";

import Link from "next/link";
import Image from "next/image";
import cute from "../../../public/cute.gif";
import React from "react";

export default function NavBar() {
  const [opened, setOpened] = React.useState<boolean>(false);

  return (
    <>
      <nav className="bg-[#001933] border-gray-500">
        <div className="w-full flex items-center gap-2 mx-auto justify-between px-2 py-1">
          <Link
            href="/"
            className="flex items-center gap-2 hover:text-gray-300"
          >
            <Image src={cute} height={48} width={48} alt="cute.gif" />
            <p className="text-xl font-bold">{"Nemu's Waifu Generator"}</p>
          </Link>
          <div className="flex items-center gap-2 sm:visible max-sm:hidden px-2">
            <Link
              href="https://twitter.com/waifugeneth"
              target="_blank"
              className="text-lg hover:text-gray-300"
            >
              <p>Twitter</p>
            </Link>
            <Link
              href="https://discord.gg/nbEN88q6dw"
              target="_blank"
              className="text-lg hover:text-gray-300"
            >
              <p>Discord</p>
            </Link>
            <Link
              href="https://huggingface.co/spaces/CompVis/stable-diffusion-license"
              target="_blank"
              className="text-lg hover:text-gray-300"
            >
              License
            </Link>
            <Link
              href="/privacy"
              target="_blank"
              className="text-lg hover:text-gray-300"
            >
              Privacy
            </Link>
            {/* <button className="bg-blue-600 rounded-xl px-2 py-1 text-lg hover:bg-blue-500">
              Connect Wallet
            </button> */}
          </div>
          <button
            className="max-sm:visible sm:hidden hover:bg-purple-600 hover:rounded-lg"
            onClick={() => setOpened(!opened)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        {opened && (
          <div className="max-sm:visible sm:hidden w-full">
            <ul className="font-bold text-center text-xl">
              <li className="hover:bg-violet-900">
                <Link href="https://twitter.com/waifugeneth" target="_blank">
                  <button className="py-2 w-full">Twitter</button>
                </Link>
              </li>
              <li className="hover:bg-violet-900">
                <Link href="https://discord.gg/nbEN88q6dw" target="_blank">
                  <button className="py-2 w-full">Discord</button>
                </Link>
              </li>
              <li className="hover:bg-violet-900">
                <Link
                  href="https://huggingface.co/spaces/CompVis/stable-diffusion-license"
                  target="_blank"
                >
                  <button className="py-2 w-full">License</button>
                </Link>
              </li>
              <li className="hover:bg-violet-900">
                <Link
                  href="/privacy"
                  target="_blank"
                >
                  <button className="py-2 w-full">Privacy</button>
                </Link>
              </li>
              {/* <li className="hover:bg-blue-700">
                <button className="py-2 w-full">Connect Wallet</button>
              </li> */}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
