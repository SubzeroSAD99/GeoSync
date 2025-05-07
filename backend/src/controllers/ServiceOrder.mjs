import handlebars from "handlebars";
import puppeteer from "puppeteer";
import fs from "fs";

class ServiceOrder {
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

export default ServiceOrder;
