import Image from "next/image";

export function AboutSection() {
  return (
    <section id="sobre" style={{ background: "#eeeae2" }}>
      <div className="wrap split">
        <div>
          <div className="eyebrow">Conheça a BM Capital</div>
          <div className="section-head">
            <h2>Proximidade no atendimento. Visão de longo prazo.</h2>
            <p>
              Com base em Jequié, Bahia, a BM Capital nasce para conectar
              pessoas, famílias e empresas a decisões financeiras mais
              conscientes, a partir de uma escuta cuidadosa e de uma análise
              individualizada.
            </p>
          </div>
          <ul className="checks">
            <li>Atendimento digital e personalizado</li>
            <li>Reuniões presenciais externas mediante agendamento</li>
            <li>Visão integrada de diferentes soluções</li>
            <li>Transparência sobre condições e regras dos produtos</li>
          </ul>
        </div>
        <figure className="about-visual">
          <Image
            src="/assets/editorial/planejamento-patrimonio.webp"
            alt="Cena ilustrativa de projeto e chaves sobre uma mesa, com uma casa ao fundo."
            width={1200}
            height={900}
            sizes="(max-width: 620px) calc(100vw - 40px), (max-width: 960px) calc(100vw - 64px), 530px"
          />
          <figcaption>
            <div className="quote">
              “Não começamos pelo produto.{" "}
              <span style={{ color: "#ac8347" }}>Começamos pelo objetivo.</span>”
            </div>
            <p className="image-credit">Imagem ilustrativa gerada por IA.</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
