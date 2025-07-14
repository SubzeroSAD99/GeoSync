import express from "express";
import employeeRouter from "./routes/employeeRouter.mjs";
import serviceRouter from "./routes/serviceRouter.mjs";
import mainRouter from "./routes/mainRouter.mjs";
import municipalityRouter from "./routes/municipalityRouter.mjs";
import { authMiddleware } from "./middlewares/authorize.mjs";
import initAll from "./models/initModels.mjs";
import cors from "cors";
import cookieParser from "cookie-parser";
import { startSock } from "./services/whatsappServices.mjs";

const app = express();
const PORT = 9999;

startSock().catch(console.error);

app.use(
  cors({
    origin: "http://192.168.100.32:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/", mainRouter);

app.use(authMiddleware);
app.use("/service", serviceRouter);
app.use("/employee", employeeRouter);
app.use("/municipality", municipalityRouter);

app.listen(PORT, () => {
  initAll().then(() => {
    console.log("\x1b[32m✔\x1b[0m Banco de Dados Sincronizado com Sucesso!");
    console.log(`\x1b[32m✔\x1b[0m Servidor Backend Rodando em ${PORT}.`);
  });
});
