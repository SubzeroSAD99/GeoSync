import handlebars from "handlebars";
import puppeteer from "puppeteer";
import fs from "fs";
import Joi from "joi";
import ServiceOrder from "../models/ServiceOrder.mjs";
import formatDate from "../utils/formatDate.mjs";
import { generateToken, verifyToken } from "../utils/Token.mjs";

const registerSchema = Joi.object({
  clientName: Joi.string().trim().required(),
  serviceType: Joi.string().trim().required(),
  employee: Joi.string().trim().required(),
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
  step: Joi.string().trim().required(),
  pending: Joi.string().allow(""),
  municipaly: Joi.string().trim().required(),
  internalObs: Joi.string().allow("").max(500).optional(),
  externalObs: Joi.string().allow("").max(500).optional(),
});

class ServiceOrderController {
  static async register(req, res) {
    const { error, value } = registerSchema.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json({ err: true, msg: "Preencha todos os campos obrigatórios!" });
    }

    try {
      const order = await ServiceOrder.create(value);

      if (!order) return res.json({ err: true, msg: "Erro ao criar OS" });

      return res
        .status(200)
        .json({ err: false, msg: "Ordem de serviço criada!" });
    } catch (err) {
      return res
        .status(500)
        .json({ err: true, msg: "Erro interno do servidor." });
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
