import MercadoPagoClient from "../config/MercadoPagoClient.mjs";
import { configDotenv } from "dotenv";
configDotenv();

const { EXPIRES_QRCODE } = process.env;

class MercadoPagoService {
  static async createPix({
    amount,
    description = "",
    payer,
    external_reference = null,
  }) {
    const now = new Date();
    const expiration = new Date(
      now.getTime() + EXPIRES_QRCODE * 60 * 1000
    ).toISOString();

    const body = {
      transaction_amount: Number(amount),
      description,
      payment_method_id: "pix",
      date_of_expiration: expiration,
      payer,
      external_reference,
    };

    const requestOptions = {
      idempotencyKey: crypto.randomUUID(),
    };

    const mp = MercadoPagoClient.payment();
    const res = await mp.create({ body, requestOptions });

    const trx = res?.point_of_interaction?.transaction_data ?? {};
    return {
      paymentId: res.id,
      qr_code: trx.qr_code ?? null,
      qr_code_base64: trx.qr_code_base64 ?? null,
    };
  }

  static async getPayment(paymentId) {
    const response = await MercadoPagoClient.payment().get({
      id: paymentId,
    });

    return response;
  }
}

export default MercadoPagoService;
