import type { Metadata } from "next";
import { Montserrat, Raleway } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tutéa - Espace de gestion tutelle",
  description: "Application de gestion et communication entre tuteur et personne sous tutelle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${raleway.variable}`} suppressHydrationWarning>
      <body className="font-raleway antialiased bg-brand-bg text-foreground">{children}</body>
    </html>
  );
}