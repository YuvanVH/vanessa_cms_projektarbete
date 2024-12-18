// src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
// import Header from './components/Header';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* <Header
          title="Welcome to My Portfolio"
          slogan="Building the future, one project at a time."
          backgroundImage="/images/hero-bg.jpg"
        /> */}
        <main>{children}</main>
      </body>
    </html>
  );
}
