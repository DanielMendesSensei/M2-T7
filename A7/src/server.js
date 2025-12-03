import express from "express";
import { logEvents, logger } from "./middlewares/logger.middleware.js";
import animal from "./routes/animal.routes.js";
import dotenv from "dotenv";

// Iniciamos antes de tudo
dotenv.config();

const app = express();
const PORT = process.env.BACKEND_PORT || 3000;

// MIDDLEWARE
app.use(logger);
app.use(express.json()); // PARSE DO JSON

// AS ROTAS
app.use("/animal", animal);

app.listen(PORT, async () => {
  logEvents(`Servidor rodando na porta ${PORT}`, "listen.log");
});
