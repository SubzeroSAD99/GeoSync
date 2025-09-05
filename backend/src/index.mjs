import http from "http";
import express from "express";

// Routers
import employeeRouter from "./routes/employeeRouter.mjs";
import serviceRouter from "./routes/serviceRouter.mjs";
import mainRouter from "./routes/mainRouter.mjs";
import municipalityRouter from "./routes/municipalityRouter.mjs";
import clientRouter from "./routes/clientRouter.mjs";
import equipmentRouter from "./routes/equipmentRouter.mjs";
import vehicleRouter from "./routes/vehicleRouter.mjs";
import financialRouter from "./routes/financialRouter.mjs";
import serviceTypeRouter from "./routes/serviceTypeRouter.mjs";
import budgetRouter from "./routes/budgetRouter.mjs";
import fileRouter from "./routes/fileRouter.mjs";
import paymentRouter from "./routes/paymentRouter.mjs";

import { authenticate } from "./middlewares/authMiddleware.mjs";
import initAll from "./models/initModels.mjs";
import { startSock } from "./services/whatsappServices.mjs";
import path from "path";
import MercadoPagoClient from "./config/MercadoPagoClient.mjs";
import MercadoPagoController from "./controllers/MercadoPagoController.mjs";
import SocketServer from "./sockets/SocketServer.mjs";

import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import rateLimit, { ipKeyGenerator } from "express-rate-limit";

const app = express();
const PORT = 9999;

startSock().catch(console.error);

const ORIGINS = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// Funções utilitárias
const SKIP_PATHS = new Set(["/payment/webhookMp"]);
const shouldSkip = (req) =>
  req.method === "OPTIONS" ||
  req.path.startsWith("/socket.io") ||
  SKIP_PATHS.has(req.path);

const limitHandler = (req, res, _next, options) => {
  const origin = req.headers.origin;
  if (origin && ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }

  res.setHeader("Retry-After", Math.ceil(options.windowMs / 1000));
  return res.status(options.statusCode).json({
    msg: "Muitas requisições, tente novamente mais tarde.",
  });
};

const publicLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 60, // 60 req/min por IP
  standardHeaders: true,
  legacyHeaders: false,
  skip: shouldSkip,
  handler: limitHandler,
  skipSuccessfulRequests: true,
});

const privateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 600,
  standardHeaders: true,
  legacyHeaders: false,
  skip: shouldSkip,
  handler: limitHandler,
  // IMPORTANTE: normalizar IPv6 usando o helper
  keyGenerator: (req, res) => {
    // se tiver usuário autenticado, limite por usuário
    if (req.user?.id) return `user:${req.user.id}`;

    // fallback por IP, mas com máscara IPv6 via helper
    const IPV6_SUBNET = 64;
    return ipKeyGenerator(req.ip, IPV6_SUBNET);
  },
});

app.disable("x-powered-by");
app.use(compression());
app.set("trust proxy", 1);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true); // permite requests sem origin (ex: curl, Postman)
      if (ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
  })
);

// responder preflight
app.use((req, res, next) => {
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "connect-src": ["'self'", ...ORIGINS],
      },
    },
    crossOriginResourcePolicy: { policy: "same-site" },
  })
);
app.use(hpp());

app.use(
  express.static(path.join(import.meta.dirname, "public"), {
    maxAge: "7d",
    immutable: true,
    index: false,
  })
);

app.post(
  "/payment/webhookMp",
  express.raw({ type: "application/json", limit: "200kb" }),
  MercadoPagoController.webhook
);

app.use(publicLimiter);

app.use(cookieParser());
app.use(express.json());

app.use("/", mainRouter);
app.use("/payment", paymentRouter);

app.use(authenticate);

app.use(privateLimiter);

app.use("/service", serviceRouter);
app.use("/employee", employeeRouter);
app.use("/municipality", municipalityRouter);
app.use("/client", clientRouter);
app.use("/equipment", equipmentRouter);
app.use("/vehicle", vehicleRouter);
app.use("/financial", financialRouter);
app.use("/serviceType", serviceTypeRouter);
app.use("/budget", budgetRouter);
app.use("/file", fileRouter);

const server = http.createServer(app);

SocketServer.init(server, { corsOrigins: ORIGINS });

server.listen(PORT, async () => {
  await initAll();
  console.log("\x1b[32m✔\x1b[0m Banco de Dados Sincronizado com Sucesso!");

  await MercadoPagoClient.init();
  console.log("\x1b[32m✔\x1b[0m MercadoPago Configurado com Sucesso!");

  console.log(`\x1b[32m✔\x1b[0m Servidor Backend Rodando em ${PORT}.`);
});
