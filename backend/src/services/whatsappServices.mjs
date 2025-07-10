import * as baileys from "@whiskeysockets/baileys";
import { DisconnectReason } from "@whiskeysockets/baileys";
import qrcode from "qrcode-terminal";

let sockResolvePromise = null;
let sockResolve;

const startSock = async () => {
  const { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } =
    baileys;
  const { state, saveCreds } = await useMultiFileAuthState(
    "./services/auth_info_baileys"
  );
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({ auth: state, version });

  if (!sockResolvePromise) {
    sockResolvePromise = new Promise((resolve) => {
      sockResolve = resolve;
    });
  }

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      qrcode.generate(qr, { small: true });
    }

    if (connection === "open") {
      console.log("✅ WhatsApp conectado!");

      sockResolve(sock);
    }

    if (connection === "close") {
      const code = lastDisconnect?.error?.output?.statusCode;
      console.log("🔌 Desconectado:", code);
      if (code === DisconnectReason.restartRequired) {
        console.log("🔄 Reiniciando conexão (restartRequired)...");
        startSock();
      } else if (code !== DisconnectReason.loggedOut) {
        console.log("🔄 Reconectando...");
        startSock();
      } else {
        console.log(
          "⚠️ Logout detectado; remova auth_info_baileys para re-escanear QR"
        );
      }
    }
  });
};

const getSocket = () => sockResolvePromise;

export { startSock, getSocket };
