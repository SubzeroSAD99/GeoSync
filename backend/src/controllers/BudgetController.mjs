import Joi from "joi";
import Budget from "../models/Budget.mjs";
import { formatCurrency, parseCurrency } from "../utils/format.mjs";
import { col, Op } from "sequelize";
import db from "../db/db.mjs";
import ServiceOrder from "../models/ServiceOrder.mjs";

const registerSchema = Joi.object({
  //#region ServiceSchema
  serviceType: Joi.array()
    .items(Joi.string().lowercase().trim().required().empty(""))
    .messages({
      "any.required": "Por favor, selecione um tipo de orçamento.",
    }),
  serviceValue: Joi.array()
    .items(
      Joi.string()
        .pattern(/^\s*R\$[\s\u00A0]?\d{1,3}(?:\.\d{3})*,\d{2}\s*$/, "currency")
        .optional()
        .empty("")
        .allow(null)
        .default(null)
    )
    .messages({
      "string.pattern.currency":
        "O valor deve estar no formato monetário correto!",
    }),
  quantity: Joi.array()
    .items(Joi.number().min(1).default(1).empty(["", null]))
    .messages({
      "number.min": "A quantidade deve ser maior ou igual a 1",
      "number.base": "A quantidade deve ser um número válido",
    }),
  municipality: Joi.array()
    .items(Joi.string().lowercase().trim().required().empty([""]))
    .messages({
      "any.required": "Por favor, selecione um municipio!.",
    }),
  locality: Joi.array().items(
    Joi.string()
      .lowercase()
      .trim()
      .optional()
      .empty("")
      .allow(null)
      .default(null)
  ),
  location: Joi.array().items(
    Joi.string().trim().optional().empty("").allow(null).default(null)
  ),
  //#endregion

  //#region OwnershipSchema
  owner: Joi.string().empty("").allow(null).default(null).trim().optional(),
  contractor: Joi.string()
    .trim()
    .allow(null)
    .default(null)
    .empty("")
    .optional(),
  guide: Joi.string().trim().empty("").allow(null).default(null).optional(),
  //#endregion

  //#region FinantialSchema
  discount: Joi.string()
    .empty("")
    .default("0")
    .replace(/,/g, ".")
    .custom((value, helpers) => {
      const num = parseFloat(value);

      if (Number.isNaN(num)) {
        return helpers.error("any.invalid", { value });
      }
      if (num < 0) {
        return helpers.error("number.min", { limit: 0 });
      }
      if (num > 100) {
        return helpers.error("number.max", { limit: 100 });
      }
      // trunca (descarta) para 2 casas decimais
      return Math.floor(num * 100) / 100;
    })
    .messages({
      "discount.invalid": "Desconto inválido",
      "number.min": "Desconto mínimo é {#limit}",
      "number.max": "Desconto máximo é {#limit}",
    }),
  //#endregion

  //#region ExtrasSchema
  internalObs: Joi.string().allow("").max(500).optional(),
  externalObs: Joi.string().allow("").max(500).optional(),
  //#endregion
});

class BudgetController {
  static async register(req, res) {
    const { error, value } = registerSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        field: error.details[0].path[0],
        msg: error.details[0].message,
      });
    }

    value.serviceValue = value.serviceValue.map((it) => parseCurrency(it));

    try {
      value.creator = req.employee?.id;
      const order = await Budget.create(value);

      if (!order)
        return res.status(400).json({ msg: "Erro ao criar orçamento!" });

      return res.status(200).json({ msg: "Orçamento criado com sucesso!" });
    } catch (err) {
      return res.status(500).json({ msg: "Erro interno do servidor." });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.body;

      if (!id)
        return res.json({
          err: true,
          msg: "Não foi possivel encontrar orçamento",
        });

      const destroy = await Budget.destroy({
        where: {
          id,
        },
      });

      if (destroy)
        return res.json({ err: false, msg: "orçamento deletada com sucesso!" });

      res.json({ err: true, msg: "Não foi possivel encontrar orçamento" });
    } catch (err) {
      res.json({ err: true, msg: "Não foi possivel encontrar orçamento" });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.body;

      delete req.body.id;

      const { error, value } = registerSchema.validate(req.body);

      if (error) {
        return res.status(400).json({
          field: error.details[0].path[0],
          msg: error.details[0].message,
        });
      }

      value.serviceValue = value.serviceValue.map((it) => parseCurrency(it));

      const row = await Budget.update(value, {
        where: {
          id,
        },
        omitNull: false,
      });

      if (row) return res.json({ msg: "Orçamento atualizado com sucesso!" });
      res.status(400).json({ msg: "Erro ao atualizar o orçamento!" });
    } catch (err) {
      res.status(400).json({ msg: "Erro interno no servidor!" });
    }
  }

  static async getById(req, res) {
    const { id } = req.body;

    if (isNaN(id))
      return res.status(500).json({ msg: "Orçamento não encontrado!" });

    try {
      const data = await Budget.findByPk(id, {
        attributes: {
          exclude: ["id"],
        },
        raw: true,
      });

      if (!data)
        return res.status(500).json({ msg: "Orçamento não encontrado!" });

      data.serviceValue = data.serviceValue.map((it) => formatCurrency(it));

      res.json({ service: data });
    } catch (err) {
      res.status(400).json({ msg: "Erro interno no servidor!" });
    }
  }

  static async getAll(req, res) {
    try {
      const data = await Budget.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
          include: [[col("OwnerReader.full_name"), "owner"]],
        },
        include: [
          {
            association: "OwnerReader",
            attributes: [],
          },
        ],
        raw: true,
      });

      data.map((obj) => {
        obj.serviceValue = obj.serviceValue.map((it) => formatCurrency(it));
      });

      res.json(data);
    } catch (err) {
      res.status(500).json({ msg: "Erro interno do servidor!" });
    }
  }

  static async convertToOs(req, res) {
    const { id } = req.body;

    try {
      await db.transaction(async (t) => {
        const budget = await Budget.findByPk(id, { transaction: t });
        if (!budget)
          return res.status(500).json({ msg: "Orçamento não encontrado!" });

        const src = budget.get({ plain: true });
        const destAttrs = Object.keys(ServiceOrder.getAttributes());
        const pk = ServiceOrder.primaryKeyAttribute || "id";

        const payload = {};
        for (const k of destAttrs)
          if (k !== pk && k in src) payload[k] = src[k];

        delete payload.createdAt;
        delete payload.updatedAt;

        await ServiceOrder.create(payload, { transaction: t });
        await budget.destroy({ transaction: t });

        res.json({ msg: "Orçamento convertido com sucesso!" });
      });
    } catch (error) {
      res.status(500).json({ msg: "Erro ao converter orçamento!" });
    }
  }
}

export default BudgetController;
