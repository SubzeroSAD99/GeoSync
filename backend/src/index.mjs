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
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import { startSock } from "./services/whatsappServices.mjs";
import path from "path";
import MercadoPagoClient from "./config/MercadoPagoClient.mjs";
import MercadoPagoController from "./controllers/MercadoPagoController.mjs";
import SocketServer from "./sockets/SocketServer.mjs";

const app = express();
const PORT = 9999;

startSock().catch(console.error);

const corsOrigins = "http://192.168.100.141:5173";

app.disable("x-powered-by");
app.use(compression());
app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
  })
);

app.use(express.static(path.join(import.meta.dirname, "public")));

app.post(
  "/payment/webhookMp",
  express.raw({ type: "application/json" }),
  MercadoPagoController.webhook
);

app.use(cookieParser());
app.use(express.json());

app.use("/", mainRouter);
app.use("/payment", paymentRouter);

app.use(authenticate);
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

SocketServer.init(server, { corsOrigins });

server.listen(PORT, async () => {
  await initAll();
  console.log("\x1b[32m✔\x1b[0m Banco de Dados Sincronizado com Sucesso!");

  await MercadoPagoClient.init();
  console.log("\x1b[32m✔\x1b[0m MercadoPago Configurado com Sucesso!");

  console.log(`\x1b[32m✔\x1b[0m Servidor Backend Rodando em ${PORT}.`);
});
