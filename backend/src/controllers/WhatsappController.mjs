import { getSocket } from "../services/whatsappServices.mjs";

class WhatsappController {
  static async sendMessage(to, msg) {
    return new Promise(async (resolve, reject) => {
      try {
        const sock = await getSocket();

        await sock.sendMessage(to.replace(/\D/g, "") + "@s.whatsapp.net", {
          text: msg,
        });

        resolve(true);
      } catch (err) {
        reject(false);
      }
    });
  }

  static sendFile(to, buffer, mimetype, fileName) {
    return new Promise(async (resolve, reject) => {
      try {
        const sock = await getSocket();

        await sock.sendMessage(to.replace(/\D/g, "") + "@s.whatsapp.net", {
          document: buffer,
          mimetype,
          fileName,
        });

        resolve(true);
      } catch (err) {
        reject(false);
      }
    });
  }
}

export default WhatsappController;
