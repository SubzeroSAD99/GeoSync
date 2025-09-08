import permissions from "../access/permissions.mjs";
import Employee from "../models/Employee.mjs";
import { generateToken, verifyToken } from "../utils/Token.mjs";
import { registerSchema, updateSchema } from "../utils/employeeSchema.mjs";
import argon2 from "argon2";

class EmployeeController {
  static async login(req, res) {
    try {
      const { cpf, password } = req.body;

      let cpfFormatted = cpf.replace(/[.-]/g, "");

      const employee = await Employee.findOne({ where: { cpf: cpfFormatted } });

      if (!employee)
        return res.status(500).json({ msg: "Funcionario não encontrado!" });

      const dbPass = employee.getDataValue("password");

      const ok = await argon2.verify(dbPass, password);

      if (!ok)
        return res.status(500).json({ msg: "CPF e/ou senha incorretos!" });

      const payload = {
        id: employee.id,
        fullName: employee.fullName,
        cpf: employee.cpf,
        role: employee.role,
      };

      const token = generateToken(payload);

      res
        .cookie("authToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // só em HTTPS
          sameSite: "Strict", // contra CSRF
          maxAge: 60 * 60 * 1000, // 1h em ms
        })
        .json({
          employee: {
            name: employee.fullName,
            role: employee.role.toUpperCase(),
          },
          permissions,
        });
    } catch (err) {
      res.status(500).json({ err: "Erro interno do servidor!" });
    }
  }

  static async logout(req, res) {
    try {
      res.clearCookie("authToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });
      return res.status(200).json({ msg: "Logout realizado com sucesso!" });
    } catch (err) {
      return res.status(500).json({ err: "Erro interno ao fazer logout." });
    }
  }

  static async getAll(req, res) {
    try {
      const employees = await Employee.findAll({
        attributes: ["id", "fullName", "role"],
        raw: true,
      });

      res.json({ employees });
    } catch (err) {
      res.status(500).json({ err: "Erro ao localizar cadistas!" });
    }
  }

  static async getAllTopographers(req, res) {
    try {
      const topographers = await Employee.findAll({
        attributes: ["id", "fullName"],
        where: {
          role: "topografo",
        },
        raw: true,
      });

      res.json({ topographers });
    } catch (err) {
      res.status(500).json({ msg: "Erro interno no servidor!" });
    }
  }

  static async getById(req, res) {
    const { id } = req.body;

    try {
      const employee = await Employee.findOne({
        attributes: {
          exclude: ["id", "password", "createdAt", "updatedAt"],
        },
        raw: true,
        where: { id },
      });

      if (!employee)
        return res.status(500).json({ msg: "Funcionario não encontrado!" });

      res.status(200).json({ ...employee });
    } catch (error) {
      res.status(500).json({ msg: "Erro interno no servidor" });
    }
  }

  static async getByCPF(cpf) {
    return new Promise(async (resolve) => {
      try {
        const cpfFormatted = cpf.replace(/[.-]/g, "");

        const employee = await Employee.findOne({
          raw: true,
          where: { cpf: cpfFormatted },
          attributes: ["id", "fullName", "cpf", "role", "phoneNumber"],
        });

        if (!employee) resolve(false);

        resolve(employee);
      } catch (error) {
        resolve(false);
      }
    });
  }

  static async register(req, res) {
    const { error, value } = registerSchema.validate(req.body);

    if (error) return res.status(500).json({ msg: error.details[0].message });

    value.cpf = value.cpf.replace(/[.-\s]/g, "");
    value.phoneNumber = value.phoneNumber?.replace(/[\(\)-\s\+]/g, "");

    try {
      const employee = await Employee.create(value);

      if (!employee)
        return res.status(500).json({ msg: "Erro ao registrar cadista!" });

      return res
        .status(200)
        .json({ msg: "Funcionario registrado com sucesso!" });
    } catch (err) {
      if (err.name !== "SequelizeUniqueConstraintError")
        return res.status(500).json({ msg: "Erro interno do servidor." });

      err.parent.constraint === "employees_cpf_key" &&
        res.status(500).json({ msg: "CPF ja registrado!" });
    }
  }

  static async update(req, res) {
    let { id, password } = req.body;

    delete req.body.id;

    if (!password) delete req.body.password;

    const { error, value } = updateSchema.validate(req.body);

    if (error) {
      return res.status(500).json({ msg: error.details[0].message });
    }

    value.cpf = value.cpf.replace(/[().-\s]/g, "");
    value.phoneNumber = value.phoneNumber?.replace(/[().-\s\+]/g, "");

    if (error) return res.status(500).json({ msg: error.details[0] });

    try {
      const employee = await Employee.update(value, {
        where: { id },
      });

      if (!employee)
        return res.status(500).json({ msg: "Funcionario não encontrado!" });

      return res
        .status(200)
        .json({ msg: "Informações alteradas com sucesso!" });
    } catch (err) {
      if (err.name !== "SequelizeUniqueConstraintError")
        return res.status(500).json({ msg: "Erro interno do servidor." });

      if (err.parent.constraint === "employees_cpf_key")
        res.status(500).json({ msg: "CPF ja registrado!" });
      else res.status(500).json({ msg: "Telefone ja registrado!" });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.body;

      if (!id)
        return res.status(500).json({
          msg: "Não foi possivel encontrar funcionario",
        });

      const decodedId = verifyToken(id);

      if (!decodedId.id)
        return res.status(500).json({
          msg: "Não foi possivel encontrar funcionario",
        });

      const destroy = await Employee.destroy({
        where: {
          id: decodedId.id,
        },
      });

      if (destroy)
        return res.json({
          msg: "Funcionario deletado com sucesso!",
        });

      res.status(500).json({ msg: "Não foi possivel encontrar funcionario" });
    } catch (err) {
      res.status(500).json({ msg: "Não foi possivel encontrar funcionario" });
    }
  }
}

export default EmployeeController;
