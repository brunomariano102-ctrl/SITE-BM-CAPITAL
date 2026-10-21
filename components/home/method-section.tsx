import { SectionHeading } from "./section-heading";
const steps = [
  {
    title: "BASE",
    description: "Entendemos seu momento, perfil e objetivos.",
  },
  {
    title: "MAPA",
    description: "Organizamos prioridades, possibilidades e restrições.",
  },
  {
    title: "ESTRATÉGIA",
    description: "Comparamos caminhos coerentes com seu contexto.",
  },
  {
    title: "MOVIMENTO",
    description: "Apoiamos a execução dos próximos passos definidos.",
  },
  {
    title: "ACOMPANHAMENTO",
    description: "Mantemos uma relação de longo prazo.",
  },
];
function MethodStep({
  title,
  description,
  number,
}: {
  title: string;
  description: string;
  number: number;
}) {
  return (
    <div className="method">
      <b>{String(number).padStart(2, "0")}</b>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
export function MethodSection() {
  return (
    <section id="metodo">
      <div className="wrap">
        <SectionHeading
          eyebrow="Nossa forma de trabalhar"
          title="O Método BM"
          description="Uma jornada consultiva que começa na compreensão da sua realidade e segue com estratégia e acompanhamento."
        />
        <div className="method-grid">
          {steps.map((step, index) => (
            <MethodStep key={step.title} {...step} number={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
