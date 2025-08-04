import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { formatCurrency } from "./format.mjs";

const splitLines = (doc, text, maxWidth) => {
  const paragraphs = text.split(/\r?\n/);
  const lines = [];

  for (const para of paragraphs) {
    // linha em branco vira uma linha vazia
    if (para.trim() === "") {
      lines.push("");
      continue;
    }

    // agora quebro as “palavras” do parágrafo como antes
    const words = para.split(/\s+/);
    let line = "";

    for (let word of words) {
      // se a “palavra” sozinha já é maior que a largura, parte por caracter
      if (doc.widthOfString(word) > maxWidth) {
        let chunk = "";
        for (const ch of word) {
          if (doc.widthOfString(chunk + ch) <= maxWidth) {
            chunk += ch;
          } else {
            if (chunk) lines.push(chunk);
            chunk = ch;
          }
        }
        if (chunk) lines.push(chunk);
        // volta a montar a linha corrente
        continue;
      }

      // testa se cabe mais essa palavra na linha atual
      const test = line ? line + " " + word : word;
      if (doc.widthOfString(test) <= maxWidth) {
        line = test;
      } else {
        if (line) lines.push(line);
        line = word;
      }
    }

    // empurra a última linha do parágrafo
    if (line) lines.push(line);
  }

  return lines;
};

