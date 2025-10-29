import express from "express";

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// -----------------------------------------------------------------
// NOSSO "BANCO DE DADOS" EM MEMÓRIA
// (Isso será movido para o Controller)
// -----------------------------------------------------------------
let dbFilmes = [
  { id: 1, titulo: "O Poderoso Chefão", ano: 1972, genero: "Drama" },
  { id: 2, titulo: "Interestelar", ano: 2014, genero: "Ficção Científica" },
];
let proximoId = 3;

// -----------------------------------------------------------------
// ROTAS CRUD DE FILMES
// (Isso será dividido entre Rotas e Controladores)
// -----------------------------------------------------------------

// Rota raiz
app.get("/", (req, res) => {
  res.send("Bem-vindo à API Cinemateca (Versão Monolítica)!");
});

// GET /filmes - Listar todos os filmes
app.get("/filmes", (req, res) => {
  return res.status(200).json(dbFilmes);
});

// GET /filmes/:id - Buscar filme por ID
app.get("/filmes/:id", (req, res) => {
  const { id } = req.params;
  const filme = dbFilmes.find((f) => f.id === parseInt(id));

  if (!filme) {
    return res.status(404).json({ mensagem: "Filme não encontrado." });
  }
  return res.status(200).json(filme);
});

// POST /filmes - Criar um novo filme
app.post("/filmes", (req, res) => {
  const { titulo, ano, genero } = req.body;

  if (!titulo || !ano || !genero) {
    return res
      .status(400)
      .json({ mensagem: "Título, ano e gênero são obrigatórios." });
  }

  const novoFilme = {
    id: proximoId++,
    titulo,
    ano,
    genero,
  };

  dbFilmes.push(novoFilme);
  return res.status(201).json(novoFilme);
});

// PUT /filmes/:id - Atualizar um filme
app.put("/filmes/:id", (req, res) => {
  const { id } = req.params;
  const { titulo, ano, genero } = req.body;

  const index = dbFilmes.findIndex((f) => f.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ mensagem: "Filme não encontrado." });
  }

  // Atualiza apenas os campos fornecidos
  const filmeAtualizado = { ...dbFilmes[index], ...req.body };
  // Garante que o ID não seja alterado pelo body
  filmeAtualizado.id = parseInt(id);

  dbFilmes[index] = filmeAtualizado;

  return res.status(200).json(filmeAtualizado);
});

// DELETE /filmes/:id - Deletar um filme
app.delete("/filmes/:id", (req, res) => {
  const { id } = req.params;
  const index = dbFilmes.findIndex((f) => f.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ mensagem: "Filme não encontrado." });
  }

  dbFilmes.splice(index, 1);
  return res.status(204).send(); // 204 No Content
});

// -----------------------------------------------------------------
// INICIALIZAÇÃO DO SERVIDOR
// -----------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Servidor MONOLÍTICO rodando em http://localhost:${PORT}`);
});
