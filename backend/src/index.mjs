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

import { authenticate } from "./middlewares/authMiddleware.mjs";
import initAll from "./models/initModels.mjs";
import cors from "cors";
import cookieParser from "cookie-parser";
import { startSock } from "./services/whatsappServices.mjs";
import path from "path";

const app = express();
const PORT = 9999;

startSock().catch(console.error);

app.use(
  cors({
    origin: "http://192.168.100.141:5173",
    credentials: true,
  })
);

app.use(express.static(path.join(import.meta.dirname, "public")));

app.use(cookieParser());
app.use(express.json());

app.use("/", mainRouter);

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

app.listen(PORT, () => {
  initAll().then(() => {
    console.log("\x1b[32m✔\x1b[0m Banco de Dados Sincronizado com Sucesso!");
    console.log(`\x1b[32m✔\x1b[0m Servidor Backend Rodando em ${PORT}.`);
  });
});
