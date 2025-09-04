import MercadoPagoService from "../services/MercadoPagoService.mjs";
import SocketServer from "../sockets/SocketServer.mjs";
import ServiceOrderController from "./ServiceOrderController.mjs";
import crypto from "crypto";

const { MP_WEBHOOK_SECRET } = process.env;

class MercadoPagoController {
  static async createPix(req, res) {
    try {
      const { id, email } = req.body;

      if (isNaN(id) && isFinite(id))
        return res.status(500).json({ msg: "Serviço não encontrado" });

      if (!email.trim())
        return res.status(500).json({ msg: "Digite um email válido" });

      const situation = await ServiceOrderController.getPaymentSituation(id);

      if (situation.paymentSituation === "pago")
        return res
          .status(500)
          .json({ msg: "Serviço ja esta com pagamento em dia" });

      let amountCents = 0;

      for (let [index, value] of situation.serviceValue.entries()) {
        if (value) {
          const priceCents = Math.round(Number(value) * 100); // converte para centavos
          const qty = Number(situation.quantity[index]) || 0;
          amountCents += priceCents * qty;
        }
      }

      // subtrai o que já foi pago (também convertido em centavos)
      const paidCents = Math.round(Number(situation.amountPaid) * 100);
      amountCents -= paidCents;

      // transforma de volta em reais só quando precisar exibir/enviar
      const amount = amountCents / 100;

      if (isFinite(amount) && amount <= 0) throw new Error("Valor inválido");

      const data = await MercadoPagoService.createPix({
        amount,
        payer: {
          email,
        },
        external_reference: String(id),
      });

      if (!data) throw new Error("Qrcode não gerado");

      res.json(data);
    } catch (err) {
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async webhook(req, res) {
    try {
      const { ts, v1 } = MercadoPagoController.parseSignatureHeader(
        req.get("x-signature")
      );
      const requestId = req.get("x-request-id");
      const resourceId = req.query["data.id"] || req.query.id;

      if (!ts || !v1 || !requestId || !resourceId || !MP_WEBHOOK_SECRET)
        return res.sendStatus(400);

      // Montando manifesto
      const manifest = `id:${resourceId};request-id:${requestId};ts:${ts};`;

      // Gerar HMAC-SHA256 do manifesto com secret
      const expectedHex = crypto
        .createHmac("sha256", MP_WEBHOOK_SECRET)
        .update(manifest)
        .digest("hex");

      // Comparar com segurança
      if (!MercadoPagoController.safeEqHex(v1, expectedHex))
        return res.sendStatus(401);

      res.status(200).end();

      try {
        const raw = Buffer.isBuffer(req.body)
          ? req.body
          : Buffer.from(req.rawBody ?? "", "utf8");

        const { type, data } = JSON.parse(raw.toString("utf8")) ?? {};

        if (type === "payment") {
          const paymentId = data.id;

          const payment = await MercadoPagoService.getPayment(paymentId);

          const isPaid =
            payment.status === "approved" &&
            payment.status_detail === "accredited" &&
            payment.captured === true &&
            payment.transaction_amount_refunded === 0 &&
            payment.live_mode === true;

          if (isPaid) {
            const { external_reference, transaction_amount } = payment;

            if (external_reference && isFinite(external_reference)) {
              ServiceOrderController.updatePaymentSituation(
                external_reference,
                transaction_amount
              );

              SocketServer.emitToPayment(paymentId, "payment:approved");
            }
          }
        }
      } catch (err) {}
    } catch (err) {
      res.sendStatus(500);
    }
  }

  static parseSignatureHeader(hdr) {
    const out = {};
    String(hdr || "")
      .split(",")
      .map((s) => s.trim())
      .forEach((part) => {
        const [k, v] = part.split("=").map((x) => x?.trim());
        if (k && v) out[k] = v;
      });
    return { ts: out.ts, v1: out.v1 };
  }

  static safeEqHex(aHex, bHex) {
    try {
      const a = Buffer.from(String(aHex), "hex");
      const b = Buffer.from(String(bHex), "hex");
      if (a.length !== b.length) return false;
      return crypto.timingSafeEqual(a, b);
    } catch {
      return false;
    }
  }
}

export default MercadoPagoController;
