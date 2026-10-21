import type { Metadata } from "next";
import "./globals.css";
import { site } from "../lib/site";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "BM Capital | Soluções Financeiras Inteligentes",
    template: "%s | BM Capital",
  },
  description:
    "Consórcios, crédito, seguros, investimentos e planejamento com atendimento consultivo em Jequié, Bahia.",
  robots: { index: false, follow: false },
  icons: { icon: "/assets/bm-capital-logo-transparente.png" },
  openGraph: {
    url: "/",
    title: "BM Capital | Soluções Financeiras Inteligentes",
    description: "Não começamos pelo produto. Começamos pelo objetivo.",
    locale: "pt_BR",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
