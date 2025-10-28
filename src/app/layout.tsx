import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "nextjs template with testing setup",
  description: "Just install and go!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
