import express from "express";
import filmes from "./routes/filme.route.js";

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

app.use(filmes);

// -----------------------------------------------------------------
// INICIALIZAÇÃO DO SERVIDOR
// -----------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Servidor MONOLÍTICO rodando em http://localhost:${PORT}`);
});
