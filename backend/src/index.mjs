import express from "express";
import allRouter from "./routes/allRouter.mjs";
import initAll from "./models/initModels.mjs";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/", allRouter);

app.listen(PORT, () => {
  initAll().then(() => {
    console.log("Banco de Dados Sincronizado Com Sucesso!");
    console.log(`Servidor Backend Rodando em ${PORT}.`);
  });
});
