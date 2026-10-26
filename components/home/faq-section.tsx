const questions = [
  {
    question: "O que é o pré-diagnóstico BM?",
    answer: "É o primeiro passo para iniciar uma conversa sobre seu objetivo. No formulário, você informa como podemos chamar você, o que deseja realizar e quando pretende avançar.",
  },
  {
    question: "O formulário envia minha solicitação automaticamente?",
    answer: "Não. Ele prepara uma mensagem para o WhatsApp. Você pode revisar o conteúdo e confirmar o envio no próprio WhatsApp.",
  },
  {
    question: "Preciso saber qual solução escolher?",
    answer: "Você pode começar pelo seu objetivo. O formulário não exige escolher um produto: a proposta da BM Capital é entender o que você deseja realizar para avaliar caminhos possíveis.",
  },
  {
    question: "Como funciona o atendimento?",
    answer: "O atendimento é digital, de segunda a sexta, das 08h às 18h. A BM Capital tem base em Jequié, Bahia, e realiza reuniões presenciais externas mediante agendamento.",
  },
];

export function FaqSection() {
  return (
    <section id="duvidas" aria-labelledby="duvidas-titulo">
      <div className="wrap faq-grid">
        <div className="section-head">
          <div className="eyebrow">Antes de começar</div>
          <h2 id="duvidas-titulo">Dúvidas frequentes</h2>
        </div>
        <div className="faq-list">
          {questions.map(({ question, answer }) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
