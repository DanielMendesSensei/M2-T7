import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllAnimals() {
  const rows = await prisma.animal.findMany();
  return rows;
}

export async function createAnimal(data) {
  const created = await prisma.animal.create({
    data: {
      nomeGeral: data.nomeGeral,
      nomeCientifico: data.nomeCientifico,
      genero: data.genero,
      familia: data.familia,
      popEstimada: data.PopEstimada,
      listaVermelha: data.codigoEncontrado,
    },
  });
  return created;
}

export async function deleteAnimal(id) {
  const existing = await prisma.animal.findUnique({ where: { id } });
  if (!existing) return null;

  const del = await prisma.animal.delete({ where: { id } });

  return del;
}

export async function updateAnimalFull(id, data) {
  const updated = await prisma.animal.update({
    where: { id },
    data: {
      nomeGeral: data.nomeGeral,
      nomeCientifico: data.nomeCientifico,
      genero: data.genero,
      familia: data.familia,
      popEstimada: data.PopEstimada,
      listaVermelha: data.codigoEncontrado,
    },
  });
  return updated;
}
