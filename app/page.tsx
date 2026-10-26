import type { Metadata } from "next";
import { AboutSection } from "../components/home/about-section";
import { ContactSection } from "../components/home/contact-section";
import { DiagnosisProvider } from "../components/home/diagnosis-provider";
import { FaqSection } from "../components/home/faq-section";
import { Hero } from "../components/home/hero";
import { MethodSection } from "../components/home/method-section";
import { ObjectivesSection } from "../components/home/objectives-section";
import { SiteFooter } from "../components/home/site-footer";
import { SiteHeader } from "../components/home/site-header";
import { SolutionsSection } from "../components/home/solutions-section";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <DiagnosisProvider>
      <SiteHeader />
      <main>
        <Hero />
        <ObjectivesSection />
        <SolutionsSection />
        <MethodSection />
        <AboutSection />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </DiagnosisProvider>
  );
}
