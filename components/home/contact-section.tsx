import { LeadForm } from "./lead-form";
export function ContactSection() {
  return (
    <section id="contato" className="contact">
      <div className="wrap contact-grid">
        <div>
          <div className="section-head">
            <div className="eyebrow">Seu próximo movimento</div>
            <h2>Vamos conversar sobre seus objetivos?</h2>
            <p>
              Conte brevemente o que você deseja realizar. Nosso pré-diagnóstico
              é o primeiro passo para um atendimento consultivo.
            </p>
          </div>
          <p style={{ lineHeight: "1.8", color: "#d0d8dd" }}>
            Jequié, Bahia · Segunda a sexta, das 08h às 18h · Atendimento
            digital e reuniões agendadas.
          </p>
          <p style={{ color: "#d0d8dd", fontSize: "13px" }}>
            Conheça possibilidades alinhadas ao seu objetivo, com atendimento
            personalizado.
          </p>
        </div>
        <LeadForm />
      </div>
    </section>
  );
}
