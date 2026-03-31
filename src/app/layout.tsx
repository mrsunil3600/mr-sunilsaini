import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { ReactNode } from "react";

import "@/app/globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk"
});

export const metadata: Metadata = {
  title: "Senior Software Engineer Portfolio",
  description: "Modern premium 3D portfolio frontend built with Next.js, React Three Fiber, Framer Motion, and Tailwind CSS.",
  metadataBase: new URL("https://portfolio.example.dev")
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${manrope.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
