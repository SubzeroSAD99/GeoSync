import Joi from "joi";
import Employee from "../models/Employee.mjs";
import { generateToken, verifyToken } from "../utils/Token.mjs";

const registerSchema = Joi.object({
  position: Joi.string()
    .empty("")
    .lowercase()
    .valid("funcionario", "administrador")
    .default("funcionario"),
  cpf: Joi.string()
    .pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    .required(),
  fullName: Joi.string()
    .trim()
    .pattern(/^[A-Za-zÀ-ÿ\s]+$/) // Permite letras maiúsculas e minúsculas, com acentos, e espaços
    .min(3) // O nome deve ter pelo menos 3 caracteres (mais de uma palavra)
    .required()
    .messages({
      "string.pattern.base": "O nome só pode conter letras e espaços.",
      "string.min": "O nome deve ter pelo menos 3 caracteres.",
      "string.empty": "O nome não pode estar vazio.",
      "any.required": "O nome é obrigatório.",
    }),
  phoneNumber: Joi.string()
    .pattern(/^\(\d{2}\) \d{4}-\d{4}$/) // Valida o número de telefone no formato (XX) XXXX-XXXX
    .required()
    .messages({
      "string.pattern.base":
        "O número de telefone deve estar no formato (XX) XXXX-XXXX.",
      "any.required": "O número de telefone é obrigatório.",
    }),
  password: Joi.string()
    .required()
    .min(8) // A senha deve ter pelo menos 8 caracteres
    .max(20)
    .pattern(/[0-9]/)
    .pattern(/[A-Za-z]/)
    .messages({
      "string.min": "A senha deve ter pelo menos 8 caracteres.",
      "string.max": "A senha não pode ter mais de 20 caracteres.",
      "string.pattern.base":
        "A senha deve conter pelo menos uma letra e um número.",
      "any.required": "A senha é obrigatória.",
    }),
});

class EmployeeController {
  static async login(req, res) {
    try {
      const { cpf, password } = req.body;

      const employee = await Employee.findOne({ where: { cpf } });

      if (!employee)
        return res.json({ err: true, msg: "funcionario não encontrado!" });

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
      const employees = await Employee.findAll({ raw: true });

      const allEmployees = employees.map((it) => {
        return {
          id: generateToken({ id: it.id }),
          fullName: it.fullName,
          position: it.position,
        };
      });

      res.json({ employees: allEmployees });
    } catch (err) {
      res.status(400).json({ err: "Erro ao localizar funcionarios!" });
    }
  }

  static async register(req, res) {
    const { error, value } = registerSchema.validate(req.body);

    if (error) return res.status(500).json({ msg: error.details[0] });

    try {
      const employee = await Employee.create(value);

      if (!employee)
        return res.status(500).json({ msg: "Erro ao registrar funcionario!" });

      return res
        .status(200)
        .json({ msg: "Funcionario registrado com sucesso!" });
    } catch (err) {
      console.log(err);

      if (err.name !== "SequelizeUniqueConstraintError")
        return res
          .status(500)
          .json({ err: true, msg: "Erro interno do servidor." });

      err.parent.constraint === "Employees_cpf_key"
        ? res.status(500).json({ msg: "CPF ja registrado!" })
        : res.status(500).json({ msg: "Email ja registrado!" });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.body;

      if (!id)
        return res.json({
          err: true,
          msg: "Não foi possivel encontrar funcionario",
        });

      const decodedId = verifyToken(id);

      if (!decodedId.id)
        return res.json({
          err: true,
          msg: "Não foi possivel encontrar funcionario",
        });

      const destroy = await Employee.destroy({
        where: {
          id: decodedId.id,
        },
      });

      if (destroy)
        return res.json({
          err: false,
          msg: "Funcionario deletado com sucesso!",
        });

      res.json({ err: true, msg: "Não foi possivel encontrar funcionario" });
    } catch (err) {
      res.json({ err: true, msg: "Não foi possivel encontrar funcionario" });
    }
  }
}

export default EmployeeController;
