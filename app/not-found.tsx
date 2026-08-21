import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Sanya Malhotra",
  description:
    "The page you're looking for could not be found. Return to Sanya Malhotra's product design portfolio.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="not-found-page">
      <p className="not-found-page__eyebrow">404</p>
      <h1>Page not found</h1>
      <p>The page you're looking for could not be found.</p>
      <Link href="/">Return home</Link>
    </main>
  );
}
