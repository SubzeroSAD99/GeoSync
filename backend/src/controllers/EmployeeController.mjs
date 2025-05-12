import Employee from "../models/Employee.mjs";
import { generateToken } from "../utils/Token.mjs";

class EmployeeController {
  static async login(req, res) {
    try {
      const { cpf, password } = req.body;

      const employee = await Employee.findOne({ where: { cpf } });

      if (!employee)
        return res.json({ err: true, msg: "Usuario não encontrado!" });

      const dbPass = employee.getDataValue("password");

      if (dbPass !== password)
        return res.json({ err: true, msg: "CPF e/ou senha incorretos!" });

      const payload = {
        id: employee.id,
        fullName: employee.fullName,
        cpf: employee.cpf,
        position: employee.position,
      };

      const token = generateToken(payload);

      res
        .cookie("authToken", token, {
          httpOnly: true, // impede acesso via JS
          secure: process.env.NODE_ENV === "production", // só em HTTPS
          sameSite: "Strict", // contra CSRF
          maxAge: 60 * 60 * 1000, // 1h em ms
        })
        .json({
          err: false,
          employee: employee.fullName,
        });
    } catch (err) {
      res.status(400).json({ err: "Erro interno do servidor!" });
    }
  }

  static async getAll(req, res) {
    try {
      const employees = await Employee.findAll();

      const nameEmployees = employees.map((it) => {
        return it.getDataValue("fullName");
      });

      res.json({ list: nameEmployees });
    } catch (err) {
      res.status(400).json({ err: "Erro ao localizar usuarios!" });
    }
  }
}

export default EmployeeController;
