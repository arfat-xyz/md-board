import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://md-board.vercel.app";
export const metadata: Metadata = {
  title: "MD Board | Real-Time Markdown Editor with Sidebar",
  description:
    "Write, preview, and organize markdown in real-time. Add unlimited boards, edit with live preview, and auto-save to localStorage. Built with Next.js, TypeScript, and Tailwind CSS.",
  generator: "Next.js",
  applicationName: "MD Board",
  referrer: "origin-when-cross-origin",
  keywords: [
    "markdown editor",
    "live markdown preview",
    "nextjs markdown",
    "sidebar notes",
    "localstorage markdown",
    "typescript markdown",
    "tailwind css editor",
  ],
  authors: [{ name: "Arfatur Rahman", url: "https://www.arfat.app" }],
  creator: "Arfatur Rahman",
  publisher: "Arfatur Rahman",
  metadataBase: new URL("https://md-board.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MD Board | Real-Time Markdown Editor with Sidebar",
    description:
      "Write, preview, and organize markdown in real-time. Add unlimited boards and auto-save edits.",
    url: "https://md-board.vercel.app",
    siteName: "MD Board",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "MD Board: Markdown Editor with Sidebar",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MD Board | Real-Time Markdown Editor with Sidebar",
    description:
      "Write, preview, and organize markdown in real-time. Add unlimited boards and auto-save edits.",
    creator: "@arfatapp", // Update with your Twitter handle if needed
    images: [`${baseUrl}/og-image.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
