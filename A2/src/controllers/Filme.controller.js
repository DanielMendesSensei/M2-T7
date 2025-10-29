let dbFilmes = [
  { id: 1, titulo: "O Poderoso Chefão", ano: 1972, genero: "Drama" },
  { id: 2, titulo: "Interestelar", ano: 2014, genero: "Ficção Científica" },
];
let proximoId = 3;

class FilmeController {
  listarTodos(req, res) {
    return res.status(200).json(dbFilmes);
  }

  buscarPorId(req, res) {
    // PEGA O ID PELA URL ATRAVÉS DE PARÂMETROS
    const { id } = req.params;
    // COM BASE NESSE ID, FILTRA O FILME NO BANCO
    const filme = dbFilmes.find((value) => value.id === parseInt(id));

    if (!filme) {
      return res.status(404).json({ mensagem: "Filme não encontrado" });
    }

    return res.status(200).json(filme);
  }
}

// Singleton
export default new FilmeController();
