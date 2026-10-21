"use client";
import { objectives } from "../../lib/objectives";
import { useDiagnosis } from "./diagnosis-provider";
import { SectionHeading } from "./section-heading";

function ObjectiveCard({
  title,
  description,
  number,
  onSelect,
}: {
  title: string;
  description: string;
  number: number;
  onSelect: (goal: string) => void;
}) {
  return (
    <a
      className="tile"
      href="#contato"
      data-goal={title}
      onClick={() => onSelect(title)}
    >
      <span className="num">{String(number).padStart(2, "0")}</span>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <span className="link">Explorar objetivo ↗</span>
    </a>
  );
}
export function ObjectivesSection() {
  const { setGoal } = useDiagnosis();
  return (
    <section id="objetivos">
      <div className="wrap">
        <SectionHeading
          eyebrow="Comece pelo que importa"
          title="O que você deseja realizar?"
          description="Seu objetivo é o ponto de partida. Escolha uma necessidade e descubra como podemos estruturar uma conversa sobre ela."
        />
        <div className="grid">
          {objectives.map((objective, index) => (
            <ObjectiveCard
              key={objective.title}
              {...objective}
              number={index + 1}
              onSelect={setGoal}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
