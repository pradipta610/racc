import type { Metadata } from "next";
import "@fontsource/dm-sans/300.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "RACC Australia – Trusted Migration & Education Agent Melbourne",
  description:
    "Registered migration agent and education consultancy in Melbourne. 20+ years helping skilled workers, students and families navigate the Australian visa system. MARN 1572962.",
  keywords:
    "migration agent Melbourne, registered migration agent, student visa Australia, skilled visa 189 190 491, education agent Melbourne, MARN 1572962",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
