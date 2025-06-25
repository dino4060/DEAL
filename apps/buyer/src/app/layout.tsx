import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { AppProvider } from "@/components/layout/AppProvider";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppFooter } from "@/components/layout/AppFooter";

// Set up APP variable
export const APP = {
    name: "DEAL",
}

// Set up font variables
const inter = Inter({
    variable: "--font-inter-sans",
    subsets: ["latin"]
});

// Set up metadata for the page
export const metadata: Metadata = {
    title: "DEAL | Spend Less, Shop More.",
    description: "The best shopping experience.",
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className}
        antialiased bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100`
            }>
                <AppProvider>
                    <main>
                        <AppHeader />
                        {children}
                        <AppFooter />
                    </main>
                    <Toaster closeButton richColors />
                </AppProvider>
            </body>
        </html>
    );
}
