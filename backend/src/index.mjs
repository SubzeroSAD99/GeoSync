import express from "express";
import employeeRouter from "./routes/employeeRouter.mjs";
import serviceRouter from "./routes/serviceRouter.mjs";
import mainRouter from "./routes/mainRouter.mjs";
import { authMiddleware } from "./middlewares/authorize.mjs";
import initAll from "./models/initModels.mjs";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 9999;

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

app.listen(PORT, () => {
  initAll().then(() => {
    console.log("\x1b[32m✔\x1b[0m Banco de Dados Sincronizado Com Sucesso!");
    console.log(`\x1b[32m✔\x1b[0m Servidor Backend Rodando em ${PORT}.`);
  });
});
