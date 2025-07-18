import handlebars from "handlebars";
import puppeteer from "puppeteer";
import fs from "fs";
import Joi from "joi";
import ServiceOrder from "../models/ServiceOrder.mjs";
import formatDate from "../utils/formatDate.mjs";
import { generateToken, verifyToken } from "../utils/Token.mjs";
import { col, Op } from "sequelize";
import WhatsappController from "./WhatsappController.mjs";

const registerSchema = Joi.object({
  cadist: Joi.string().trim().empty(["", "selecione", "SELECIONE"]).optional(),
  topographer: Joi.string()
    .trim()
    .empty(["", "selecione", "SELECIONE"])
    .optional(),
  owner: Joi.string().trim().empty(["", "selecione", "SELECIONE"]).optional(),
  contractor: Joi.string()
    .trim()
    .empty(["", "selecione", "SELECIONE"])
    .optional(),
  guide: Joi.string().trim().empty(["", "selecione", "SELECIONE"]).optional(),
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
    .empty([""])
    .default("normal"),
  status: Joi.string()
    .lowercase()
    .valid("aberta", "fechada")
    .empty([""])
    .default("aberta"),
  step: Joi.string().lowercase().trim().empty([""]).default("agendado"),
  pending: Joi.string().lowercase().allow("").empty("selecione"),
  municipality: Joi.string()
    .lowercase()
    .trim()
    .required()
    .empty(["", "selecione"])
    .messages({
      "any.required": "Por favor, selecione um municipio!.",
    }),
  serviceValue: Joi.string()
    .pattern(/^\s*R\$[\s\u00A0]?\d{1,3}(?:\.\d{3})*,\d{2}\s*$/, "currency")
    .optional()
    .empty([""])
    .allow(null)
    .default(null)
    .messages({
      "string.pattern.currency":
        "O valor deve estar no formato monetário correto!",
    }),
  paymentSituation: Joi.string()
    .lowercase()
    .valid("não pago", "pago", "parcialmente pago", "isento")
    .empty([""])
    .default("não pago"),
  measurementDate: Joi.string()
    .pattern(/^\d{2}\/\d{2}\/\d{4}$/)
    .trim()
    .empty("")
    .default(null)
    .optional()
    .allow(null),
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

    value.owner = verifyToken(value.owner)?.id ?? null;
    value.contractor = verifyToken(value.contractor)?.id ?? null;
    value.guide = verifyToken(value.guide)?.id ?? null;
    value.cadist = verifyToken(value.cadist)?.id ?? null;
    value.topographer = verifyToken(value.topographer)?.id ?? null;

    value.serviceValue = ServiceOrderController.parseCurrency(
      value.serviceValue
    );

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

      const decodedId = verifyToken(id);

      if (!decodedId.id)
        return res.json({ err: true, msg: "Não foi possivel encontrar OS" });

      const destroy = await ServiceOrder.destroy({
        where: {
          id: decodedId.id,
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

      value.owner = verifyToken(value.owner)?.id ?? null;
      value.contractor = verifyToken(value.contractor)?.id ?? null;
      value.guide = verifyToken(value.guide)?.id ?? null;
      value.cadist = verifyToken(value.cadist)?.id ?? null;
      value.topographer = verifyToken(value.topographer)?.id ?? null;

      value.serviceValue = ServiceOrderController.parseCurrency(
        value.serviceValue
      );

      value.measurementDate = value?.measurementDate?.replace(
        /(\d{2})\/(\d{2})\/(\d{4})/,
        "$3-$2-$1"
      );

      const decoded = verifyToken(id);

      const row = await ServiceOrder.update(value, {
        where: {
          id,
        },
      });

      if (row) return res.json({ msg: "Serviço atualizado com sucesso!" });
      res.status(400).json({ msg: "Erro ao atualizar o serviço!" });
    } catch (err) {
      console.log(err);

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

      data.measurementDate = data?.measurementDate?.replace(
        /(\d){4}-(\d){2}-(\d){2}/,
        "$3/$2/$1"
      );

      data.cadist = generateToken({ id: data.cadist });
      data.topographer = generateToken({ id: data.topographer });
      data.owner = generateToken({ id: data.owner });

      if (!data) res.status(400).json({ msg: "Serviço não encontrado!" });

      res.json({ service: data });
    } catch (err) {
      console.log(err);

      res.status(400).json({ msg: "Erro interno no servidor!" });
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
            [col("CadistReader.fullName"), "cadist"],
            [col("OwnerReader.fullName"), "owner"],
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
          status: "fechada",
        },
        attributes: {
          exclude: ["cadist", "topographer", "updatedAt"],
          include: [
            [col("CadistReader.fullName"), "cadist"],
            [col("OwnerReader.fullName"), "owner"],
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
            "confirmed",
            [col("OwnerReader.fullName"), "owner"],
            [col("ContractorReader.fullName"), "contractor"],
            [col("GuideReader.fullName"), "guide"],
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
            measurementHour,
            measurementDate,
            internalObs,
            confirmed,
          };
        }
      );

      res.json({ services: formattedServices });
    } catch (err) {
      console.log(err);

      res.status(500).json({ msg: "Erro ao acessar agendamento!" });
    }
  }

  static async getStep(req, res) {
    try {
      const { id } = req.body;

      if (isNaN(id))
        return res.status(500).json({ msg: "Serviço não encontrado!" });

      const data = await ServiceOrder.findByPk(id, {
        attributes: ["step", [col("OwnerReader.fullName"), "owner"]],

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

  static async genPdf(req, res) {
    const templateHtml = fs.readFileSync(
      "../templates/service-order-template.html",
      "utf8"
    );
    const template = handlebars.compile(templateHtml);
    const html = template(dados);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    await page.pdf({
      path: "service_order.pdf",
      format: "A4",
      margin: 0,
      landscape: true,
    });

    await browser.close();
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

  static formatCurrency(value) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
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
