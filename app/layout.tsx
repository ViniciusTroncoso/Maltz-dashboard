import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maltz Dashboard — Marketing & Leads",
  description:
    "Painel de performance de marketing da 01 Maltz Niterói. Acompanhe leads, atribuição Meta vs Google, e conversões do WhatsApp em tempo real.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="min-h-screen bg-ink-900 text-cream">{children}</body>
    </html>
  );
}
