import { v4 as uuid4 } from "uuid";
import { fileURLToPath } from "url";

// FORMATAR DATAS
import { format } from "date-fns";

// LIDA COM CAMINHOS DE PASTA E ARQUIVOS
import path from "path";

// LIDA COM ARQUIVOS DE FORMA SÍNCRONA
import fs from "fs";

// LIDA COM ARQUIVOS DE FORMA ASSINCRONA
import fsPromises from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Criar ou atualizar um arquivo de logs, com uma mensagem específica.
const logEvents = async (message, logFileName) => {
  // "2025-04-16     16:30:12"
  const dateTime = `${format(new Date(), "yyyy-MM-dd\tHH:mm:ss")}`;
  // "2025-04-16    16:30:12   id   message"
  const logItem = `${dateTime}\t${uuid4()}\t${message}\n`;

  try {
    // VERIFICA SE O DIRETÓRIO DE LOG JÁ EXISTE, SE NÃO EXISTIR ELE CRIA
    const logsDir = path.join(__dirname, "..", "logs");
    if (!fs.existsSync(logsDir)) {
      await fsPromises.mkdir(logsDir);
    }

    // CRIAR O ARQUIVO NO DIRETÓRIO -> logs/nomedoarquivo.log
    // E VAI ESCREVER DENTRO DELE AS INFORMAÇÕES DE logItem
    await fsPromises.appendFile(path.join(logsDir, logFileName), logItem);
  } catch (err) {
    console.log("Erro na função LogEvents", err);
  }
};

// É UM MIDDLEWARE QUE VAI OLHAR AS REQUISIÇÕES E VAI REGISTRAR COMO LOG
const logger = (req, res, next) => {
  //   logEvents("Olá, estou passando antes da API", "Log_de_requisicao.log");
  logEvents(
    `${req.method}\t${req.url}\t${req.headers.origin}`,
    "Log_de_requisicao.log"
  );
  next();
};

export { logger, logEvents };
