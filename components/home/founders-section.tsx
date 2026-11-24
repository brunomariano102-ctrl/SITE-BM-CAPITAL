const qualifications = [
  { title: "PCA-10 — Profissional de Consórcios", institution: "ABAC", validity: "05/11/2029", dateTime: "2029-11-05" },
  { title: "FBB100 — Correspondente Completo + LGPD", institution: "FEBRABAN", validity: "16/09/2029", dateTime: "2029-09-16" },
  { title: "Certificação Completa + LGPD", institution: "ANEPS", validity: "18/10/2029", dateTime: "2029-10-18" },
  { title: "PLDFT — Correspondentes Bancários e Cambiais", institution: "ANEPS", validity: "08/10/2029", dateTime: "2029-10-08" },
];

function FounderPhoto({ name, alt }: { name: string; alt: string }) {
  return (
    <img
      src={`/assets/fundadores/${name}-960.webp`}
      srcSet={`/assets/fundadores/${name}-480.webp 480w, /assets/fundadores/${name}-960.webp 960w`}
      sizes="(max-width: 620px) calc(100vw - 40px), (max-width: 960px) 420px, 380px"
      width={960}
      height={1280}
      loading="lazy"
      decoding="async"
      alt={alt}
    />
  );
}

export function FoundersSection() {
  return (
    <section id="fundadores" className="founders" aria-labelledby="fundadores-titulo">
      <div className="wrap">
        <div className="founders-intro">
          <div className="section-head">
            <div className="eyebrow">Pessoas à frente dos objetivos</div>
            <h2 id="fundadores-titulo">Quem está à frente da BM Capital</h2>
            <p>À frente da BM Capital estão Bruno Mariano e Thalita Sena, construindo uma empresa que aproxima soluções financeiras e patrimoniais dos objetivos de pessoas, famílias e negócios.</p>
            <p>Com base em Jequié, na Bahia, a BM está construindo sua atuação digital para atender clientes em diferentes regiões do Brasil.</p>
          </div>
          <figure className="founders-together">
            <FounderPhoto name="bruno-e-thalita" alt="Bruno Mariano e Thalita Sena no escritório da BM Capital" />
          </figure>
        </div>

        <div className="founders-profiles">
          <article className="founder-profile" aria-labelledby="bruno-titulo">
            <figure className="founder-portrait"><FounderPhoto name="bruno-mariano" alt="Bruno Mariano" /></figure>
            <div className="founder-copy">
              <h3 id="bruno-titulo">Bruno Mariano</h3>
              <p className="founder-role">Experiência de quem empreende</p>
              <p>Bruno começou a empreender em 2015, aos 17 anos. Sua trajetória reúne experiências no agronegócio, comércio de frutas, prestação de serviços, distribuição e varejo, incluindo quatro anos à frente da operação de um supermercado.</p>
              <p>Nesse caminho, vivenciou desafios que fazem parte da realidade de muitos clientes: administrar equipes, negociar com fornecedores, organizar recursos e decidir quando investir e crescer.</p>
              <p>Essa experiência contribui para a abordagem da BM Capital: compreender a realidade do cliente e o que ele deseja alcançar antes de apresentar uma solução.</p>
              <p>Hoje, Bruno combina sua vivência empreendedora com a formação contínua no setor financeiro e de consórcios.</p>
              <div className="founder-qualifications" aria-labelledby="certificacoes-bruno">
                <div className="founder-credentials-heading">
                  <img src="/assets/fundadores/selo-abac-pca10.webp" alt="Selo de certificação pessoal ABAC PCA-10 de Bruno Mariano, válido até novembro de 2029" width={120} height={120} loading="lazy" decoding="async" />
                  <h4 id="certificacoes-bruno">Certificações pessoais de Bruno Mariano</h4>
                </div>
                <ul className="founder-certifications">
                  {qualifications.map(({ title, institution, validity, dateTime }) => (
                    <li key={title}>
                      <span className="certification-institution">{institution}</span>
                      <h5>{title}</h5>
                      <p>Validade: <time dateTime={dateTime}>{validity}</time></p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>

          <article className="founder-profile" aria-labelledby="thalita-titulo">
            <figure className="founder-portrait"><FounderPhoto name="thalita-sena" alt="Thalita Sena, cofundadora da BM Capital" /></figure>
            <div className="founder-copy">
              <h3 id="thalita-titulo">Thalita Sena</h3>
              <p className="founder-role">Cofundadora da BM Capital</p>
              <p>Thalita Sena é cofundadora da BM Capital e atua na gestão administrativa da empresa. Ao lado de Bruno Mariano, fundou a BM Capital com o propósito de aproximar soluções financeiras e patrimoniais dos objetivos de pessoas, famílias e negócios.</p>
              <p>Seu trabalho conecta o planejamento à execução. É assim que ela dá estrutura à operação e prepara a BM Capital para crescer de forma organizada.</p>
            </div>
          </article>
        </div>

        <div className="founders-contact">
          <p>Não começamos pelo produto. <span>Começamos pelo objetivo.</span></p>
          <a className="btn" href="#contato">Conte seu objetivo à BM</a>
        </div>
      </div>
    </section>
  );
}
