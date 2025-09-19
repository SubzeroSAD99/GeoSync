import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { formatCurrency, toTitleCase } from "./format.mjs";

const genPdf = ({ services = {}, period }) => {
  const imgPath = path.join(import.meta.dirname, "../assets/images/logo.png");
  const doc = new PDFDocument({
    size: "A4",
    margin: 20,
  });

  const defaultMoveDown = 0.5;

  const paintPage = () => {
    const { width, height } = doc.page;
    const borderPadding = 20;

    doc.save();

    // Background Color
    doc.rect(0, 0, width, height).fill("#F4F7FB");

    // Watermark
    doc.opacity(0.1);
    const wmWidth = width * 0.5;
    const wmX = (width - wmWidth) / 2;
    const wmY = (height - wmWidth) / 2;
    doc.image(imgPath, wmX, wmY, { width: wmWidth });
    doc.opacity(1);

    // Border
    doc.lineWidth(0.5); // espessura da linha
    doc.strokeColor("#048f50"); // cor da borda
    doc
      .rect(
        borderPadding,
        borderPadding,
        width - borderPadding * 2,
        height - borderPadding * 2
      )
      .stroke();

    doc.page.margins = {
      top: borderPadding + 10,
      left: borderPadding + 10,
      right: borderPadding + 10,
      bottom: borderPadding + 10,
    };

    doc.x = doc.page.margins.left;
    doc.y = doc.page.margins.top;

    doc.restore();
  };

  const { left, right } = doc.page.margins;

  paintPage();
  doc.on("pageAdded", paintPage);

  // Header
  // Titulo
  doc
    .moveDown(defaultMoveDown)
    .fontSize(22)
    .font("Helvetica-Bold")
    .text("RELATÓRIO GERAL DE SERVIÇOS", {
      align: "center",
    });

  doc
    .moveDown(defaultMoveDown)
    .fontSize(10)
    .font("Helvetica-Bold")
    .text("Período: ", {
      align: "left",
    });

  doc.font("Helvetica-Bold").text(period || " ");

  doc.moveDown(2);

  //#region Tabela
  const header = [
    "Valor Recebido",
    "Valor a Receber",
    "Qtd. Pago",
    "Qtd. Não Pago",
  ];

  const tables = [];
  let totalRevenue = 0;
  let totalToReceive = 0;

  const getGroup = (type) => {
    let group = tables.find((g) => g.type === type);

    if (!group) {
      group = {
        type,
        received: 0, // money received for this type
        toReceive: 0, // money still pending for this type
        amountPaidQt: 0, // quantity of units paid
        unpaidAmountQt: 0, // quantity of units still unpaid
      };
      tables.push(group);
    }
    return group;
  };

  services.forEach((it) => {
    const {
      serviceType = [],
      serviceValue = [],
      quantity = [],
      amountPaid = 0,
      paymentSituation,
      discount = 0,
    } = it;

    const lineTotals = serviceType.map(
      (_, idx) => Number(serviceValue[idx] || 0) * Number(quantity[idx] || 0)
    );

    const totalGross = lineTotals.reduce((acc, v) => acc + v, 0);

    if (totalGross === 0) {
      serviceType.forEach((type, idx) => {
        const group = getGroup(type);
        if (paymentSituation === "pago") {
          group.amountPaidQt += Number(quantity[idx] || 0);
        } else {
          group.unpaidAmountQt += Number(quantity[idx] || 0);
        }
      });
      return;
    }

    const discountPct = Math.max(Number(discount) || 0, 0) / 100;
    const totalDiscount = totalGross * discountPct;
    const weights = lineTotals.map((v) => v / totalGross);

    const valuesWithDiscount = lineTotals.map(
      (v, idx) => v - totalDiscount * weights[idx]
    );

    const totalWithDiscount = valuesWithDiscount.reduce((a, b) => a + b, 0);

    const paid = Math.max(Number(amountPaid) || 0, 0);
    const paidPerType =
      totalWithDiscount > 0
        ? valuesWithDiscount.map((v) => (paid * v) / totalWithDiscount)
        : valuesWithDiscount.map(() => 0);

    const pendingPerType = valuesWithDiscount.map((v, idx) =>
      Math.max(v - paidPerType[idx], 0)
    );

    // 5) Update aggregated groups
    serviceType.forEach((type, idx) => {
      const group = getGroup(type);

      group.received += paidPerType[idx];
      group.toReceive += pendingPerType[idx];

      const q = Number(quantity[idx] || 0);
      if (paymentSituation === "paid") {
        group.amountPaidQt += q;
      } else {
        group.unpaidAmountQt += q;
      }
    });

    totalRevenue += Math.min(paid, totalWithDiscount);
    totalToReceive += Math.max(totalWithDiscount - paid, 0);
  });

  const totalBilled = totalRevenue + totalToReceive;

  const compliance =
    totalBilled === 0 ? 100 : (totalRevenue / totalBilled) * 100;

  let complianceColor = "#000000";
  if (compliance < 50) {
    complianceColor = "#ff0000";
  } else if (compliance < 70) {
    complianceColor = "#ffa500";
  } else {
    complianceColor = "#008000";
  }

  doc
    .fontSize(15)
    .font("Helvetica-Bold")
    .text("Resumo Executivo")
    .fontSize(10)
    .moveDown(defaultMoveDown)
    .table(
      {
        defaultStyle: { border: 0, padding: 6, align: "center" },
        rowStyles: (i) => {
          if (i === 0) {
            return {
              backgroundColor: "#048f50",
              textColor: "#ffffff",
            };
          }
          return { backgroundColor: "#ecf2f7" };
        },
        data: [
          ["Receita Total", "A Receber", "Adimplência"],
          [
            formatCurrency(totalRevenue) || "R$ 0,00",
            formatCurrency(totalToReceive) || "R$ 0,00",
            { textColor: complianceColor, text: compliance.toFixed(2) + "%" },
          ],
        ],
      },
      {
        prepareHeader: () => doc.font("Helvetica").fontSize(10),
        prepareRow: () => doc.font("Helvetica").fontSize(10),
      }
    );

  doc
    .moveDown(3)
    .moveTo(left * 2, doc.y)
    .lineTo(doc.page.width - right * 2, doc.y)
    .stroke("#afafaf");

  doc.moveDown(3);

  tables.forEach((it) => {
    doc
      .fontSize(15)
      .font("Helvetica-Bold")
      .text(toTitleCase(it.type))
      .fontSize(10)
      .moveDown(defaultMoveDown)
      .table(
        {
          defaultStyle: { border: 0, padding: 6, align: "center" },
          rowStyles: (i) => {
            if (i === 0) {
              return { backgroundColor: "#048f50", textColor: "#ffffff" }; // header
            }
            return { backgroundColor: "#ecf2f7" };
          },
          data: [
            header,
            [
              formatCurrency(it.received) || "R$ 0,00",
              formatCurrency(it.toReceive) || "R$ 0,00",
              it.amountPaidQt ?? 0,
              it.unpaidAmountQt ?? 0,
            ],
          ],
        },
        {
          prepareHeader: () => doc.font("Helvetica").fontSize(10),
          prepareRow: () => doc.font("Helvetica").fontSize(10),
        }
      );

    doc.moveDown(5);
  });

  return doc;
};

export const savePdfToFile = (data, outPath = "./saida.pdf") => {
  return new Promise((resolve, reject) => {
    const doc = genPdf(data);
    const outStream = fs.createWriteStream(outPath);
    outStream.on("finish", () => resolve(outPath));
    outStream.on("error", reject);
    doc.pipe(outStream);
    doc.end(); // finalizar o PDF
  });
};

const pipePdfReportToStream = (data, outStream) => {
  const doc = genPdf(data);
  doc.pipe(outStream);
  doc.end();
};

const pdfReportToBuffer = (data) =>
  new Promise((resolve, reject) => {
    const doc = genPdf(data);
    const chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    // IMPORTANTE: finalizar o PDF
    doc.end();
  });

export { pipePdfReportToStream, pdfReportToBuffer };
