import type { Metadata } from "next";
import { TikTok_Sans } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";

const tiktok = TikTok_Sans({
  subsets: ["latin"],
  variable: "--font-tiktok",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thais Dela Justina | Arquiteta do LOFT",
  description:
    "Projetos que cabem no seu terreno (e no seu bolso). Casas, sobrados, geminadas, kitnets e lofts, interiores e reformas. Online para todo o Brasil e presencial em Medianeira (PR).",
  openGraph: {
    title: "Thais Dela Justina, Arquiteta do LOFT",
    description: "Projetos que cabem no seu terreno (e no seu bolso). Online para todo o Brasil e presencial em Medianeira (PR).",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${tiktok.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
