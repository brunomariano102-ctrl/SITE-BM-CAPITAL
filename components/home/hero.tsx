import Image from "next/image";
import { preDiagnosisCallToAction } from "../../lib/brand";

const callbackFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdz3y92MFFlK4-EQdP0G2uv6RYnpmqxwFqPnVi1Db795gDKpQ/viewform";

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
            <a className="btn" href="#contato" aria-describedby="hero-whatsapp-flow">
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginInlineEnd: 8, verticalAlign: "middle" }}>
                <path d="M12 2a9.8 9.8 0 0 0-8.5 14.7L2 22l5.4-1.4A9.8 9.8 0 1 0 12 2Zm0 17.8c-1.5 0-3-.4-4.2-1.2l-3.2.8.9-3.1a8 8 0 1 1 6.5 3.5Zm4.4-5.9-1.7-.8c-.3-.1-.5-.1-.7.2l-.6.8c-.1.2-.3.2-.6.1-1.4-.6-2.4-1.4-3.1-2.6-.1-.2-.1-.4.1-.5l.5-.6c.1-.2.2-.4.1-.6l-.8-1.9c-.1-.3-.3-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.5.5-.8 1.2-.8 1.9 0 1 .5 2 1 2.7 1.2 1.7 2.8 3 4.8 3.7.9.3 1.7.4 2.3.3.7-.1 1.5-.7 1.7-1.3.2-.5.2-1 .1-1.1s-.3-.2-.6-.3Z" />
              </svg>
              {preDiagnosisCallToAction}
            </a>
            <a className="btn btn-outline" href="#metodo">
              Conheça nosso método
            </a>
          </div>
          <p id="hero-whatsapp-flow">Preencha o pré-diagnóstico e continue o atendimento com a BM pelo WhatsApp.</p>
          <details className="form" style={{ marginBlockStart: 24 }}>
            <summary style={{ cursor: "pointer", fontWeight: 700 }}>Quero que a BM me chame</summary>
            <p>Deixe nome, e-mail e telefone para nossa equipe retornar seu pedido de atendimento.</p>
            <iframe
              title="Formulário de pedido de retorno da BM Capital"
              src={`${callbackFormUrl}?embedded=true`}
              loading="lazy"
              referrerPolicy="no-referrer"
              style={{ display: "block", border: 0, width: "100%", height: 720, borderRadius: 8, background: "#fff" }}
            />
            <p><a href={callbackFormUrl} target="_blank" rel="noopener noreferrer">Abrir formulário em outra aba</a></p>
          </details>
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
