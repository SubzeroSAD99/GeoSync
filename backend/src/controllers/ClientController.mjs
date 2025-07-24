import Client from "../models/Client.mjs";
import formatPhone from "../utils/formatPhone.mjs";
import { generateToken, verifyToken } from "../utils/Token.mjs";
import Joi from "joi";

const schema = Joi.object({
  personType: Joi.string()
    .valid("natural", "legal")
    .default("natural")
    .messages({
      "any.only": "O tipo de pessoa deve ser 'Fisica' ou 'Juridica'.",
    }),

  cpfCnpj: Joi.string().when("personType", {
    is: "natural",
    then: Joi.string()
      .trim()
      .pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
      .empty("")
      .messages({
        "string.pattern.base": "O CPF deve estar no formato 000.000.000-00.",
      }),
    otherwise: Joi.string()
      .trim()
      .empty("")
      .pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)
      .messages({
        "string.pattern.base":
          "O CNPJ deve estar no formato 00.000.000/0000-00.",
      }),
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

  city: Joi.string().lowercase().optional().empty(""),
  neighborhood: Joi.string().lowercase().optional().empty(""),
  road: Joi.string().lowercase().optional().empty(""),
  complement: Joi.string().lowercase().optional().empty(""),
  number: Joi.number()
    .optional()
    .empty("")
    .custom((value, _helpers) => {
      // Se o valor for 0, retorna null
      if (value === 0) {
        return null;
      }
      return value;
    }),
  cep: Joi.string()
    .optional()
    .empty("")
    .pattern(/^\d{5}-\d{3}$/)
    .messages({
      "string.pattern.base": "O CEP deve estar no formato 00000-000",
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
          id: it.id,
          fullName: it.fullName,
          phoneNumber: formatPhone(it.phoneNumber),
        };
      });

      res.json({ clients: formattedClients });
    } catch (err) {
      res.status(500).json({ msg: "Erro ao localizar clientes!" });
    }
  }

  static async getById(req, res) {
    const { id } = req.body;

    try {
      const clients = await Client.findOne({
        raw: true,
        where: { id },
        attributes: {
          exclude: ["id", "createdAt", "updateAt"],
        },
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

    value.cpfCnpj = value.cpfCnpj?.replace(/[.-\s\/]/g, "");
    value.phoneNumber = value.phoneNumber?.replace(/[\(\)-\s+]/g, "");

    try {
      const clients = await Client.create({ ...value });

      if (!clients)
        return res.status(500).json({ msg: "Erro ao registrar cliente!" });

      return res.status(200).json({ msg: "Cliente registrado com sucesso!" });
    } catch (err) {
      console.log(err);

      if (err.name !== "SequelizeUniqueConstraintError")
        return res.status(500).json({ msg: "Erro interno do servidor." });

      err.parent.constraint === "Clients_cpfCnpj_key"
        ? res.status(500).json({ msg: "Cliente ja registrado!" })
        : err.parent.constraint === "Clients_phoneNumber_key" &&
          res.status(500).json({ msg: "Numero de telefone ja registrado!" });
    }
  }

  static async update(req, res) {
    const { id } = req.body;

    delete req.body.id;

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(500).json({ msg: error.details[0].message });
    }

    try {
      const clients = await Client.update(value, {
        where: { id },
      });

      if (!clients)
        return res.status(500).json({ msg: "Cliente não encontrado!" });

      return res
        .status(200)
        .json({ msg: "Informações alteradas com sucesso!" });
    } catch (err) {
      if (err.name !== "SequelizeUniqueConstraintError")
        return res.status(500).json({ msg: "Erro interno do servidor." });

      err.parent.constraint === "Clients_cpfCnpj_key"
        ? res.status(500).json({ msg: "Cliente ja registrado!" })
        : err.parent.constraint === "Clients_phoneNumber_key" &&
          res.status(500).json({ msg: "Numero de telefone ja registrado!" });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.body;

      if (!id)
        return res.status(500).json({
          msg: "Não foi possivel encontrar cliente",
        });

      const destroy = await Client.destroy({
        where: {
          id,
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
