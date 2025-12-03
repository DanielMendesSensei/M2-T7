# Analise do Projeto - API de Animais

## Resumo

Este documento apresenta uma analise completa do projeto, identificando problemas criticos, funcionalidades faltantes e sugestoes de melhorias.

---

## Problemas Criticos (Bugs)

### 1. `ListaVermelhaENUM` nao esta definido no Controller

**Arquivo:** `src/controller/animal.controller.js`

**Problema:** O controller utiliza `ListaVermelhaENUM` nas funcoes `cadastraAnimal` e `atualizaAnimal`, porem esse objeto nunca foi importado ou definido no arquivo.

```javascript
// Linha 36 e 95 - ListaVermelhaENUM nao existe
const codigoEncontrado = Object.keys(ListaVermelhaENUM).find(
  (key) => ListaVermelhaENUM[key] === NivelAmeaca
);
```

**Solucao:** Criar e importar o enum `ListaVermelhaENUM`:

```javascript
// Adicionar no topo do arquivo ou em um arquivo separado de constantes
const ListaVermelhaENUM = {
  EX: "Extinto",
  EW: "Extinto na Natureza",
  CR: "Criticamente em Perigo",
  EN: "Em Perigo",
  VU: "Vulneravel",
  NT: "Quase Ameacada",
  LC: "Pouco Preocupante",
  DD: "Dados Insuficientes",
};
```

---

### 2. Parametro incorreto no Service de Animal

**Arquivo:** `src/services/Animal.service.js`

**Problema:** O controller envia `codigoEncontrado`, mas o service espera `ListaVermelha`.

**Controller envia:**
```javascript
await createAnimal({
  nomeGeral,
  nomeCientifico,
  genero,
  familia,
  PopEstimada,
  codigoEncontrado,  // <-- nome do campo
});
```

**Service espera:**
```javascript
export async function createAnimal(data) {
  const created = await prisma.animal.create({
    data: {
      // ...
      listaVermelha: data.ListaVermelha,  // <-- campo errado (ListaVermelha)
    },
  });
}
```

**Solucao:** Alterar o service para usar `data.codigoEncontrado`:
```javascript
listaVermelha: data.codigoEncontrado,
```

---

### 3. Tipo de ID inconsistente no Delete

**Arquivo:** `src/services/Animal.service.js`

**Problema:** O `id` vindo de `req.params` e uma string, mas o Prisma espera um numero inteiro.

```javascript
// Controller - id e string
const { id } = req.params;
const animal = await deleteAnimal(id);

// Service - Prisma espera Int
const existing = await prisma.animal.findUnique({ where: { id } });
```

**Solucao:** Converter o ID para inteiro no controller ou service:
```javascript
const animal = await deleteAnimal(parseInt(id));
```

---

### 4. Tipo de ID inconsistente no Update

**Arquivo:** `src/services/Animal.service.js`

**Problema:** Mesmo problema do delete - o ID precisa ser convertido para inteiro.

**Solucao:** Converter o ID para inteiro:
```javascript
const updated = await updateAnimalFull(parseInt(id), {...});
```

---

### 5. Falta `return` nas validacoes do Controller

**Arquivo:** `src/controller/animal.controller.js`

**Problema:** Nas funcoes `cadastraAnimal` e `atualizaAnimal`, quando a validacao falha, o codigo continua executando porque falta o `return`.

```javascript
// Problema - sem return
if (!nomeGeral || !nomeCientifico || ...) {
  res.status(400).json({ message: "Voce deve fornecer todos os campos" });
}
// Codigo continua executando...
```

**Solucao:** Adicionar `return` antes do `res.status()`:
```javascript
if (!nomeGeral || !nomeCientifico || ...) {
  return res.status(400).json({ message: "Voce deve fornecer todos os campos" });
}
```

---

### 6. Campo `user_type` incorreto no User.service.js

**Arquivo:** `src/services/User.service.js`

**Problema:** O metodo `createUser` recebe `type` mas o schema Prisma espera `user_type`.

```javascript
// Service recebe 'type'
async createUser({ username, password, type }) {
  return this.prisma.user.create({
    data: { username, password, type },  // <-- deveria ser user_type
  });
}
```

**Solucao:** Alterar para `user_type`:
```javascript
data: { username, password, user_type: type },
```

---

## Funcionalidades Faltantes

### 1. Rotas de Autenticacao (Auth Routes)

