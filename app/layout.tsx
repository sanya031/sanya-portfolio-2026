import type { Metadata } from "next";
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
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
