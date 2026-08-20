import type { Metadata } from "next";
import { TransitionProvider } from "../components/transitions/TransitionProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sanya Malhotra | Product Designer",
  description:
    "A product design portfolio exploring craft, complexity, systems, and visually polished interfaces.",
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
