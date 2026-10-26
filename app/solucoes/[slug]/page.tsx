import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "../../../components/home/site-header";
import { SiteFooter } from "../../../components/home/site-footer";
import { preDiagnosisCallToAction, socialImage } from "../../../lib/brand";
const solutions: Record<
  string,
  { title: string; intro: string; points: { title: string; detail: string }[]; note: string }
> = {
  consorcios: {
    title: "Consórcios",
    intro:
      "Planejamento de aquisições imobiliárias, veículos e outros objetivos com avaliação consultiva de modalidades e administradoras.",
    points: [
      { title: "Definição de objetivo, orçamento e prazo", detail: "A conversa começa pelo que você deseja adquirir, pelo valor considerado e pelo momento em que pretende avançar." },
      { title: "Comparação das regras, taxas e condições aplicáveis", detail: "As condições de cada alternativa precisam ser consideradas em conjunto, incluindo taxas, prazos e regras contratuais." },
      { title: "Avaliação responsável de lances e possibilidades de contemplação", detail: "A avaliação considera as regras do grupo e as possibilidades de lance, mantendo a informação de que não há garantia de data de contemplação." },
    ],
    note: "A contemplação depende de sorteio ou lance, conforme contrato. Não há garantia de data.",
  },
  credito: {
    title: "Crédito",
    intro:
      "Análise do objetivo e da capacidade de pagamento para avaliar alternativas de crédito.",
    points: [
      { title: "Compreensão da finalidade e do perfil financeiro", detail: "O ponto de partida é entender para que os recursos serão utilizados e quais compromissos precisam ser considerados." },
      { title: "Comparação de custo efetivo e prazos", detail: "A avaliação considera o custo da operação, o prazo e os pagamentos previstos, conforme as condições apresentadas pela instituição." },
      { title: "Apoio na organização das etapas de solicitação", detail: "O próximo passo é definido de acordo com a alternativa avaliada e com os requisitos da instituição responsável." },
    ],
    note: "A contratação depende da disponibilidade do produto e da análise da instituição financeira.",
  },
  seguros: {
    title: "Seguros",
    intro:
      "Soluções de proteção orientadas à realidade de pessoas, famílias e empresas.",
    points: [
      { title: "Identificação de riscos e necessidades", detail: "A conversa considera o que você deseja proteger e quais necessidades são relevantes para sua realidade." },
      { title: "Avaliação de coberturas, exclusões e franquias", detail: "As condições da proteção devem ser compreendidas antes da contratação, incluindo o que está coberto e os limites aplicáveis." },
      { title: "Revisão periódica das necessidades de proteção", detail: "Mudanças na família, no patrimônio ou no negócio podem ser consideradas em uma nova avaliação das necessidades." },
    ],
    note: "Coberturas e contratação dependem das condições e aceitação das seguradoras.",
  },
  investimentos: {
    title: "Investimentos",
    intro:
      "Planejamento patrimonial com foco em objetivos, horizonte de tempo e riscos.",
    points: [
      { title: "Mapeamento de objetivos e perfil", detail: "O início é compreender os objetivos patrimoniais, o horizonte de tempo e as necessidades que precisam ser preservadas." },
      { title: "Organização de alternativas patrimoniais", detail: "A conversa organiza os temas e possibilidades a avaliar conforme o objetivo apresentado, dentro do escopo do atendimento." },
      { title: "Avaliação de riscos, custos e liquidez", detail: "Riscos, custos e disponibilidade dos recursos são temas da avaliação patrimonial. Esta página mantém caráter institucional e educacional." },
    ],
    note: "Conteúdo institucional e educacional. Não constitui recomendação individual de valores mobiliários ou promessa de rentabilidade.",
  },
  planejamento: {
    title: "Planejamento",
    intro:
      "Uma visão integrada das decisões financeiras para conectar prioridades presentes e metas futuras.",
    points: [
      { title: "Diagnóstico do momento financeiro", detail: "A conversa busca organizar a situação atual, os objetivos e os compromissos relevantes para o planejamento." },
      { title: "Definição de prioridades e cenários", detail: "As prioridades ajudam a identificar o que precisa ser preservado e quais possibilidades merecem avaliação." },
      { title: "Plano de ação e acompanhamento", detail: "Os próximos passos são definidos conforme o diagnóstico e a avaliação de viabilidade de cada estratégia." },
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
        <div className="wrap detail-content-grid">
          <div>
            <h2>Como podemos ajudar</h2>
            <ul className="detail-topics">
              {item.points.map((point) => (
                <li key={point.title}>
                  <details>
                    <summary>{point.title}</summary>
                    <p>{point.detail}</p>
                  </details>
                </li>
              ))}
            </ul>
            <p className="detail-condition">{item.note}</p>
          </div>
          <aside className="detail-start" aria-labelledby="detail-start-title">
            <h2 id="detail-start-title">Comece pelo seu objetivo</h2>
            <div className="detail-actions">
              <a className="btn" href="/#contato">{preDiagnosisCallToAction}</a>
              <a className="btn btn-outline" href="/#solucoes">Ver outras soluções</a>
            </div>
            <dl>
              <div><dt><span>01</span> Conte o que deseja realizar</dt><dd>Informe seu objetivo e quando pretende avançar no formulário.</dd></div>
              <div><dt><span>02</span> Revise sua mensagem</dt><dd>O site prepara o conteúdo para você conferir no WhatsApp antes de enviar.</dd></div>
              <div><dt><span>03</span> Inicie a conversa</dt><dd>Compartilhe suas prioridades para avaliar o próximo passo com a BM Capital.</dd></div>
            </dl>
          </aside>
        </div>
      </section>
    </main>
    <SiteFooter />
    </>
  );
}
