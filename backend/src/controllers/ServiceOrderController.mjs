import handlebars from "handlebars";
import puppeteer from "puppeteer";
import fs from "fs";
import Joi from "joi";
import ServiceOrder from "../models/ServiceOrder.mjs";

const registerSchema = Joi.object({
  clientName: Joi.string().trim().required(),
  serviceType: Joi.string().trim().required(),
  employee: Joi.string().trim().required(),
  priority: Joi.string()
    .lowercase()
    .valid("low", "normal", "high")
    .empty("")
    .default("normal"),
  status: Joi.string().valid("open", "closed").empty("").default("open"),
  step: Joi.string().trim().required(),
  pending: Joi.string().allow(""),
  municipaly: Joi.string().trim().required(),
  internalObs: Joi.string().allow("").max(500).optional(),
  externalObs: Joi.string().allow("").max(500).optional(),
});

class ServiceOrderController {
  static async register(req, res) {
    console.log(req.body);

    const { error, value } = registerSchema.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json({ err: true, msg: "Preencha todos os campos obrigatórios!" });
    }

    try {
      const order = await ServiceOrder.create(value);

      console.log(order);

      return res
        .status(201)
        .json({ err: false, msg: "Ordem de serviço criada!" });
    } catch (err) {
      console.error("Erro ao criar ServiceOrder:", err);
      return res
        .status(500)
        .json({ err: true, msg: "Erro interno do servidor." });
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
