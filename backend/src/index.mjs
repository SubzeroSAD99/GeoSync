import express from "express";
import allRouter from "./routes/allRouter.mjs";
import initAll from "./models/initModels.mjs";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 9999;

app.use(
  cors({
    origin: "http://192.168.100.16:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/", allRouter);

app.listen(PORT, () => {
  initAll().then(() => {
    console.log("\x1b[32m✔\x1b[0m Banco de Dados Sincronizado Com Sucesso!");
    console.log(`\x1b[32m✔\x1b[0m Servidor Backend Rodando em ${PORT}.`);
  });
});
