// whatsapp.js (ESM)
import * as baileys from "@whiskeysockets/baileys";
import pkg from "@whiskeysockets/baileys";
import qrcode from "qrcode-terminal";
import { isBoom } from "@hapi/boom";

const { DisconnectReason } = pkg;
const AUTH_DIR = "./services/auth_info_baileys";

let sock = null;
let connecting = null;
let stopRequested = false;

const backoff = (attempt) => Math.min(30_000, 1_000 * 2 ** attempt);
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const getSocket = () => connecting;

export async function startSock() {
  if (connecting) return connecting;
  stopRequested = false;
  connecting = connectLoop();
  return connecting;
}

export function stopSock() {
  stopRequested = true;
}

async function connectLoop() {
  const { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } =
    baileys;
  const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
  const { version } = await fetchLatestBaileysVersion();

  let attempt = 0;

  while (!stopRequested) {
    try {
      sock = makeWASocket({
        auth: state,
        version,
        browser: ["GeoSync", "Chrome", "127"],
        keepAliveIntervalMs: 20_000,
        connectTimeoutMs: 60_000,
        defaultQueryTimeoutMs: 60_000,
        emitOwnEvents: true,
      });

      sock.ev.on("creds.update", saveCreds);

      sock.ev.on("connection.update", (u) => {
        const { connection, lastDisconnect, qr } = u;

        if (qr) qrcode.generate(qr, { small: true });

        if (connection === "open") {
          attempt = 0;
          console.log("✅ WhatsApp conectado!");
        }

        if (connection === "close") {
          const err = lastDisconnect?.error;
          const code = isBoom(err) ? err.output?.statusCode : undefined;
          const msg = isBoom(err)
            ? err.output?.payload?.message
            : err?.message || String(err);
          console.error("🔌 Desconectado:", { code, msg });

          if (code === DisconnectReason.loggedOut || code === 401) {
            console.error(
              "⚠️ Sessão inválida. Apague",
              AUTH_DIR,
              "e escaneie o QR novamente."
            );
            stopRequested = true;
          }
          if (code === DisconnectReason.connectionReplaced || code === 409) {
            console.error(
              "⚠️ Conexão substituída (outro processo usando a mesma sessão)."
            );
            stopRequested = true;
          }
        }
      });

      // esperar abrir ou fechar
      await new Promise((resolve, reject) => {
        const onUpdate = (u) => {
          if (u.connection === "open") {
            sock.ev.off("connection.update", onUpdate);
            resolve();
          } else if (u.connection === "close") {
            sock.ev.off("connection.update", onUpdate);
            reject(u.lastDisconnect?.error || new Error("connection closed"));
          }
        };
        sock.ev.on("connection.update", onUpdate);
      });

      // conectado
      connecting = Promise.resolve(sock);
      return sock;
    } catch (e) {
      const code = isBoom(e) ? e.output?.statusCode : undefined;
      const msg = isBoom(e)
        ? e.output?.payload?.message
        : e?.message || String(e);
      console.error("❌ Falha ao conectar:", { code, msg });

      if (
        code === DisconnectReason.loggedOut ||
        code === 401 ||
        code === DisconnectReason.connectionReplaced ||
        code === 409
      ) {
        break;
      }

      const wait = backoff(attempt++);
      console.log(`⏳ Tentando reconectar em ${Math.round(wait / 1000)}s...`);
      await delay(wait);
    } finally {
      try {
        sock?.ev.removeAllListeners("connection.update");
      } catch {}
      try {
        sock?.ev.removeAllListeners("creds.update");
      } catch {}
    }
  }

  connecting = null;
  throw new Error(
    "Conexão encerrada. Verifique sessão/rede e inicie novamente."
  );
}
