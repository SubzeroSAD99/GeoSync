import Joi from "joi";
import ServiceOrder from "../models/ServiceOrder.mjs";
import { formatDate, formatCurrency } from "../utils/format.mjs";
import { generateToken, verifyToken } from "../utils/Token.mjs";
import { col, Op } from "sequelize";
import WhatsappController from "./WhatsappController.mjs";

const registerSchema = Joi.object({
  cadist: Joi.string().trim().empty("").allow(null).default(null).optional(),
  topographer: Joi.string()
    .empty("")
    .allow(null)
    .default(null)
    .trim()
    .optional(),
  owner: Joi.string().empty("").allow(null).default(null).trim().optional(),
  contractor: Joi.string()
    .trim()
    .allow(null)
    .default(null)
    .empty("")
    .optional(),
  guide: Joi.string().trim().empty("").allow(null).default(null).optional(),
  serviceType: Joi.string()
    .lowercase()
    .trim()
    .required()
    .empty(["", "selecione"])
    .messages({
      "any.required": "Por favor, selecione um tipo de serviço.",
    }),
  priority: Joi.string()
    .lowercase()
    .valid("baixa", "normal", "alta")
    .empty("")
    .default("normal"),
  status: Joi.string()
    .lowercase()
    .valid("aberta", "fechada")
    .empty("")
    .default("aberta"),
  step: Joi.string().lowercase().trim().empty("").default("agendado"),
  pending: Joi.string().lowercase().allow(null).default(null).empty(""),
  quantity: Joi.number().min(1).default(1).empty(["", null]).messages({
    "number.min": "A quantidade deve ser maior ou igual a 1",
    "number.base": "A quantidade deve ser um número válido",
  }),
  municipality: Joi.string()
    .lowercase()
    .trim()
    .required()
    .empty(["", "selecione"])
    .messages({
      "any.required": "Por favor, selecione um municipio!.",
    }),
  locality: Joi.string()
    .lowercase()
    .trim()
    .optional()
    .empty("")
    .allow(null)
    .default(null),
  location: Joi.string().trim().optional().empty("").allow(null).default(null),

  serviceValue: Joi.string()
    .pattern(/^\s*R\$[\s\u00A0]?\d{1,3}(?:\.\d{3})*,\d{2}\s*$/, "currency")
    .optional()
    .empty("")
    .allow(null)
    .default(null)
    .messages({
      "string.pattern.currency":
        "O valor deve estar no formato monetário correto!",
    }),
  amountPaid: Joi.string()
    .pattern(/^\s*R\$[\s\u00A0]?\d{1,3}(?:\.\d{3})*,\d{2}\s*$/, "currency")
    .optional()
    .empty("")
    .allow(null)
    .default(null)
    .messages({
      "string.pattern.currency":
        "O valor deve estar no formato monetário correto!",
    }),
  paymentSituation: Joi.string()
    .lowercase()
    .valid("não pago", "pago", "parcialmente pago", "isento")
    .empty("")
    .default("não pago"),
  measurementDate: Joi.string()
    .pattern(/^\d{2}\/\d{2}\/\d{4}$/)
    .trim()
    .empty("")
    .default(null)
    .optional()
    .allow(null),
  measurementHour: Joi.string()
    .pattern(/^(?:[01]?[0-9]|2[0-3]):([0-5]?[0-9])$/)
    .trim()
    .empty("")
    .optional()
    .default(null)
    .allow(null),
  schedulingResp: Joi.string()
    .trim()
    .empty("")
    .allow(null)
    .default(null)
    .optional(),
  processingResp: Joi.string()
    .trim()
    .empty("")
    .allow(null)
    .default(null)
    .optional(),
  payer: Joi.string()
    .lowercase()
    .trim()
    .optional()
    .empty("")
    .allow(null)
    .default(null),
  internalObs: Joi.string().allow("").max(500).optional(),
  externalObs: Joi.string().allow("").max(500).optional(),
  confirmed: Joi.bool().default(false),
});

