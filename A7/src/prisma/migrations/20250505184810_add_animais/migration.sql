-- CreateTable
CREATE TABLE "Animal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeGeral" TEXT NOT NULL,
    "nomeCientifico" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "familia" TEXT NOT NULL,
    "popEstimada" INTEGER NOT NULL,
    "listaVermelha" TEXT NOT NULL
);
