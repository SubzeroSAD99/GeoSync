import React from "react";
import { Title, StyledForm } from "./Report.styled.mjs";
import InputDate from "@components/InputDate/InputDate";
import { toast } from "react-toastify";
import api from "@utils/api.mjs";
import { useAuth } from "@contexts/AuthContext.jsx";

const Report = () => {
  const { setUserLogged } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Gerando Relatório...");
    const form = e.target;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await api.post("/financial/genReport", data, {
        responseType: "blob",
      });

      if (response.data) {
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(pdfBlob);
        window.open(url, "_blank");

        // Revoga a URL após 1 min pra liberar memória
        setTimeout(() => window.URL.revokeObjectURL(url), 60 * 1000);

        toast.update(toastId, {
          render: "Relatório gerado com sucesso!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (err) {
      if (err.status == 401) {
        setUserLogged(null);
      }

      toast.update(toastId, {
        render: "Erro ao gerar relatório",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <section>
      <Title>Relatório</Title>

      <StyledForm onSubmit={handleSubmit}>
        <h3>Período</h3>
        <div>
          <InputDate label="De" name="start" />
          <span>~</span>
          <InputDate label="Até" name="end" />
        </div>
        <button type="submit">Gerar Relatório</button>
      </StyledForm>
    </section>
  );
};

export default Report;