const genPdf = ({
  title,
  id,
  emissionDate,
  emissonHour,
  finishedDate,
  client,
  service,
  responsible,
  responsiblePhone,
  responsibleRole,
  obs,
}) => {
  const formattedTitle = `${title} N° ${id}`;
  const imgPath = path.join(import.meta.dirname, "../assets/images/logo.jpg");
  const doc = new PDFDocument({
    size: "A4",
    margin: 20,
    layout: "landscape",
  });

  const { left, right } = doc.page.margins;
  const defaultMoveDown = 0.5;
  const fontSizeSubtitle = 13;
  const discount = 5;
  const subtotal = service.quantity * service.price;
  const total = subtotal - subtotal * (discount / 100);

  // Header
  // Titulo
  doc
    .moveDown(defaultMoveDown)
    .fontSize(28)
    .font("Helvetica-Bold")
    .text(formattedTitle, {
      align: "center",
      characterSpacing: 1,
    });

  //#region Empresa
  // Logo
  doc.moveUp(1).image(imgPath, {
    fit: [120, 120],
    align: "center",
  });

  doc
    .fontSize(10)
    .moveDown(defaultMoveDown)
    .font("Helvetica")
    .text("CNPJ: 11.186.399/0001-63", {
      align: "left",
    });

  // Nome
  doc
    .fontSize(fontSizeSubtitle)
    .moveUp(5)
    .font("Helvetica-Bold")
    .text("TOPODATUM TOPOGRAFIA LTDA", 150, doc.y, {
      align: "left",
    });

  // Endereço
  doc
    .fontSize(fontSizeSubtitle)
    .moveDown(defaultMoveDown)
    .font("Helvetica")
    .text("AV. PREF. GUIDO OSTERNO, 1376, PROF.\nGERALDO NEVES, MARCO - CE", {
      align: "left",
    });

  // Contato
  doc.fontSize(11).moveUp(4).font("Helvetica").text("+55 (88) 9730-0282", {
    align: "right",
  });

  doc
    .fontSize(11)
    .moveDown(defaultMoveDown)
    .font("Helvetica")
    .text("+55 (88) 9928-4605", {
      align: "right",
    });

  doc
    .fontSize(11)
    .moveDown(defaultMoveDown)
    .font("Helvetica")
    .text("topodatum@gmail.com.br", {
      align: "right",
    });

  doc
    .moveDown(2)
    .moveTo(left, doc.y)
    .lineTo(doc.page.width - right, doc.y)
    .stroke();
  // #endregion

  doc
    .fontSize(fontSizeSubtitle)
    .moveDown()
    .font("Helvetica-Bold")
    .text(
      `${formattedTitle} / Emitido em ${emissionDate} ${emissonHour} / Finalizada em ${
        finishedDate ?? "[Aberta]"
      }`,
      left,
      doc.y,
      {
        align: "left",
      }
    );

  doc
    .moveDown(defaultMoveDown)
    .moveTo(left, doc.y)
    .lineTo(doc.page.width - right, doc.y)
    .stroke();

  //#region Cliente
  // Nome
  doc
    .fontSize(11)
    .moveDown(defaultMoveDown)
    .font("Helvetica-Bold")
    .text("Cliente:", {
      align: "left",
      width: doc.page.width - left - right,
      continued: true,
    });

  doc
    .fontSize(10)
    .font("Helvetica")
    .text(client?.fullName || "\u00A0", doc.x + 23, doc.y - 0.5, {
      align: "left",
    });

  // Telefone
  doc
    .moveUp()
    .fontSize(11)
    .font("Helvetica-Bold")
    .text("Telefone:", doc.page.width - right - 180, doc.y, {
      continued: true,
    });

  doc
    .fontSize(10)
    .font("Helvetica")
    .text(client?.phoneNumber || "\u00A0", doc.x + 10, doc.y, {
      align: "left",
    });

  // Endereço
  const addressParts = [
    client.road,
    client.number,
    client.neighborhood,
    client.city,
    client.cep ? `CEP: ${client.cep}` : null,
  ]
    .filter(Boolean)
    .join(", ");

  doc
    .moveDown(defaultMoveDown)
    .fontSize(11)
    .font("Helvetica-Bold")
    .text("Endereço:", left, doc.y, { continued: true });

  doc
    .fontSize(10)
    .font("Helvetica")
    .text(addressParts || "\u00A0", doc.x + 10, doc.y, {
      lineBreak: true,
    });
  //#endregion

  //#region Tabela
  doc.moveDown(defaultMoveDown).table({
    rowStyles: (i) => {
      if (i === 0) return { backgroundColor: "#048f50", textColor: "#ffffff" };
      else if (i % 2 === 0) return { backgroundColor: "#eeeeee" };
    },
    columnStyles: ["*", "*", 70, 60, 80, 80],
    data: [
      [
        "Tipo de Serviço",
        "Local do Serviço",
        "Quantidade",
        "Unidade",
        "Preço Unitário",
        "Total do Serviço",
      ],
      [
        service.type,
        service.location,
        service.quantity,
        "-",
        formatCurrency(service.price) || "R$ 0,00",
        formatCurrency(service.quantity * service.price) || "R$ 0,00",
      ],
    ],
  });

  doc
    .fontSize(11)
    .moveDown(defaultMoveDown)
    .font("Helvetica-Bold")
    .text("Subtotal:", left, doc.y, {
      align: "left",
    });

  doc
    .fontSize(10)
    .moveUp(1)
    .font("Helvetica")
    .text(
      formatCurrency(subtotal) || "R$ 0,00",
      doc.x + (doc.page.width - right - left - 77),
      doc.y - 1,
      {
        align: "left",
        width: 200,
      }
    );

  doc
    .moveDown(defaultMoveDown)
    .moveTo(left, doc.y)
    .lineTo(doc.page.width - right, doc.y)
    .stroke();

  // Footer
  doc
    .fontSize(11)
    .moveDown(defaultMoveDown)
    .font("Helvetica-Bold")
    .text("Condição de Pagamento:", left, doc.y, {
      align: "left",
      continued: true,
    })
    .fontSize(10)
    .font("Helvetica")
    .text("Pagamento a Vista", doc.x + 5, doc.y, {
      align: "left",
    });

  doc
    .fontSize(11)
    .moveUp()
    .font("Helvetica-Bold")
    .text("Forma de Pagamento:", 350, doc.y, {
      align: "left",
      continued: true,
    })
    .fontSize(10)
    .font("Helvetica")
    .text("Dinheiro", doc.x + 5, doc.y, {
      align: "left",
    });

  doc
    .fontSize(11)
    .moveUp()
    .font("Helvetica-Bold")
    .text("Desconto:", 686, doc.y, {
      align: "left",
      continued: true,
    })
    .fontSize(10)
    .font("Helvetica")
    .fillColor("#048f50")
    .text(
      `${String(discount.toFixed(2)).replace(".", ",")}%`,
      doc.x + 5,
      doc.y,
      {
        align: "left",
      }
    );

  doc.fillColor("black");

  doc
    .fontSize(11)
    .moveDown()
    .font("Helvetica-Bold")
    .text("Total:", left, doc.y, {
      align: "left",
    });

  doc
    .fontSize(10)
    .moveUp(1)
    .font("Helvetica")
    .text(
      formatCurrency(total) || "R$ 0,00",
      doc.x + (doc.page.width - right - left - 76),
      doc.y - 1,
      {
        align: "left",
        width: 200,
      }
    );

  doc
    .moveDown(defaultMoveDown)
    .moveTo(left, doc.y)
    .lineTo(doc.page.width - right, doc.y)
    .stroke();
  //#endregion

  // Responsavel
  doc
    .fontSize(11)
    .moveDown(defaultMoveDown)
    .font("Helvetica-Bold")
    .text("Responsável Técnico:", left, doc.y, {
      align: "left",
      continued: true,
    });

  const labelWidth = doc.widthOfString("Responsável Técnico:");

  doc
    .fontSize(10)
    .font("Helvetica")
    .text(responsible, doc.x + 5, doc.y, {
      align: "left",
    });

  doc.fontSize(11);

  const respWidth = doc.widthOfString(responsible);
  const roleWidth = doc.widthOfString(responsibleRole || " ");
  const startX = left + labelWidth + (respWidth - roleWidth) / 2;

  doc
    .moveDown(defaultMoveDown)
    .font("Helvetica")
    .text(responsibleRole, startX - 10, doc.y, {
      align: "left",
    });

  doc
    .fontSize(11)
    .moveUp(defaultMoveDown + 2)
    .font("Helvetica-Bold")
    .text("Telefone:", 640, doc.y, {
      align: "left",
      continued: true,
    })
    .fontSize(10)
    .font("Helvetica")
    .text(responsiblePhone, doc.x + 5, doc.y, {
      align: "left",
    });

  doc.moveDown(3);

  const boxX = left;
  const boxY0 = doc.y; // topo do seu box, na 1ª página
  const boxW = (doc.page.width - left - right) / 1.8;
  const boxH = 70;
  const padding = 4;

  const contentW = boxW - 2 * padding;
  const contentH = boxH - 2 * padding;

  doc.font("Helvetica");
  const lineH = doc.currentLineHeight();
  const maxLinesFirst = Math.floor(contentH / lineH) - 1;
  const maxLinesNext = Math.floor(contentH / lineH);

  const allLines = splitLines(doc, obs, contentW);

  let pageIndex = 0;
  while (allLines.length) {
    if (pageIndex > 0) {
      doc.addPage();
    }

    const boxY = boxY0;
    doc.rect(boxX, boxY, boxW, boxH).stroke();

    const count = pageIndex === 0 ? maxLinesFirst : maxLinesNext;
    const chunk = allLines.splice(0, count);

    if (pageIndex === 0) {
      const labelY = boxY + padding;
      doc.font("Helvetica-Bold").text("Observação: ", boxX + padding, labelY, {
        width: contentW,
        continued: true,
      });

      doc.font("Helvetica").text(chunk.join("\n"), {
        width: contentW,
      });
    } else {
      const textY = boxY + padding;
      doc.font("Helvetica").text(chunk.join("\n"), boxX + padding, textY, {
        width: contentW,
      });
    }

    pageIndex++;
  }

  return doc;
};

const pipePdfToStream = (data, outStream) => {
  const doc = genPdf(data);
  doc.pipe(outStream);
  doc.end();
};

export default pipePdfToStream;
