import { getSocket } from "../services/whatsappServices.mjs";

class WhatsappController {
  static async sendMessage(to, msg) {
    return new Promise(async (resolve, reject) => {
      try {
        const sock = await getSocket();

        console.log(to.replace(/\D/g, "") + "@s.whatsapp.net");

        console.log(
          await sock.sendMessage(to.replace(/\D/g, "") + "@s.whatsapp.net", {
            text: msg,
          })
        );

        resolve(true);
      } catch (err) {
        console.log(err);

        reject(false);
      }
    });
  }
}

export default WhatsappController;
