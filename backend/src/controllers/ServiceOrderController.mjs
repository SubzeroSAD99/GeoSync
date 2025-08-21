import Joi from "joi";
import ServiceOrder from "../models/ServiceOrder.mjs";
import { formatDate, formatCurrency, parseCurrency } from "../utils/format.mjs";
import { generateToken, verifyToken } from "../utils/Token.mjs";
import { col, Op } from "sequelize";
import WhatsappController from "./WhatsappController.mjs";

const registerSchema = Joi.object({
  //#region ServiceSchema
  code: Joi.array().items(
    Joi.string().trim().empty("").allow(null).default(null)
  ),
  serviceType: Joi.array()
    .items(Joi.string().lowercase().trim().required().empty(""))
    .messages({
      "any.required": "Por favor, selecione um tipo de serviço.",
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
  step: Joi.array().items(
    Joi.string().lowercase().trim().empty("").default("agendado")
  ),
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

  //#region PriorityPendingSchema
  priority: Joi.string()
    .lowercase()
    .valid("baixa", "normal", "alta")
    .empty("")
    .default("normal"),

  pending: Joi.string().lowercase().allow(null).default(null).empty(""),
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

  //#region MeasurementSchema
  topographer: Joi.string()
    .empty("")
    .allow(null)
    .default(null)
    .trim()
    .optional(),
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
  //#endregion

  //#region ResponsibilitiesSchema
  cadist: Joi.string().trim().empty("").allow(null).default(null).optional(),
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

  paymentSituation: Joi.string()
    .lowercase()
    .valid("não pago", "pago", "parcialmente pago", "isento")
    .empty("")
    .default("não pago"),
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
  payer: Joi.string()
    .lowercase()
    .trim()
    .optional()
    .empty("")
    .allow(null)
    .default(null),
  //#endregion

  //#region ExtrasSchema
  internalObs: Joi.string().allow("").max(500).optional(),
  externalObs: Joi.string().allow("").max(500).optional(),
  finished: Joi.bool().truthy("on").falsy("off").default(false),
  confirmed: Joi.bool().default(false),
  //#endregion
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

    value.serviceValue = value.serviceValue.map((it) =>
      ServiceOrderController.parseCurrency(it)
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
      return res.status(500).json({ msg: "Erro interno do servidor." });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.body;

      if (!id)
        return res.json({
          err: true,
          msg: "Não foi possivel encontrar serviço",
        });

      const destroy = await ServiceOrder.destroy({
        where: {
          id,
        },
      });

      if (destroy)
        return res.json({ err: false, msg: "Serviço deletado com sucesso!" });

      res.json({ err: true, msg: "Não foi possivel encontrar serviço" });
    } catch (err) {
      res.json({ err: true, msg: "Não foi possivel encontrar serviço" });
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

      value.serviceValue = value.serviceValue.map((it) =>
        ServiceOrderController.parseCurrency(it)
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

      data.serviceValue = data.serviceValue.map((it) => formatCurrency(it));
      data.amountPaid = formatCurrency(data.amountPaid);

      if (!data) res.status(400).json({ msg: "Serviço não encontrado!" });

      res.json({ service: data });
    } catch (err) {
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
        obj.serviceValue = obj.serviceValue.map((it) => formatCurrency(it));

        obj.amountPaid = formatCurrency(obj.amountPaid);
      });

      res.json(data);
    } catch (err) {
      res.status(500).json({ msg: "Erro interno do servidor!" });
    }
  }

  static async getAllOpen(req, res) {
    try {
      const data = await ServiceOrder.findAll({
        where: {
          finished: false,
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
      res.status(500).json({ msg: "Erro interno do servidor!" });
    }
  }

  static async getAllClosed(req, res) {
    try {
      const data = await ServiceOrder.findAll({
        where: {
          finished: true,
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
      res.status(500).json({ msg: "Erro interno no servidor" });
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
          finished: false,
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
        attributes: [
          "step",
          "serviceType",
          [col("OwnerReader.full_name"), "owner"],
        ],

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
