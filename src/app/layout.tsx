"use client";

import { ReactNode } from "react";
import Head from "next/head";
import { AppStateProvider } from "./contexts/AppStateContext"; // Make sure the path is correct
import "./globals.css"; // Global styles

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <Head>
        <title>Copilot Prototype</title>
        <meta name="description" content="A Next.js app for toggling states" />
      </Head>

      <body>
        <AppStateProvider>{children}</AppStateProvider>
      </body>
    </html>
  );
}
