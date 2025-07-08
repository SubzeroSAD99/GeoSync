import handlebars from "handlebars";
import puppeteer from "puppeteer";
import fs from "fs";
import Joi from "joi";
import ServiceOrder from "../models/ServiceOrder.mjs";
import formatDate from "../utils/formatDate.mjs";
import { generateToken, verifyToken } from "../utils/Token.mjs";
import { Op } from "sequelize";

const registerSchema = Joi.object({
  owner: Joi.string()
    .lowercase()
    .trim()
    .required()
    .empty(["", "selecione"])
    .messages({
      "any.required": "Por favor, selecione um cliente.",
    }),
  serviceType: Joi.string()
    .lowercase()
    .trim()
    .required()
    .empty(["", "selecione"])
    .messages({
      "any.required": "Por favor, selecione um tipo de serviço.",
    }),
  employee: Joi.string()
    .lowercase()
    .trim()
    .required()
    .empty(["", "selecione"])
    .messages({
      "any.required": "Por favor, selecione um funcionario.",
    }),
  priority: Joi.string()
    .lowercase()
    .valid("baixa", "normal", "alta")
    .empty(["", "selecione"])
    .default("normal"),
  status: Joi.string()
    .lowercase()
    .valid("aberta", "fechada")
    .empty(["", "selecione"])
    .default("aberta"),
  step: Joi.string()
    .lowercase()
    .trim()
    .required()
    .empty(["", "selecione"])
    .messages({
      "any.required": "Por favor, selecione uma etapa.",
    }),
  pending: Joi.string().allow("").empty("selecione"),
  municipaly: Joi.string()
    .lowercase()
    .trim()
    .required()
    .empty(["", "selecione"])
    .messages({
      "any.required": "Por favor, selecione um municipio!.",
    }),
  measurementDate: Joi.string()
    .pattern(/^\d{2}\/\d{2}\/\d{4}$/)
    .trim()
    .empty("")
    .default(null)
    .optional()
    .allow(null),
  meter: Joi.string().lowercase().optional(),
  internalObs: Joi.string().allow("").max(500).optional(),
  externalObs: Joi.string().allow("").max(500).optional(),
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

      const decoded = verifyToken(id);

      const row = await ServiceOrder.update(value, {
        where: {
          id: decoded.id,
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

    try {
      const decoded = verifyToken(id);

      const data = await ServiceOrder.findOne({
        where: {
          id: decoded.id,
        },
        raw: true,
      });

      if (!data) res.status(400).json({ msg: "Serviço não encontrado!" });

      res.json({ service: data });
    } catch (err) {
      res.status(400).json({ msg: "Erro interno no servidor!" });
    }
  }

  static async getAllOpen(req, res) {
    try {
      const data = await ServiceOrder.findAll({
        where: {
          status: "aberta",
        },
        raw: true,
      });

      data.map((obj) => {
        obj.id = generateToken({ id: obj.id });
        obj.createdAt = formatDate(obj.createdAt).split(",")[0];
      });

      res.json(data);
    } catch (err) {
      console.log(err);
    }
  }

  static async getAllClosed(req, res) {
    try {
      const data = await ServiceOrder.findAll({
        where: {
          status: "fechada",
        },
        raw: true,
      });

      data.map((obj) => {
        obj.id = generateToken({ id: obj.id });
        obj.createdAt = formatDate(obj.createdAt).split(",")[0];
      });

      res.json(data);
    } catch (err) {
      console.log(err);
    }
  }

  static async getAllOpenByMonth(req, res) {
    const { month, year, meter } = req.body;

    try {
      const mm = String(month).padStart(2, "0");
      const start = `${year}-${mm}-01`;

      // se for dezembro (12), seta proxima ano e coloca mes 1
      const nextYear = month === 12 ? year + 1 : year;
      const nextMonth = month === 12 ? 1 : month + 1;
      const mm2 = String(nextMonth).padStart(2, "0");
      const end = `${nextYear}-${mm2}-01`;

      const services = await ServiceOrder.findAll({
        where: {
          measurementDate: {
            [Op.gte]: start, // >= YYYY-MM-01
            [Op.lt]: end, // < YYYY-MM+1-01
          },
          status: "aberta",
          meter: meter.toLowerCase(),
        },
        order: [["measurementDate", "ASC"]],
        raw: true,
      });

      const formattedServices = services.map((it) => {
        return {
          serviceType: it.serviceType,
          contractor: it.contractor,
          contractorNumber: it.contractorNumber,
          owner: it.owner,
          municipaly: it.municipaly,
          locality: it.locality,
          ownerNumber: it.ownerNumber,
          measurementHour: it.measurementHour,
          measurementDate: it.measurementDate,
          internalObs: it.internalObs,
        };
      });

      res.json({ services: formattedServices });
    } catch (err) {
      console.log(err);

      res.status(500).json({ msg: "Erro ao acessar agendamento!" });
    }
  }

  static async getAllOpenByDate(req, res) {
    const { day, month, year, meter } = req.body;

    try {
      const start = `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;

      const end = `${year}-${String(month).padStart(2, "0")}-${String(
        day + 1
      ).padStart(2, "0")}`;

      const services = await ServiceOrder.findAll({
        where: {
          measurementDate: {
            [Op.gte]: start,
            [Op.lt]: end,
          },
          status: "aberta",
          meter: meter.toLowerCase(),
        },
        order: [["measurementDate", "ASC"]],
        raw: true,
      });

      const formattedServices = services.map((it) => {
        return {
          serviceType: it.serviceType,
          contractor: it.contractor,
          contractorNumber: it.contractorNumber,
          owner: it.owner,
          municipaly: it.municipaly,
          locality: it.locality,
          ownerNumber: it.ownerNumber,
          measurementHour: it.measurementHour,
          measurementDate: it.measurementDate,
          internalObs: it.internalObs,
        };
      });

      res.json({ services: formattedServices });
    } catch (err) {
      console.log(err);

      res.status(500).json({ msg: "Erro ao acessar agendamento!" });
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

  static formatCurrency(value) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
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
