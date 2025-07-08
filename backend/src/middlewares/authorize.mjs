import jwt from "jsonwebtoken";
import EmployeeController from "../controllers/EmployeeController.mjs";

const authMiddleware = async (req, res, next) => {
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

    const exists = await EmployeeController.exists(decoded.cpf);

    if (!exists)
      return res.status(401).json({ msg: "Funcionario logado não existe!" });

    req.employee = decoded;
    next();
  });
};

export { authMiddleware };
