import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className="flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans transition-colors duration-300"
        style={{
          fontFamily: "var(--font-sans)",
        }}
      >
        <Navbar />

        <main className="flex-grow w-full max-w-6xl mx-auto px-4 md:px-8">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
