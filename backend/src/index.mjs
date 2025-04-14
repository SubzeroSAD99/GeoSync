import express from "express";
import handlebars from "handlebars";
import puppeteer from "puppeteer";
import fs from "fs";

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

/* const PARAMS = {
  serviceNumber: 9999,
  dateNow: new Date().toLocaleDateString(),
  status: "Aberta",

  clientName: "ANTONIO KAUAN LOPES FREITAS",
  code: 99,
  clientPhoneNumber: "(88) 9 9645-9091",
  clientAddress: "BOM JESUS, MARCO-CE, CEP: 62560-000",

  paymentCondition: "Pagamento á Vista",
  paymentType: "Dinheiro",
  discount: 0,

  technicalName: "ANTONIO KAUAN LOPES FREITAS",
  technicalPosition: "Aux. Administrativo",
  code: 99,
  technicalPhoneNumber: "(88) 9 9645-9091",

  observation: `9900
  TESTANDO
  `,
}; */
