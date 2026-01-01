import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: {
    default:
      "Husmorskurer.se - En samling traditionella svenska huskurer och naturliga tips från förr i tiden.",
    template: "%s | Husmorskurer.se",
  },
  description:
    "Traditionella svenska huskurer och naturliga tips för vardagliga krämpor. Upptäck mormors beprövade knep med teer, omslag och enkla ingredienser från naturen.",
  keywords:
    "huskurer, svenska huskurer, husmorskurer, naturläkemedel, folkmedicin, traditionella kurer, mormorsknep, husknep",
  openGraph: {
    title: "Husmorskurer.se",
    description:
      "Traditionella svenska huskurer för naturlig vardagshälsa – från kamomillte till ingefära och honung.",
    url: "https://husmorskurer.se",
    siteName: "Husmorskurer.se",
    images: [
      {
        url: "https://husmorskurer.se/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Husmorskurer – traditionella svenska naturliga tips",
      },
    ],
    locale: "sv_SE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Husmorskurer.se",
    description:
      "Upptäck traditionella svenska huskurer för vardagliga besvär – naturligt och enkelt.",
    images: ["https://husmorskurer.se/og-image.jpg"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f59e0b" />
      </head>
      <body className="antialiased bg-gradient-to-b from-green-50 via-amber-50 to-orange-50 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
