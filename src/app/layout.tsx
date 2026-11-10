import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/compoenets/layout/Navbar/Navbar";
import { Breadcrumbs, BreadcrumbsFallback } from "@/components/layout/breadcrumbs";
import { Suspense } from "react";
import { AppPreferencesProvider } from "@/providers/app-preferences-provider";
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from "next-auth/react";
import ComProviders from "@/providers/ComProviders";
import TanProviders from "@/providers/TanProvider";
const robotoHeading = Roboto({ subsets: ['latin'], variable: '--font-heading' });

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshCart | Online shopping",
  description: "Discover products from brands you love at FreshCart.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable, robotoHeading.variable)}
    >
      <body className="min-h-full flex flex-col">

        <TanProviders>
          <AppPreferencesProvider>
            <ToastContainer />
            <ComProviders>
              <Navbar />
            </ComProviders>
            <Suspense fallback={<BreadcrumbsFallback />}>
              <Breadcrumbs />
            </Suspense>
            {children}
          </AppPreferencesProvider>
          <footer>footer</footer>
        </TanProviders>

      </body>
    </html>
  );
}
