import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ADapollo — Michelin Fine Dining",
  description:
    "ADapollo is an award-winning Michelin-star fine dining restaurant. Experience culinary artistry, seasonal menus, and world-class hospitality.",
  keywords: ["fine dining", "Michelin star", "ADapollo", "luxury restaurant", "gourmet"],
  authors: [{ name: "ADapollo Restaurant" }],
  openGraph: {
    title: "ADapollo — Michelin Fine Dining",
    description: "Experience culinary excellence at ADapollo, a Michelin-star fine dining destination.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ADapollo — Michelin Fine Dining",
    description: "Experience culinary excellence at ADapollo.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
