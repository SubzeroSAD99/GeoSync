import React, { useEffect, useState } from "react";
import Table from "@components/Table/Table.jsx";
import api from "@utils/api.mjs";
import { StyledLink, Title, TitleContainer } from "./Employees.styled.mjs";
import { useAuth } from "@contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "@components/Loading/Loading";
import ConfirmDialog from "@components/ConfirmDialog/ConfirmDialog.jsx";

const Employees = () => {
  const [allEmployees, setAllEmployees] = useState({});
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setUserLogged } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getAllEmployees = async () => {
      try {
        const response = await api.post("/employee/getAll");

        const objList = response.data.employees;

        objList.sort((a, b) => a.role.localeCompare(b.role));

        if (response.data) {
          setAllEmployees(objList);
          setLoading(false);
        }
      } catch (err) {
        const msg = err?.response?.data?.msg;

        if (err.status == 401) return setUserLogged(null);

        toast.error(msg);

        navigate("/");
      }
    };

    getAllEmployees();
  }, []);

  const handleAskDelete = (id) => {
    setToDelete(id);
    setOpen(true);
  };

  const deleteEmployee = async () => {
    setBusy(true);
    try {
      const response = await api.post("/employee/delete", { id: toDelete });

      if (response.data && !response.data.err) {
        setAllEmployees((prev) =>
          prev.filter((employee) => employee.id !== toDelete)
        );

        toast.warn(response.data.msg);
      }
    } catch (err) {
      const msg = err.response?.data?.msg;
      if (msg) toast.error(msg);

      if (err.status == 401) return setUserLogged(null);
    } finally {
      setBusy(false);
      setOpen(false);
      setToDelete(null);
    }
  };

  const handleEdit = (id) => {
    navigate(`/gerenciamento/funcionarios/editar/${id}`);
  };

  if (loading) return <Loading />;

  return (
    <section>
      <ConfirmDialog
        open={open}
        title="Excluir Funcionário"
        description={`Tem certeza que deseja excluir este funcionário? Esta ação não pode ser desfeita.`}
        confirmLabel="Excluir Funcionário"
        cancelLabel="Cancelar"
        loading={false}
        onConfirm={() => toDelete && deleteEmployee()}
        onCancel={() => {
          if (!busy) {
            setOpen(false);
            setToDelete(null);
          }
        }}
      />
      <TitleContainer>
        <Title>Lista de Funcionarios</Title>
        <StyledLink to={"/gerenciamento/funcionarios/cadastrar"}>
          CADASTRAR FUNCIONARIO
        </StyledLink>
      </TitleContainer>

      <Table
        columns={["Nome", "Cargo"]}
        rows={["fullName", "role"]}
        array={allEmployees}
        setArray={setAllEmployees}
        handleDelete={handleAskDelete}
        handleEdit={handleEdit}
      />
    </section>
  );
};

export default Employees;
