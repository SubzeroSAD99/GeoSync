import { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import {
  ButtonContainer,
  Dialog,
  DialogContainer,
  DialogHeader,
} from "./ConfirmDialog.styled.mjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@/icons.mjs";

export default function ConfirmDialog({
  open,
  title = "Confirmar ação",
  description = "Tem certeza?",
  confirmLabel = "Excluir",
  cancelLabel = "Cancelar",
  loading = false,
  onConfirm,
  onCancel,
}) {
  const dialogRef = useRef(null);

  // cria o portal alvo (caso não exista)
  const modalRoot = useMemo(() => {
    if (typeof document === "undefined") return null;
    let el = document.getElementById("modal-root");
    if (!el) {
      el = document.createElement("div");
      el.id = "modal-root";
      document.body.appendChild(el);
    }
    return el;
  }, []);

  useEffect(() => {
    if (!open) return;
    // scroll lock
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // foco inicial
    const auto = dialogRef.current?.querySelector("[data-autofocus]");
    auto?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCancel?.();
      }
      if (e.key === "Tab") {
        const scope = dialogRef.current;
        if (!scope) return;
        const focusables = scope.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const list = Array.from(focusables);
        if (list.length === 0) return;

        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onCancel]);

  if (!open || !modalRoot) return null;

  return createPortal(
    <DialogContainer
      aria-hidden="false"
      aria-modal="true"
      role="alertdialog"
      aria-labelledby="confirm-title"
      aria-describedby="confirm-desc"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCancel?.();
      }}
    >
      <Dialog ref={dialogRef}>
        <DialogHeader>
          <div>
            <FontAwesomeIcon icon={faTriangleExclamation} />
            <h1 id="confirm-title">{title}</h1>
          </div>
          <p id="confirm-desc">{description}</p>
        </DialogHeader>
        <ButtonContainer>
          <button
            type="button"
            data-autofocus
            onClick={onCancel}
            disabled={loading}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            style={{ opacity: loading ? 0.7 : 1 }}
            disabled={loading}
          >
            {loading ? "Processando..." : confirmLabel}
          </button>
        </ButtonContainer>
      </Dialog>
    </DialogContainer>,
    modalRoot
  );
}
