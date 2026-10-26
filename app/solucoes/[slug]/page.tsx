import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "../../../components/home/site-header";
import { SiteFooter } from "../../../components/home/site-footer";
import { preDiagnosisCallToAction, socialImage } from "../../../lib/brand";
const solutions: Record<
  string,
  { title: string; intro: string; points: string[]; note: string }
> = {
  consorcios: {
    title: "Consórcios",
    intro:
      "Planejamento de aquisições imobiliárias, veículos e outros objetivos com avaliação consultiva de modalidades e administradoras.",
    points: [
      "Definição de objetivo, orçamento e prazo",
      "Comparação das regras, taxas e condições aplicáveis",
      "Avaliação responsável de lances e possibilidades de contemplação",
    ],
    note: "A contemplação depende de sorteio ou lance, conforme contrato. Não há garantia de data.",
  },
  credito: {
    title: "Crédito",
    intro:
      "Análise do objetivo e da capacidade de pagamento para avaliar alternativas de crédito.",
    points: [
      "Compreensão da finalidade e do perfil financeiro",
      "Comparação de custo efetivo e prazos",
      "Apoio na organização das etapas de solicitação",
    ],
    note: "A contratação depende da disponibilidade do produto e da análise da instituição financeira.",
  },
  seguros: {
    title: "Seguros",
    intro:
      "Soluções de proteção orientadas à realidade de pessoas, famílias e empresas.",
    points: [
      "Identificação de riscos e necessidades",
      "Avaliação de coberturas, exclusões e franquias",
      "Revisão periódica das necessidades de proteção",
    ],
    note: "Coberturas e contratação dependem das condições e aceitação das seguradoras.",
  },
  investimentos: {
    title: "Investimentos",
    intro:
      "Planejamento patrimonial com foco em objetivos, horizonte de tempo e riscos.",
    points: [
      "Mapeamento de objetivos e perfil",
      "Organização de alternativas patrimoniais",
      "Avaliação de riscos, custos e liquidez",
    ],
    note: "Conteúdo institucional e educacional. Não constitui recomendação individual de valores mobiliários ou promessa de rentabilidade.",
  },
  planejamento: {
    title: "Planejamento",
    intro:
      "Uma visão integrada das decisões financeiras para conectar prioridades presentes e metas futuras.",
    points: [
      "Diagnóstico do momento financeiro",
      "Definição de prioridades e cenários",
      "Plano de ação e acompanhamento",
    ],
    note: "As estratégias são individualizadas após diagnóstico e sujeitas à avaliação de viabilidade.",
  },
};
export function generateStaticParams() {
  return Object.keys(solutions).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!Object.hasOwn(solutions, slug)) return { title: "Solução" };
  const item = solutions[slug];
  return {
    title: item.title,
    description: item.intro,
    alternates: { canonical: `/solucoes/${slug}` },
    openGraph: {
      url: `/solucoes/${slug}`,
      title: `${item.title} | BM Capital`,
      description: item.intro,
      locale: "pt_BR",
      type: "website",
      images: [socialImage],
    },
  };
}
export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!Object.hasOwn(solutions, slug)) notFound();
  const item = solutions[slug];
  return (
    <>
    <SiteHeader home={false} />
    <main className="detail-main">
      <section className="detail-hero">
        <div className="wrap">
          <a className="detail-back" href="/">
            ← Voltar à BM Capital
          </a>
          <div className="eyebrow" style={{ marginTop: 40 }}>
            Soluções BM Capital
          </div>
          <h1>{item.title}</h1>
          <p>{item.intro}</p>
        </div>
      </section>
      <section className="detail-body">
        <div className="wrap">
          <h2>Como podemos ajudar</h2>
          <ul>
            {item.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p>
            <small>{item.note}</small>
          </p>
          <div className="detail-actions">
            <a className="btn" href="/#contato">
              {preDiagnosisCallToAction}
            </a>
            <a
              className="btn btn-outline"
              href="/#solucoes"
            >
              Ver outras soluções
            </a>
          </div>
          <p className="detail-next-step">
            Ao continuar, você poderá revisar a mensagem no WhatsApp antes de
            enviá-la à nossa equipe.
          </p>
        </div>
      </section>
    </main>
    <SiteFooter />
    </>
  );
}
