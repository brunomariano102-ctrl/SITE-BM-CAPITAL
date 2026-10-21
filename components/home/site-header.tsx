"use client";

import { useEffect, useRef, useState } from "react";

const navigation = [
  ["sobre", "A BM Capital"],
  ["objetivos", "Objetivos"],
  ["solucoes", "Soluções"],
  ["metodo", "Método BM"],
  ["contato", "Contato"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

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
        <a href="#inicio" aria-label="BM Capital início">
          <img
            className="brand"
            src="/assets/bm-capital-logo-transparente.png"
            alt="BM Capital"
          />
        </a>
        <nav className="navlinks" aria-label="Navegação principal">
          {navigation.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
          <a className="btn btn-outline" href="#contato">
            Solicitar diagnóstico
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
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
