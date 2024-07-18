import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "700", "300", "600"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "MEDSYNC",
  description: "Healthcare made easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider
       attribute="class"
       defaultTheme="dark"
       >
        <body className={cn("min-h-screen bg-dark-300 font-sans antialiased", fontSans.variable)}>{children}</body>
       </ThemeProvider>
    </html>
  );
}
