import jwt from "jsonwebtoken";
import EmployeeController from "../controllers/EmployeeController.mjs";
import permissions from "../access/permissions.mjs";

const authenticate = async (req, res, next) => {
  // pega do cookie
  const token = req.cookies?.authToken;

  if (!token) {
    return res
      .status(401)
      .json({ err: true, msg: "Faça login antes de prosseguir." });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ err: true, msg: "Token expirado ou inválido" });
    }

    const employee = await EmployeeController.getByCPF(decoded.cpf);

    if (!employee)
      return res.status(401).json({ msg: "Funcionario logado não existe!" });

    req.employee = employee;
    next();
  });
};

const authorize = (resource, action) => {
  return (req, res, next) => {
    const userRole = req.employee.role;

    const allowed = permissions[userRole?.toUpperCase()]?.some((it) => {
      return it.resource === resource && it.actions.includes(action);
    });

    if (!allowed) {
      return res.status(403).json({ msg: "Acesso negado." });
    }
    next();
  };
};

export { authenticate, authorize };
