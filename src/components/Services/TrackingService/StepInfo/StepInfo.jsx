import React from "react";
import { Container, InfoContainer } from "./StepInfo.styled.mjs";

const StepInfo = ({ open, setOpen }) => {
  if (!open) return null;
  return (
    <Container onClick={() => setOpen(false)}>
      <InfoContainer>
        <h3>O que é cada etapa?</h3>
        <ul>
          <li>
            <span>AGENDADO:</span> Seu serviço está programado para ser
            realizado conforme a data e hora acordadas.
          </li>
          <li>
            <span>MEDIDO:</span> Nossos profissionais estão no local realizando
            as medições necessárias para o seu projeto.
          </li>
          <li>
            <span>PROCESSADO:</span> Os dados coletados estão sendo processados
            e organizados para a próxima fase.
          </li>
          <li>
            <span>CONFECÇÃO:</span> Estamos trabalhando na criação dos
            documentos e materiais necessários com base nas medições realizadas.
          </li>
          <li>
            <span>IMPRESSO:</span> Os documentos e relatórios foram impressos e
            estão prontos para a próxima etapa.
          </li>
          <li>
            <span>CONCLUIDO:</span> O seu serviço de topografia foi concluído
            com sucesso.
          </li>
          <li>
            <span>EM ROTA DE ENTREGA:</span> Seu pedido está a caminho do local
            de entrega ou retirada.
          </li>
          <li>
            <span>EM LOCAL DE RETIRADA:</span> Se preferir, seu pedido está
            disponível para retirada no local indicado.
          </li>
          <li>
            <span>ENTREGA FINALIZADA:</span> Seu serviço foi entregue com
            sucesso, concluindo o processo.
          </li>
        </ul>
      </InfoContainer>
    </Container>
  );
};

export default StepInfo;
