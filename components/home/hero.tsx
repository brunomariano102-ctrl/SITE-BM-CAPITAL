import Image from "next/image";
import { preDiagnosisCallToAction } from "../../lib/brand";

export function Hero() {
  return (
    <div className="hero" id="inicio">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">
            BM Capital · Soluções financeiras inteligentes
          </div>
          <h1>
            Seu próximo passo merece <em>uma boa estratégia.</em>
          </h1>
          <p>
            Não começamos pelo produto. Começamos pelo objetivo. Entendemos suas
            necessidades e ajudamos você a avaliar caminhos para conquistar,
            proteger e planejar seu patrimônio.
          </p>
          <div className="actions">
            <a className="btn" href="#contato">
              {preDiagnosisCallToAction}
            </a>
            <a className="btn btn-outline" href="#metodo">
              Conheça nosso método
            </a>
          </div>
        </div>
        <figure className="hero-visual">
          <Image
            src="/assets/editorial/planejamento-pessoas.webp"
            alt="Cena ilustrativa de um casal planejando uma aquisição em casa."
            width={1440}
            height={960}
            sizes="(max-width: 620px) calc(100vw - 40px), (max-width: 960px) calc(100vw - 64px), 520px"
            priority
          />
          <figcaption>Imagem ilustrativa. Pessoas fictícias.</figcaption>
        </figure>
      </div>
      <aside className="wrap hero-journey" aria-labelledby="jornada-titulo">
        <div>
          <div className="eyebrow">Uma jornada feita para você</div>
          <h2 id="jornada-titulo">Decisões financeiras começam com boas perguntas.</h2>
          <p>
            Atendimento consultivo, digital e personalizado, com reuniões
            externas mediante agendamento.
          </p>
        </div>
        <ol>
          <li><span>01</span> Conte seu objetivo</li>
          <li><span>02</span> Faça um pré-diagnóstico</li>
          <li><span>03</span> Converse com a BM Capital</li>
        </ol>
      </aside>
    </div>
  );
}
