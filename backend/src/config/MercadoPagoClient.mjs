// SDK novo: npm i mercadopago
import { MercadoPagoConfig, Payment } from "mercadopago";

const { MP_ACCESS_TOKEN } = process.env;

class MercadoPagoClient {
  static #client = null;
  static #payment = null;

  static init() {
    return new Promise((resolve, reject) => {
      try {
        if (!MP_ACCESS_TOKEN) {
          reject("Token do mercado pago ausente");
        }
        if (!this.#client) {
          this.#client = new MercadoPagoConfig({
            accessToken: MP_ACCESS_TOKEN,
            options: { timeout: 5000 },
          });
          this.#payment = new Payment(this.#client);
        }

        resolve(true);
      } catch (err) {
        reject("Erro ao configurar o mercado pago");
      }
    });
  }

  static payment() {
    if (!this.#payment) {
      throw new Error("MercadoPagoClient não inicializado");
    }
    return this.#payment;
  }
}

export default MercadoPagoClient;
