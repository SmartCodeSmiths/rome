import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import { LogoIcon } from "@/components/icons";
import { NavLinks } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rome — PR Dashboard",
  description: "A modern dashboard for browsing pull requests.",
};

const themeScript = `
(function () {
  var theme = "dark";
  try {
    var stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") theme = stored;
  } catch (e) {}
  var root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
              <div className="flex items-center gap-6">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-accent transition-colors hover:text-muted"
                >
                  <LogoIcon className="h-6 w-6" />
                  <span>Rome</span>
                </Link>
                <NavLinks />
              </div>
              <ThemeToggle />
            </div>
          </header>
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
