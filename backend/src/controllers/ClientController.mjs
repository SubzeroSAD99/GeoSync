import Client from "../models/Client.mjs";
import formatPhone from "../utils/formatPhone.mjs";
import { generateToken, verifyToken } from "../utils/Token.mjs";
import Joi from "joi";

const schema = Joi.object({
  cpf: Joi.string()
    .pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    .required()
    .messages({
      "string.empty": "O CPF é obrigatorio!",
      "string.pattern.base": "O cpf deve estar no formato 000.000.000-00.",
    }),
  fullName: Joi.string()
    .trim()
    .pattern(/^[A-Za-zÀ-ÿ\s]+$/)
    .min(3)
    .lowercase()
    .required()
    .messages({
      "string.pattern.base": "O nome só pode conter letras e espaços.",
      "string.min": "O nome deve ter pelo menos 3 caracteres.",
      "string.empty": "O nome não pode estar vazio.",
      "any.required": "O nome é obrigatório.",
    }),
  phoneNumber: Joi.string()
    .empty("")
    .pattern(
      /^(?:\+\d{2} \(\d{2}\) \d{4}-\d{4}|\+\d \(\d{3}\) \d{3}-\d{4})|\+\d{2} \d{3} \d{3} \d{3}|\+\d{2} \d{4} \d{6}$/
    )
    .messages({
      "string.pattern.base": "O número de telefone não esta no formato correto",
      "any.required": "O número de telefone é obrigatório.",
    }),
});

class ClientController {
  static async getAll(req, res) {
    try {
      const clients = await Client.findAll({
        attributes: ["id", "fullName", "phoneNumber"],
        raw: true,
      });

      const formattedClients = clients.map((it) => {
        return {
          id: generateToken({ id: it.id }),
          fullName: it.fullName,
          phoneNumber: formatPhone(it.phoneNumber),
        };
      });

      res.json({ clients: formattedClients });
    } catch (err) {
      console.log(err);

      res.status(500).json({ msg: "Erro ao localizar clientes!" });
    }
  }

  static async getById(req, res) {
    const { id } = req.body;

    try {
      const decoded = verifyToken(id);

      if (!decoded)
        return res.status(500).json({ msg: "Cliente não encontrado!" });

      const clients = await Client.findOne({
        raw: true,
        where: { id: decoded.id },
        attributes: ["fullName", "cpf", "phoneNumber"],
      });

      if (!clients)
        return res.status(500).json({ msg: "Cliente não encontrado!" });

      res.status(200).json({ ...clients });
    } catch (error) {
      res.status(500).json({ msg: "Erro interno no servidor" });
    }
  }

  static async register(req, res) {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        field: error.details[0].path[0],
        msg: error.details[0].message,
      });
    }

    value.cpf = value.cpf.replace(/[.-\s]/g, "");
    value.phoneNumber = value.phoneNumber?.replace(/[\(\)-\s]/g, "");

    try {
      const clients = await Client.create({ ...value });

      if (!clients)
        return res.status(500).json({ msg: "Erro ao registrar cliente!" });

      return res.status(200).json({ msg: "Cliente registrado com sucesso!" });
    } catch (err) {
      if (err.name !== "SequelizeUniqueConstraintError")
        return res.status(500).json({ msg: "Erro interno do servidor." });

      err.parent.constraint === "Clients_cpf_key" &&
        res.status(500).json({ msg: "Cliente ja registrado!" });
    }
  }

  static async update(req, res) {
    let { id } = req.body;

    delete req.body.id;

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(500).json({ msg: error.details[0].message });
    }

    try {
      const decoded = verifyToken(id);

      if (!decoded) res.status(500).json({ msg: "Cliente não encontrado!" });

      const clients = await Client.update(value, {
        where: { id: decoded.id },
      });

      if (!clients)
        return res.status(500).json({ msg: "Cliente não encontrado!" });

      return res
        .status(200)
        .json({ msg: "Informações alteradas com sucesso!" });
    } catch (err) {
      if (err.name !== "SequelizeUniqueConstraintError")
        return res.status(500).json({ msg: "Erro interno do servidor." });

      err.parent.constraint === "Clients_cpf_key" &&
        res.status(500).json({ msg: "Cliente ja registrado!" });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.body;

      if (!id)
        return res.status(500).json({
          msg: "Não foi possivel encontrar cliente",
        });

      const decodedId = verifyToken(id);

      if (!decodedId.id)
        return res.status(500).json({
          msg: "Não foi possivel encontrar cliente",
        });

      const destroy = await Client.destroy({
        where: {
          id: decodedId.id,
        },
      });

      if (destroy)
        return res.json({
          msg: "Cliente deletado com sucesso!",
        });

      res.status(500).json({ msg: "Não foi possivel encontrar cliente" });
    } catch (err) {
      res.status(500).json({ msg: "Não foi possivel encontrar cliente" });
    }
  }
}

export default ClientController;
