//src/app/layout.js
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
  openGraph: {
    title: "My Portfolio",
    description: "Showcasing my projects and skills.",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "My Portfolio",
    images: [
      {
        url: "/default-image.jpg",
        width: 800,
        height: 600,
        alt: "My Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Portfolio",
    description: "Showcasing my projects and skills.",
    image: "/default-image.jpg",
  },
};

export default function RootLayout({ children }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.image} />
        <link rel="canonical" href={baseUrl} />
      </head>
      <body>
        <main>{children}</main>
        <ScrollToTopButton />
        <Footer />
      </body>
    </html>
  );
}
