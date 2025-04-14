import express from "express";
import handlebars from "handlebars";
import puppeteer from "puppeteer";
import fs from "fs";

const formatCurrency = (value) => {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const prepareDataToFront = (input) => {
  const services = input.services.map((service) => ({
    ...service,
    total: service.quantity * service.unitPrice,
    totalFormatted: formatCurrency(service.quantity * service.unitPrice),
    unitPriceFormatted: formatCurrency(service.unitPrice),
  }));

  const subTotalOS = services.reduce((sum, service) => sum + service.total, 0);
  const discountValue = (input.discount / 100) * subTotalOS;
  const totalOS = subTotalOS - discountValue;

  return {
    ...input,
    services,
    subTotalOS: formatCurrency(subTotalOS),
    totalOS: formatCurrency(totalOS),
    dateNow: new Date().toLocaleDateString("pt-BR"),
  };
};

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/gen-pdf", async (req, res) => {
  const templateHtml = fs.readFileSync(
    "./templates/service-order-template.html",
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
});

app.listen(PORT, () => {
  console.log(`Servidor Backend Rodando em ${PORT}.`);
});

const teste = async (dados) => {
  const templateHtml = fs.readFileSync(
    "./templates/service-order-template.html",
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
};

const services = [
  {
    description: "LEVANTAMENTO TOPOGRAFICO PLANIMETRICO",
    location: "FORTALEZA / EDSON QUEIROZ",
    quantity: 5,
    unit: "-",
    unitPrice: 100,
  },

  {
    description: "LEVANTAMENTO TOPOGRAFICO PLANIMETRICO",
    location: "FORTALEZA / EDSON QUEIROZ",
    quantity: 1,
    unit: "-",
    unitPrice: 500,
  },
];

const PARAMS = {
  serviceNumber: 9999,
  dateNow: new Date().toLocaleDateString(),
  status: "Aberta",

  clientName: "ANTONIO KAUAN LOPES FREITAS",
  code: 99,
  clientPhoneNumber: "(88) 9 9645-9091",
  clientAddress: "BOM JESUS, MARCO-CE, CEP: 62560-000",

  services,

  paymentCondition: "Pagamento á Vista",
  paymentType: "Dinheiro",
  discount: 5,

  technicalName: "ANTONIO KAUAN LOPES FREITAS",
  technicalPosition: "Aux. Administrativo",
  code: 99,
  technicalPhoneNumber: "(88) 9 9645-9091",

  observation: `9900
  TESTANDO
  `,
};

teste(prepareDataToFront(PARAMS));
