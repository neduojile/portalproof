import {
  WalletProvider,
} from "@/context/walletcontext";

import type { Metadata } from "next";

import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import "./globals.css";

const geistSans = Geist({

  variable:
    "--font-geist-sans",

  subsets: ["latin"],
});

const geistMono =
  Geist_Mono({

    variable:
      "--font-geist-mono",

    subsets: ["latin"],
  });

export const metadata: Metadata = {

  title:
    "PortalProof",

  description:
    "Blockchain credential verification platform built on Portaldot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children:
    React.ReactNode;
}>) {

  return (

    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      <body className="min-h-full flex flex-col bg-black text-white">

        <WalletProvider>

          {children}

        </WalletProvider>

      </body>

    </html>
  );
}