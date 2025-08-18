import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { formatCurrency, toTitleCase } from "./format.mjs";
import extenso from "extenso";

const genReceipt = ({ id, date, client, services }) => {
  const imgPath = path.join(import.meta.dirname, "../assets/images/logo.png");
  const doc = new PDFDocument({
    size: "A4",
    margin: 20,
  });

  const { left, right } = doc.page.margins;
  const paddingBoxes = 5;

  const offsetFrame = 8;
  const frameX = left;
  const frameY = doc.y;
  const frameW = doc.page.width - left - right;

  const contentX = frameX + (offsetFrame * 2) / 2;
  const contentY = frameY + (offsetFrame * 2) / 2;
  const contentW = frameW - 2 * ((offsetFrame * 2) / 2);

  doc.x = contentX;
  doc.y = contentY;

  let value = 0;

  const tableData = services.types?.map((it, idx) => {
    const quantity = services.quantities[idx];

    value += services.prices[idx] * quantity;

    return [it?.toUpperCase(), quantity, "-"];
  });

  const headerBoxH = 40;

  doc.rect(doc.x, doc.y, contentW, headerBoxH).stroke();

  doc
    .fontSize(28)
    .font("Helvetica-Bold")
    .text("RECIBO", doc.x, doc.y + 10, {
      align: "center",
      characterSpacing: 1,
    });

  doc.moveDown(0.1);

  const numOsBoxW = contentW / 2 - 100;
  doc
    .rect(doc.x, doc.y, numOsBoxW, headerBoxH)
    .fillOpacity(0.3)
    .fillAndStroke("#048f50", "#000000");

  doc
    .rect(doc.x + numOsBoxW + 5, doc.y, contentW - numOsBoxW - 5, headerBoxH)
    .fillOpacity(0.3)
    .fillAndStroke("#048f50", "#000000");

  doc
    .fontSize(10)
    .font("Helvetica")
    .fillOpacity(1)
    .fill("black")
    .text("Número: ", doc.x + paddingBoxes, doc.y + paddingBoxes, {
      align: "left",
    });

  doc.moveUp();

  doc
    .fontSize(25)
    .font("Helvetica")
    .text(id, doc.x + 45, doc.y + 8, {
      align: "left",
    });

  doc.moveUp();

  doc
    .fontSize(25)
    .font("Helvetica")
    .text(formatCurrency(value) || "R$ 0,00", doc.x + (numOsBoxW - 35), doc.y, {
      align: "left",
    });

  doc.moveDown(0.1);

  //#region Body
  const bodyBoxX = contentX;
  const bodyBoxY = doc.y;
  const textBodyBoxX = contentX + paddingBoxes;

  doc
    .fill("#000000")
    .fontSize(10)
    .font("Helvetica")
    .text("RECEBI(EMOS) DE: ", contentX + paddingBoxes, doc.y + paddingBoxes, {
      align: "left",
      continued: true,
    })
    .font("Helvetica-Bold")
    .text(client.fullName, {
      align: "left",
    });

  doc.moveDown();

  const address = [
    client.road,
    client.number,
    client.neighborhood,
    client.city,
    client.cep ? `CEP: ${client.cep}` : null,
  ]
    .filter(Boolean)
    .join(", ");

  doc
    .fill("#000000")
    .fontSize(10)
    .font("Helvetica")
    .text("ENDEREÇO: ", textBodyBoxX, doc.y + paddingBoxes, {
      align: "left",
      continued: true,
    })
    .font("Helvetica-Bold")
    .text(address, {
      align: "left",
    });

  doc.moveDown();

  const importanceLabel = "A IMPORTÂNCIA DE: ";
  const importanceLabelX = contentX + paddingBoxes;
  const importanceLabelY = doc.y + paddingBoxes;

  // rótulo (sem continued, ou encerre já)
  doc
    .fill("#000000")
    .fontSize(10)
    .font("Helvetica")
    .text(importanceLabel, importanceLabelX, importanceLabelY, {
      align: "left",
    });

  const importanceLabelW = doc.widthOfString(importanceLabel);

  const importanceBoxX = importanceLabelX + importanceLabelW + 5;
  const importanceBoxY = importanceLabelY - 2;
  const contentRight = doc.page.width - right - left;
  const importanceBoxWidth = contentRight - importanceBoxX + 5;
  const importanceBoxHeight = 40;

  // desenha a caixa
  doc
    .rect(
      importanceBoxX,
      importanceBoxY,
      importanceBoxWidth,
      importanceBoxHeight
    )
    .fillOpacity(0.3)
    .fill("#048f50");

  doc
    .fill("#000")
    .fillOpacity(1)
    .fontSize(10)
    .font("Helvetica")
    .text(
      toTitleCase(extenso(value || 0)),
      importanceBoxX + paddingBoxes,
      importanceBoxY + paddingBoxes,
      {
        width: importanceBoxWidth - paddingBoxes * 2,
        height: importanceBoxHeight - paddingBoxes * 2,
        align: "left",
        ellipsis: "…",
      }
    );

  //#region Tabela
  const header = ["Referente a:", "Quantidade", "Unidade"];

  const tableTop = importanceBoxY + importanceBoxHeight;
  doc.x = contentX + paddingBoxes;
  doc.y = Math.max(doc.y, tableTop);

  doc.moveDown(1.5).table({
    rowStyles: (i) => {
      if (i !== 0 && i % 2 === 0)
        return { backgroundColor: "#f0f0f0", border: 0.1 };
      return {
        border: 0.1,
      };
    },
    columnStyles: [contentW - 10 - 60 * 2, 60, 60],
    data: [header, ...tableData],
  });
  //#endregion

  const bodyBoxBottom = doc.y + paddingBoxes;
  const bodyBoxH = bodyBoxBottom - bodyBoxY;

  doc
    .save()
    .rect(bodyBoxX, bodyBoxY, contentW, bodyBoxH)
    .stroke("#000000")
    .restore();
  //#endregion

  //#region Issuer e Date
  const issuerBoxW = contentW / 2;
  const footerBoxH = 160;

  doc.moveDown();
  doc
    .rect(contentX, doc.y, issuerBoxW, footerBoxH)
    .fillOpacity(0.3)
    .stroke("#000000");

  doc
    .rect(doc.x + issuerBoxW, doc.y, contentW - issuerBoxW - 5, footerBoxH)
    .fillOpacity(0.3)
    .stroke("#000000");

  //#region Issuer
  const startBoxFooterY = doc.y + paddingBoxes;
  doc
    .fontSize(10)
    .font("Helvetica-Bold")
    .fillOpacity(1)
    .text("EMITENTE: ", doc.x, startBoxFooterY, {
      align: "left",
    });

  doc.moveUp(1).image(imgPath, doc.x + 90, doc.y, {
    fit: [60, 60],
    align: "center",
  });

  doc.moveUp(0.4);

  doc
    .fontSize(10)
    .font("Helvetica")
    .fillOpacity(1)
    .text("(88) 9 9730-0282", doc.x + 180, startBoxFooterY, {
      align: "left",
    });

  doc
    .fontSize(10)
    .font("Helvetica")
    .fillOpacity(1)
    .text("(88) 9 9928-4605", doc.x, doc.y + paddingBoxes, {
      align: "left",
    });

  doc.moveDown(2.5);

  doc
    .fontSize(10)
    .font("Helvetica-Bold")
    .text(
      "TOPODATUM TOPOGRAFIA LTDA",
      contentX + paddingBoxes,
      doc.y + paddingBoxes,
      {
        align: "left",
      }
    );

  doc
    .fontSize(10)
    .font("Helvetica")
    .text(
      "AV. PREF. GUIDO OSTERNO, 1376, PROF. GERALDO\nNEVES, MARCO - CE",
      contentX + paddingBoxes,
      doc.y + paddingBoxes,
      {
        align: "left",
      }
    );

  doc.moveDown();

  doc
    .fontSize(10)
    .font("Helvetica")
    .text(
      "topodatum@gmail.com.br",
      contentX + paddingBoxes,
      doc.y + paddingBoxes,
      {
        align: "left",
      }
    );

  doc
    .fontSize(10)
    .font("Helvetica")
    .text(
      "CNPJ: 11.186.399/0001-63",
      contentX + paddingBoxes,
      doc.y + paddingBoxes,
      {
        align: "left",
      }
    );
  //#endregion

  //region Date
  doc
    .fontSize(10)
    .font("Helvetica-Bold")
    .fillOpacity(1)
    .text("DATA: ", doc.x + 282, startBoxFooterY, {
      align: "left",
    });

  doc.moveDown(2);

  doc.fontSize(10).font("Helvetica").fillOpacity(1).text(date, doc.x, doc.y, {
    align: "left",
  });

  const x1 = doc.page.width - 280;
  const x2 = doc.page.width - right - 15;
  const lineWidth = x2 - x1;

  // desenha a linha
  doc.moveDown(7).moveTo(x1, doc.y).lineTo(x2, doc.y).stroke();

  // posiciona o texto centralizado
  doc
    .fontSize(11)
    .moveDown(0.5)
    .font("Helvetica")
    .text("ASSINATURA", x1, doc.y, {
      width: lineWidth,
      align: "center",
    });

  //#endregion
  //#endregion

  //#region Frame
  const frameBottom = doc.y + paddingBoxes + offsetFrame + 3;
  const frameH = frameBottom - frameY;
  doc
    .save()
    .rect(frameX, frameY, frameW, frameH)
    .lineWidth(8) // espessura da borda
    .strokeColor("#048f50") // cor da borda (amarelo ouro)
    .stroke()
    .restore();
  //#endregion

  return doc;
};

const pipeReceiptToStream = (data, outStream) => {
  const doc = genReceipt(data);
  doc.pipe(outStream);
  doc.end();
};

export default pipeReceiptToStream;
