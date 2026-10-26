"use client";

import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "../brand-logo";
import { preDiagnosisCallToAction } from "../../lib/brand";

const navigation = [
  ["sobre", "A BM Capital"],
  ["objetivos", "Objetivos"],
  ["solucoes", "Soluções"],
  ["metodo", "Método BM"],
  ["contato", "Contato"],
] as const;

export function SiteHeader({ home = true }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const sectionHref = (id: string) => `${home ? "" : "/"}#${id}`;

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 961px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  return (
    <header className="top">
      <div className="wrap nav">
        <a href={sectionHref("inicio")} aria-label="BM Capital início">
          <BrandLogo className="brand" />
        </a>
        <nav className="navlinks" aria-label="Navegação principal">
          {navigation.map(([id, label]) => (
            <a key={id} href={sectionHref(id)}>
              {label}
            </a>
          ))}
          <a className="btn btn-outline" href={sectionHref("contato")}>
            {preDiagnosisCallToAction}
          </a>
        </nav>
        <button
          ref={button}
          type="button"
          className="mobile-toggle"
          id="menuButton"
          aria-expanded={open}
          aria-controls="mobileMenu"
          aria-label="Abrir ou fechar menu de navegação"
          onClick={() => setOpen((value) => !value)}
        >
          ☰ Menu
        </button>
      </div>
      <nav
        className={`mobile-menu${open ? " open" : ""}`}
        id="mobileMenu"
        aria-label="Navegação mobile"
      >
        {navigation.map(([id, label]) => (
          <a key={id} href={sectionHref(id)} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a className="mobile-cta" href={sectionHref("contato")} onClick={() => setOpen(false)}>
          {preDiagnosisCallToAction}
        </a>
      </nav>
    </header>
  );
}
