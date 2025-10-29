import { Router } from "express";
import FilmeController from "../controllers/Filme.controller.js";

const filmes = Router();

// Rota raiz
filmes.get("/", (req, res) => {
  res.send("Bem-vindo à API Cinemateca (Versão Monolítica)!");
});

// GET /filmes - Listar todos os filmes
filmes.get("/filmes", FilmeController.listarTodos);

// GET /filmes/:id - Buscar filme por ID
filmes.get("/filmes/:id", FilmeController.buscarPorId);

// // POST /filmes - Criar um novo filme
// filme.post("/filmes", (req, res) => {
//   const { titulo, ano, genero } = req.body;

//   if (!titulo || !ano || !genero) {
//     return res
//       .status(400)
//       .json({ mensagem: "Título, ano e gênero são obrigatórios." });
//   }

//   const novoFilme = {
//     id: proximoId++,
//     titulo,
//     ano,
//     genero,
//   };

//   dbFilmes.push(novoFilme);
//   return res.status(201).json(novoFilme);
// });

// // PUT /filmes/:id - Atualizar um filme
// filme.put("/filmes/:id", (req, res) => {
//   const { id } = req.params;
//   const { titulo, ano, genero } = req.body;

//   const index = dbFilmes.findIndex((f) => f.id === parseInt(id));

//   if (index === -1) {
//     return res.status(404).json({ mensagem: "Filme não encontrado." });
//   }

//   // Atualiza apenas os campos fornecidos
//   const filmeAtualizado = { ...dbFilmes[index], ...req.body };
//   // Garante que o ID não seja alterado pelo body
//   filmeAtualizado.id = parseInt(id);

//   dbFilmes[index] = filmeAtualizado;

//   return res.status(200).json(filmeAtualizado);
// });

// // DELETE /filmes/:id - Deletar um filme
// filme.delete("/filmes/:id", (req, res) => {
//   const { id } = req.params;
//   const index = dbFilmes.findIndex((f) => f.id === parseInt(id));

//   if (index === -1) {
//     return res.status(404).json({ mensagem: "Filme não encontrado." });
//   }

//   dbFilmes.splice(index, 1);
//   return res.status(204).send(); // 204 No Content
// });

export default filmes;
