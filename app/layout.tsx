import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import { satoshi } from "../fonts/font";
import { i18n, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import BodyFadeEffect from "./BodyFadeEffect";

const geistKarla = Karla({
    variable: "--font-geist-karla",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "MemoCast",
    description: "Screen Recording & Sharing",
    icons: {
        icon: "/assets/icons/favicon.ico",
    },
};

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ locale }));
}

export default async function Layout({
    children,
    params
}: Readonly<{
    children: React.ReactNode
    params: { locale: Locale }
}>) {
    const htmlClassNames = `${geistKarla.variable} ${satoshi.variable} antialiased`;

    // Diagnostic log to compare server and client class names
    if (typeof window === "undefined") {
        console.log("SERVER HTML ClassName:", htmlClassNames);
    } else {
        console.log("CLIENT HTML ClassName:", htmlClassNames);
    }

    return (
        <html lang={params.locale}  className={htmlClassNames} suppressHydrationWarning>
            <body suppressHydrationWarning className="font-karla">
                <BodyFadeEffect/>
                {children}
            </body>
        </html>
    );
}
