import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/app/query-provider";
import '@/styles/globals.scss';
import {ApiErrorProvider} from "@/hooks/ErrorContext";
import {GlobalSessionWatcher} from "@/hooks/GlobalSeasonWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chemnitz Sites",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <QueryProvider>
          <ApiErrorProvider>
            <GlobalSessionWatcher/>
            {children}
          </ApiErrorProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
