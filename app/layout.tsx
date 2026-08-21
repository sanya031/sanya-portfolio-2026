import type { Metadata } from "next";
import { TransitionProvider } from "../components/transitions/TransitionProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sanyamalhotra.me"),
  title: "Sanya Malhotra | Product Designer Portfolio",
  description:
    "Product designer crafting thoughtful, visually polished interfaces across systems, ambiguity, and complex product experiences.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sanya Malhotra | Product Designer Portfolio",
    description:
      "Explore selected product design work across UX, systems thinking, visual craft, and interface design.",
    url: "/",
    siteName: "Sanya Malhotra",
    images: [
      {
        url: "/assets/bachground painting 1.webp",
        width: 1200,
        height: 630,
        alt: "Sanya Malhotra product design portfolio homepage",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanya Malhotra | Product Designer Portfolio",
    description:
      "Explore selected product design work across UX, systems thinking, visual craft, and interface design.",
    images: ["/assets/bachground painting 1.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/assets/hero-background.webp"
          as="image"
          type="image/webp"
        />
      </head>
      <body suppressHydrationWarning>
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