class ServiceOrderController {
  static async register(req, res) {
    const { error, value } = registerSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        field: error.details[0].path[0],
        msg: error.details[0].message,
      });
    }

    value.cadist = verifyToken(value.cadist)?.id ?? null;
    value.schedulingResp = verifyToken(value.schedulingResp)?.id ?? null;
    value.processingResp = verifyToken(value.processingResp)?.id ?? null;

    value.topographer = verifyToken(value.topographer)?.id ?? null;

    value.serviceValue = ServiceOrderController.parseCurrency(
      value.serviceValue
    );
    value.amountPaid = ServiceOrderController.parseCurrency(value.amountPaid);

    value.measurementDate = value?.measurementDate?.replace(
      /(\d{2})\/(\d{2})\/(\d{4})/,
      "$3-$2-$1"
    );

    try {
      const order = await ServiceOrder.create(value);

      if (!order)
        return res.status(400).json({ msg: "Erro ao criar serviço!" });

      return res.status(200).json({ msg: "Ordem de serviço criada!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Erro interno do servidor." });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.body;

      if (!id)
        return res.json({ err: true, msg: "Não foi possivel encontrar OS" });

      const destroy = await ServiceOrder.destroy({
        where: {
          id,
        },
      });

      if (destroy)
        return res.json({ err: false, msg: "OS deletada com sucesso!" });

      res.json({ err: true, msg: "Não foi possivel encontrar OS" });
    } catch (err) {
      res.json({ err: true, msg: "Não foi possivel encontrar OS" });
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

      delete value.confirmed;

      value.cadist = verifyToken(value.cadist)?.id ?? null;
      value.schedulingResp = verifyToken(value.schedulingResp)?.id ?? null;
      value.processingResp = verifyToken(value.processingResp)?.id ?? null;

      value.serviceValue = ServiceOrderController.parseCurrency(
        value.serviceValue
      );

      value.amountPaid = ServiceOrderController.parseCurrency(value.amountPaid);

      value.topographer = verifyToken(value.topographer)?.id ?? null;
      value.measurementDate =
        value?.measurementDate?.replace(
          /(\d{2})\/(\d{2})\/(\d{4})/,
          "$3-$2-$1"
        ) ?? null;

      const row = await ServiceOrder.update(value, {
        where: {
          id,
        },
        omitNull: false,
      });

      if (row) return res.json({ msg: "Serviço atualizado com sucesso!" });
      res.status(400).json({ msg: "Erro ao atualizar o serviço!" });
    } catch (err) {
      res.status(400).json({ msg: "Erro interno no servidor!" });
    }
  }

  static async getById(req, res) {
    const { id } = req.body;

    if (isNaN(id))
      return res.status(500).json({ msg: "Serviço não encontrado!" });

    try {
      const data = await ServiceOrder.findByPk(id, {
        attributes: {
          exclude: ["confirmed", "id"],
        },
        raw: true,
      });

      if (!data)
        return res.status(500).json({ msg: "Serviço não encontrado!" });

      data.measurementDate = data?.measurementDate?.replace(
        /(\d){4}-(\d){2}-(\d){2}/,
        "$3/$2/$1"
      );

      data.measurementHour = data?.measurementHour?.slice(0, -3);

      data.cadist = generateToken({ id: data.cadist });
      data.schedulingResp = generateToken({ id: data.schedulingResp });
      data.processingResp = generateToken({ id: data.processingResp });

      data.topographer = generateToken({ id: data.topographer });

      if (!data) res.status(400).json({ msg: "Serviço não encontrado!" });

      res.json({ service: data });
    } catch (err) {
      console.log(err);

      res.status(400).json({ msg: "Erro interno no servidor!" });
    }
  }

  static async getAll(req, res) {
    try {
      const data = await ServiceOrder.findAll({
        attributes: {
          exclude: ["cadist", "topographer", "updatedAt"],
          include: [
            [col("CadistReader.full_name"), "cadist"],
            [col("OwnerReader.full_name"), "owner"],
          ],
        },
        include: [
          {
            association: "CadistReader",
            // esvaziar os atributos aqui, senão eles voltam duplicados
            attributes: [],
          },
          {
            association: "OwnerReader",
            attributes: [],
          },
        ],
        raw: true,
      });

      data.map((obj) => {
        obj.serviceValue = formatCurrency(obj.serviceValue);

        obj.amountPaid = formatCurrency(obj.amountPaid);
      });

      res.json(data);
    } catch (err) {
      console.log(err);

      res.status(500).json({ msg: "Erro interno do servidor!" });
    }
  }

  static async getAllOpen(req, res) {
    try {
      const data = await ServiceOrder.findAll({
        where: {
          status: "aberta",
        },
        attributes: {
          exclude: ["cadist", "topographer", "updatedAt"],
          include: [
            [col("CadistReader.full_name"), "cadist"],
            [col("OwnerReader.full_name"), "owner"],
          ],
        },
        include: [
          {
            association: "CadistReader",
            // esvaziar os atributos aqui, senão eles voltam duplicados
            attributes: [],
          },
          {
            association: "OwnerReader",
            attributes: [],
          },
        ],
        raw: true,
      });

      data.map((obj) => {
        obj.createdAt = formatDate(obj.createdAt).split(",")[0];
      });

      console.log(data);

      res.json(data);
    } catch (err) {
      res.status(500).json({ msg: "Erro interno do servidor!" });
    }
  }

  static async getAllClosed(req, res) {
    try {
      const data = await ServiceOrder.findAll({
        where: {
          status: "fechada",
        },
        attributes: {
          exclude: ["cadist", "topographer", "updatedAt"],
          include: [
            [col("CadistReader.full_name"), "cadist"],
            [col("OwnerReader.full_name"), "owner"],
          ],
        },
        include: [
          {
            association: "CadistReader",
            // esvaziar os atributos aqui, senão eles voltam duplicados
            attributes: [],
          },
          {
            association: "OwnerReader",
            attributes: [],
          },
        ],
        raw: true,
      });

      data.map((obj) => {
        obj.createdAt = formatDate(obj.createdAt).split(",")[0];
      });

      res.json(data);
    } catch (err) {
      console.log(err);
    }
  }

  static async getAllOpenByMonth(req, res) {
    const { month, year, topographer } = req.body;

    try {
      const mm = String(month).padStart(2, "0");
      const start = `${year}-${mm}-01`;

      // se for dezembro (12), seta proxima ano e coloca mes 1
      const nextYear = month === 12 ? year + 1 : year;
      const nextMonth = month === 12 ? 1 : month + 1;
      const mm2 = String(nextMonth).padStart(2, "0");
      const end = `${nextYear}-${mm2}-01`;

      const services = await ServiceOrder.findAll({
        attributes: {
          include: [
            "id",
            "serviceType",
            "municipality",
            "locality",
            "measurementHour",
            "measurementDate",
            "internalObs",
            "location",
            "confirmed",
            [col("OwnerReader.full_name"), "owner"],
            [col("ContractorReader.full_name"), "contractor"],
            [col("GuideReader.full_name"), "guide"],
          ],
        },
        include: [
          {
            association: "OwnerReader",
            attributes: [],
          },
          {
            association: "ContractorReader",
            attributes: [],
          },
          {
            association: "GuideReader",
            attributes: [],
          },
        ],
        where: {
          measurementDate: {
            [Op.gte]: start, // >= YYYY-MM-01
            [Op.lt]: end, // < YYYY-MM+1-01
          },
          status: "aberta",
          topographer: verifyToken(topographer)?.id,
        },

        order: [["measurementDate", "ASC"]],
        raw: true,
      });

      const formattedServices = services.map(
        ({
          id,
          serviceType,
          owner,
          contractor,
          guide,
          municipality,
          locality,
          ownerNumber,
          measurementHour,
          measurementDate,
          internalObs,
          location,
          confirmed,
        }) => {
          return {
            id: generateToken({ id }),
            serviceType,
            owner,
            contractor,
            guide,
            municipality,
            locality,
            ownerNumber,
            measurementHour: measurementHour?.slice(0, -3),
            measurementDate,
            internalObs,
            location,
            confirmed,
          };
        }
      );

      res.json({ services: formattedServices });
    } catch (err) {
      res.status(500).json({ msg: "Erro ao acessar agendamento!" });
    }
  }

  static async getStep(req, res) {
    try {
      const { id } = req.body;

      if (isNaN(id))
        return res.status(500).json({ msg: "Serviço não encontrado!" });

      const data = await ServiceOrder.findByPk(id, {
        attributes: ["step", [col("OwnerReader.full_name"), "owner"]],

        include: [
          {
            association: "OwnerReader",
            attributes: [],
          },
        ],
        raw: true,
      });

      if (!data) res.status(400).json({ msg: "Serviço não encontrado!" });

      res.json({ service: data });
    } catch (err) {
      res.status(400).json({ msg: "Erro interno no servidor!" });
    }
  }

  static async confirm(req, res) {
    try {
      const { id } = req.body;

      const decoded = verifyToken(id);

      const order = await ServiceOrder.findOne({
        where: { id: decoded.id },
        attributes: [
          "id",
          "cadist",
          "topographer",
          "owner",
          "contractor",
          "guide",
          "confirmed",
        ],
        include: [
          {
            association: "TopographerReader",
            attributes: ["phoneNumber"],
          },

          {
            association: "CadistReader",
            attributes: ["phoneNumber"],
          },

          {
            association: "OwnerReader",
            attributes: ["phoneNumber"],
          },
          {
            association: "ContractorReader",
            attributes: ["phoneNumber"],
          },
          {
            association: "GuideReader",
            attributes: ["phoneNumber"],
          },
        ],
      });

      if (!order) {
        return res.status(404).json({ msg: "Serviço não encontrado!" });
      }

      order.confirmed = true;
      await order.save();

      const topographerPhone = order.TopographerReader?.phoneNumber;
      const cadistPhone = order.CadistReader?.phoneNumber;
      const ownerPhone = order.OwnerReader?.phoneNumber;
      const contractorPhone = order.ContractorReader?.phoneNumber;
      const guidePhone = order.GuideReader?.phoneNumber;

      try {
        if (topographerPhone)
          await WhatsappController.sendMessage(
            topographerPhone,
            "Serviço agendado!"
          );

        if (cadistPhone)
          await WhatsappController.sendMessage(
            cadistPhone,
            "Serviço agendado!"
          );

        if (ownerPhone)
          await WhatsappController.sendMessage(ownerPhone, "Serviço agendado!");

        if (contractorPhone)
          await WhatsappController.sendMessage(
            contractorPhone,
            "Serviço agendado!"
          );

        if (guidePhone)
          await WhatsappController.sendMessage(guidePhone, "Serviço agendado!");
      } catch (err) {
        return res.json({ warn: true, msg: "Erro ao enviar mensagens!" });
      }
      return res.json({ msg: "Serviço confirmado com sucesso!" });
    } catch (err) {
      console.log(err);

      res.status(500).json({ msg: "Erro ao confirmar serviço!" });
    }
  }

  static parseCurrency(value) {
    const cleaned = value
      ?.replace(/[^0-9\-,]+/g, "")
      .replace(/\./g, "")
      .replace(",", ".");
    const num = Number.parseFloat(cleaned);
    if (Number.isNaN(num)) return null;

    return String(num).length > 13 ? null : num;
  }

  static prepareDataToFront(input) {
    const services = input.services.map((service) => ({
      ...service,
      total: service.quantity * service.unitPrice,
      totalFormatted: formatCurrency(service.quantity * service.unitPrice),
      unitPriceFormatted: formatCurrency(service.unitPrice),
    }));

    const subTotalOS = services.reduce(
      (sum, service) => sum + service.total,
      0
    );
    const discountValue = (input.discount / 100) * subTotalOS;
    const totalOS = subTotalOS - discountValue;

    return {
      ...input,
      services,
      subTotalOS: formatCurrency(subTotalOS),
      totalOS: formatCurrency(totalOS),
      dateNow: new Date().toLocaleDateString("pt-BR"),
    };
  }
}

export default ServiceOrderController;
