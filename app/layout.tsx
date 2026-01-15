import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

import TopLeftNav from "./components/TopLeftNav";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Rate My Kids Coach - Bringing Accountability to Youth Sports",
  description:
    "Bringing transparency and accountability to youth sports coaching. Starting with soccer, expanding to all youth sports as we grow.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <TopLeftNav />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