O projeto possui `Auth.service.js` com metodos `register` e `authenticate`, mas:
- Nao existe `auth.routes.js`
- Nao existe `auth.controller.js`
- As rotas nao estao registradas no `server.js`

**Arquivos necessarios:**
- `src/routes/auth.routes.js`
- `src/controller/auth.controller.js`

---

### 2. Rotas de Usuario (User Routes)

O projeto possui `User.service.js`, mas:
- Nao existe `user.routes.js`
- Nao existe `user.controller.js`

**Arquivos necessarios:**
- `src/routes/user.routes.js`
- `src/controller/user.controller.js`

---

### 3. Middleware de Autenticacao JWT

O projeto possui configuracao JWT (`jwtConfig.js`) e gera tokens no `Auth.service.js`, mas:
- Nao existe middleware para verificar o token nas rotas protegidas
- As rotas de animal nao estao protegidas

**Arquivo necessario:**
- `src/middlewares/auth.middleware.js`

Exemplo de implementacao:
```javascript
import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwtConfig.js";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: "Token nao fornecido" });
  }
  
  const [, token] = authHeader.split(" ");
  
  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalido" });
  }
}
```

---

### 4. Arquivo .env.example

Falta um arquivo `.env.example` para documentar as variaveis de ambiente necessarias.

**Conteudo sugerido:**
```env
DATABASE_URL="file:./dev.db"
BACKEND_PORT=3000
JWT_SECRET=sua_chave_secreta_aqui
```

---

### 5. README.md

Nao existe documentacao do projeto.

**Conteudo sugerido:**
- Descricao do projeto
- Como instalar dependencias
- Como configurar variaveis de ambiente
- Como rodar as migrations
- Como iniciar o servidor
- Documentacao dos endpoints

---

### 6. Tratamento de Erros Global

Nao existe um middleware para tratamento de erros global.

**Arquivo necessario:**
- `src/middlewares/error.middleware.js`

---

### 7. Try/Catch nos Controllers

Os metodos do controller nao possuem tratamento de erros adequado.

```javascript
// Exemplo de como deveria ser:
async getAnimais(req, res) {
  try {
    const animais = await getAllAnimals();
    res.status(200).json({ animais });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar animais", error: error.message });
  }
}
```

---

### 8. Endpoint GET por ID

Falta endpoint para buscar um animal especifico por ID.

---

### 9. node_modules no .gitignore

O `.gitignore` esta incompleto.

**Adicionar:**
```ignore
node_modules/
*.log
logs/
.env
prisma/*.db
prisma/*.db-journal
```

---

## Sugestoes de Melhorias

### 1. Estrutura de Pastas
Adicionar:
- `src/constants/` - para enums e constantes
- `src/utils/` - para funcoes utilitarias
- `src/validators/` - para validacoes de entrada

### 2. Validacao de Dados
Usar biblioteca como `zod` ou `joi` para validacao de dados de entrada.

### 3. Documentacao de API
Implementar Swagger/OpenAPI para documentacao automatica dos endpoints.

### 4. Testes
Adicionar testes unitarios e de integracao com Jest.

---

## Lista de Tarefas (Checklist)

- [ ] Criar e importar `ListaVermelhaENUM` no controller
- [ ] Corrigir parametro `ListaVermelha` para `codigoEncontrado` no service
- [ ] Converter ID para inteiro nos metodos delete e update
- [ ] Adicionar `return` nas validacoes do controller
- [ ] Corrigir campo `type` para `user_type` no User.service.js
- [ ] Criar `auth.routes.js` e `auth.controller.js`
- [ ] Criar middleware de autenticacao JWT
- [ ] Criar `.env.example`
- [ ] Criar `README.md`
- [ ] Atualizar `.gitignore`
- [ ] Adicionar tratamento de erros nos controllers
- [ ] Criar endpoint GET por ID
- [ ] Adicionar middleware de erro global

---

## Conclusao

O projeto possui uma base solida com Express, Prisma e estrutura MVC, porem apresenta varios bugs criticos que impedem o funcionamento correto da API. Os principais problemas sao:

1. **Enum nao definido** - impede cadastro e atualizacao de animais
2. **Parametros inconsistentes** - dados nao sao salvos corretamente
3. **Tipos de ID incorretos** - operacoes de delete e update falham
4. **Falta de return nas validacoes** - respostas duplicadas

Alem disso, funcionalidades importantes como autenticacao e rotas de usuario estao parcialmente implementadas nos services, mas nao expostas via rotas.
