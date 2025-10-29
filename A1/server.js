import express from "express";

// CRIA UMA INSTÂNCIA DO EXPRESS
const app = express();

// PERMITE QUE A GENTE TRABALHE COM COMUNICAÇÃO JSON -> ESSE CARA TEM UM NOME
app.use(express.json());

// CRIANDO UM RECURSO NO SERVIDOR -> ROTAS(PATH/CAMINHO DO RECURSO), TAMBÉM CHAMADO DE ENDPOINT
// RECURSO DO TIPO GET
app.get("/", (req, res) => {
  res.json({
    message: "Olá, seja bem vindo",
    data: new Date().toLocaleString("pt-BR"),
  });
});

// ABRINDO O SERVIDOR
app.listen(3000, () => {
  console.log(`SERVIDOR ESTÁ RODANDO NA PORTA 3000`);
});
