// src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import ScrollToTopButton from './components/ScrollToTopButton'; // Importera knappen
import "./styles/globals.css";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "My Portfolio",
  description: "Showcasing my projects and skills.",
};

export default function RootLayout({ children }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content={baseUrl} />
        <link rel="canonical" href={baseUrl} />
      </head>
      <body>
        <main>{children}</main>
        <ScrollToTopButton />
      </body>
    </html>
  );
}
