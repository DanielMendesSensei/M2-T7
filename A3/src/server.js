import express from "express";
import { logger } from "./middlewares/logger.middleware.js";

const app = express();
const PORT = 3000;

app.use(logger);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Servidor Vivo!" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
