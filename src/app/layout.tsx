import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Constantin Projects — Learning Tools & Digital Experiments",
  description:
    "A personal project hub for digital tools focused on learning, practice, productivity and self-improvement.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={geist.variable}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
