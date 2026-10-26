import { ConsentManager } from "../components/privacy/consent-manager";
import type { Metadata } from "next";
import "./globals.css";
import { site } from "../lib/site";
import { publicIndexing } from "../lib/seo";
import { brandAssets, socialImage } from "../lib/brand";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "BM Capital | Soluções Financeiras Inteligentes",
    template: "%s | BM Capital",
  },
  description:
    "Consórcios, crédito, seguros, investimentos e planejamento com atendimento consultivo em Jequié, Bahia.",
  robots: { index: publicIndexing, follow: publicIndexing },
  icons: {
    icon: [
      { url: "/icons/favicon.ico", sizes: "any" },
      { url: brandAssets.icon, sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
  openGraph: {
    url: "/",
    title: "BM Capital | Soluções Financeiras Inteligentes",
    description: "Não começamos pelo produto. Começamos pelo objetivo.",
    locale: "pt_BR",
    type: "website",
    images: [socialImage],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}<ConsentManager deploymentEnvironment={process.env.VERCEL_ENV || "development"} /></body>
    </html>
  );
}
