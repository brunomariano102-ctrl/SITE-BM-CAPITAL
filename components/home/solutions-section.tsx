import { solutionSummaries } from "../../lib/solution-summaries";
import { SectionHeading } from "./section-heading";
function SolutionCard({
  glyph,
  title,
  slug,
  description,
}: (typeof solutionSummaries)[number]) {
  return (
    <article className="solution">
      <div className="glyph">{glyph}</div>
      <h3>{title}</h3>
      <a className="solution-link" href={`/solucoes/${slug}`}>
        Conheça a solução ↗
      </a>
      <p>{description}</p>
    </article>
  );
}
export function SolutionsSection() {
  return (
    <section id="solucoes" className="dark">
      <div className="wrap">
        <SectionHeading
          eyebrow="Soluções BM Capital"
          title="Diferentes possibilidades. Uma visão integrada."
          description="Trabalhamos com uma abordagem multi-soluções, combinando análise personalizada, orientação e acompanhamento em cada etapa."
        />
        <div className="solution-grid">
          {solutionSummaries.map((solution) => (
            <SolutionCard key={solution.slug} {...solution} />
          ))}
        </div>
        <p
          style={{
            color: "#aebbc4",
            fontSize: "12px",
            lineHeight: "1.7",
            marginTop: "28px",
          }}
        >
          Produtos e condições sujeitos às regras e à análise das instituições
          responsáveis. Em consórcios, a contemplação ocorre por sorteio ou
          lance, conforme o contrato, sem garantia de data.
        </p>
      </div>
    </section>
  );
}
