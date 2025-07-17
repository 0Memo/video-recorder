import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import { satoshi } from "../fonts/font";
import Navbar from "../components/Navbar";

const geistKarla = Karla({
  variable: "--font-geist-karla",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MemoCast",
  description: "Screen Recording & Sharing",
  icons: {
    icon: "/assets/icons/favicon.ico",
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const htmlClassNames = `${geistKarla.variable} ${satoshi.variable} antialiased`;

  // Diagnostic log to compare server and client class names
  if (typeof window === "undefined") {
    console.log("SERVER HTML ClassName:", htmlClassNames);
  } else {
    console.log("CLIENT HTML ClassName:", htmlClassNames);
  }

  return (
    <html lang="en" className={htmlClassNames}>
      <body suppressHydrationWarning={true} className="font-karla">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
