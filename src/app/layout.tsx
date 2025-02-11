import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AuthSessionProvider from "@/components/Auth/AuthSessionProvider/AuthSessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmartSage - Your Website’s AI Knowledge Expert.",
  description: "Knowlagable AI bot with custom knowledge base",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: dark)",
        url: "/white-logo.png",
        href: "/white-logo.png",
      },
      {
        media: "(prefers-color-scheme: light)",
        url: "/dark-logo.png",
        href: "/dark-logo.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthSessionProvider>
          {children}
          <Toaster />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
