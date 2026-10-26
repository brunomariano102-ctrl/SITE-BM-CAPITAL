import { BrandLogo } from "../brand-logo";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap footrow">
        <BrandLogo lazy />
        <div>
          © 2026 BM Capital · Soluções Financeiras Inteligentes
          <br />
          Jequié, Bahia · Atendimento mediante agendamento
        </div>
        <div>
          <a
            href="https://www.instagram.com/solucoesbmcapital/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram @solucoesbmcapital
          </a>
          <br />
          <a href="mailto:bmcapitalsolucoes@gmail.com">
            bmcapitalsolucoes@gmail.com
          </a>
          <br />
          <a href="/privacidade">Privacidade</a><br /><a href="/cookies">Cookies e preferências</a>
        </div>
      </div>
    </footer>
  );
}
