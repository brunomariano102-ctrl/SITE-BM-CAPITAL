"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./callback-dialog.module.css";

const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeBWMiKoO-OiNeyjTgLtxI0czpW8vQSMlfkQa_X1Xt9OUEJiA/viewform";
const dismissedKey = "bm_callback_dialog_dismissed";

export function CallbackDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.location.hash) return;
    try {
      if (sessionStorage.getItem(dismissedKey)) return;
    } catch {
      // The form still works when browser storage is unavailable.
    }
    setOpen(true);
  }, []);

  useEffect(() => {
    const current = dialog.current;
    if (open && current && !current.open) current.showModal();
  }, [open]);

  function handleClose() {
    setOpen(false);
    try {
      sessionStorage.setItem(dismissedKey, "1");
    } catch {
      // Closing also works when browser storage is unavailable.
    }
    trigger.current?.focus({ preventScroll: true });
  }

  return (
    <>
      <button ref={trigger} type="button" className="btn btn-outline" onClick={() => setOpen(true)}>
        Quero meu checklist
      </button>
      <dialog ref={dialog} className={styles.dialog} aria-labelledby="callback-dialog-title" onClose={handleClose}>
        <header className={styles.header}>
          <h2 id="callback-dialog-title">Checklist gratuito da BM Capital</h2>
          <form method="dialog">
            <button type="submit" autoFocus aria-label="Fechar cadastro" className={styles.close}>×</button>
          </form>
        </header>
        {open && (
          <div className={styles.content}>
            <iframe
              title="Inscrição para receber o checklist gratuito"
              src={`${formUrl}?embedded=true&hl=pt-BR`}
              referrerPolicy="no-referrer"
            />
            <a href={formUrl} target="_blank" rel="noopener noreferrer">Abrir inscrição em outra aba</a>
          </div>
        )}
      </dialog>
    </>
  );
}
