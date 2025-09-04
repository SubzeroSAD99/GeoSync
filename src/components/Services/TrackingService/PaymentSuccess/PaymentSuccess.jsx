import React, { useEffect, useRef } from "react";
import {
  Card,
  Check,
  CheckContainer,
  Container,
  Halo,
  Spark,
  StyledSvg,
  Circle,
  Title,
  StyledButton,
} from "./PaymentSuccess.styled.mjs";

const PaymentSuccess = ({
  open,
  onClose,
  title = "Pagamento confirmado",
  message = "Tudo certo! Seu pagamento foi aprovado.",
  autoCloseMs,
}) => {
  const timeoutRef = useRef(null);

  // Fecha com ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Auto close
  useEffect(() => {
    if (!open || !autoCloseMs) return;
    timeoutRef.current = window.setTimeout(() => onClose?.(), autoCloseMs);
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [open, autoCloseMs, onClose]);

  if (!open) return null;

  return (
    <Container
      role="dialog"
      aria-modal="true"
      aria-live="polite"
      aria-label={title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <Card role="document">
        {/* brilhos */}
        <Spark className="s1" />
        <Spark className="s2" />
        <Spark className="s3" />
        <Spark className="s4" />

        {/* halo */}
        <Halo aria-hidden />

        {/* Ícone check */}
        <CheckContainer aria-hidden>
          <StyledSvg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
            <Circle
              cx="36"
              cy="36"
              r="30"
              fill="none"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <Check
              d="M22 37.5l10 10 18-20"
              fill="none"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </StyledSvg>
        </CheckContainer>

        <Title>{title}</Title>

        <StyledButton type="button" onClick={onClose}>
          Ok
        </StyledButton>
      </Card>
    </Container>
  );
};

export default PaymentSuccess;
