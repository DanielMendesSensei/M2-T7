import { v4 as uuid4 } from "uuid";
import { fileURLToPath } from "url";

// LIDAR COM CAMINHOS DE PASTAS E ARQUIVOS
import path from "path";

// LIDAR COM ARQUIVOS DE FORMA ASSÍNCRONA
import fs, { appendFile } from "fs";
import fsPromises from "fs/promises";

// GARANTIR QUE CONSEGUIRMOS CAPTURAR O NOME DO ARQUIVO E A PASTA ONDE ELE SE ENCONTRA
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// LIB PARA FORMATAR DATAS
import { format } from "date-fns";

// CRIAR OU ATUALIZAR UM ARQUIVO DE LOGS
const logEvents = async (message, logFileName) => {
  // "2025-11-04   19:55:13"
  const dateTime = `${format(new Date(), "yyyy-MM-dd\tHH:mm:ss")}`;

  // "2025-11-04   19:55:13   ID   message"
  const finalLog = `${dateTime}\t${uuid4()}\t${message}\n`;

  try {
    // VERIFICA SE A PASTA LOGS EXISTE
    const logsDir = path.join(__dirname, "..", "logs");
    if (!fs.existsSync(logsDir)) {
      await fsPromises.mkdir(logsDir);
    }

    // CRIA AÍ UM ARQUIVO DENTRO DA PASTA LOGS, COM O NOME QUE VIER QUANDO A FUNÇÃO FOR CHAMADA E TACA O
    // CONTEÚDO QUE ESTRUTURAMOS EM FINALLOG
    await fsPromises.appendFile(path.join(logsDir, logFileName), finalLog);
  } catch (error) {
    console.log("Erro na função logEvents", error);
  }
};

// CRIAR UM MIDDLEWARE
export const logger = (req, res, next) => {
  logEvents(
    `${req.method}\t${req.body}\t${req.url}\t${req.headers.origin}`,
    "req.log"
  );
  next();
};
