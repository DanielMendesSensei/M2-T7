# API de Animais - Lista Vermelha

API RESTful para gerenciamento de animais ameacados de extincao, utilizando classificacao da Lista Vermelha da IUCN.

## Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express 5** - Framework web
- **Prisma ORM** - Object-Relational Mapping
- **SQLite** - Banco de dados
- **JWT** - JSON Web Tokens para autenticacao
- **bcrypt** - Criptografia de senhas

## Estrutura do Projeto

```
src/
├── config/
│   └── jwtConfig.js        # Configuracoes do JWT
├── controller/
│   └── animal.controller.js # Controller de animais
├── middlewares/
│   └── logger.middleware.js # Middleware de logs
├── prisma/
│   ├── schema.prisma       # Schema do banco de dados
│   └── migrations/         # Migrations do Prisma
├── routes/
│   └── animal.routes.js    # Rotas de animais
├── services/
│   ├── Animal.service.js   # Service de animais
│   ├── Auth.service.js     # Service de autenticacao
│   └── User.service.js     # Service de usuarios
└── server.js               # Arquivo principal
```

## Configuracao do Ambiente

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Variaveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="file:./dev.db"
BACKEND_PORT=3000
JWT_SECRET=sua_chave_secreta_aqui
```

### 3. Executar Migrations

```bash
npm run prisma:migrate
```

### 4. Gerar Cliente Prisma

```bash
npm run prisma:generate
```

### 5. Iniciar o Servidor

```bash
# Desenvolvimento (com hot reload)
npm run dev

# Producao
npm start
```

## Scripts Disponiveis

| Script | Descricao |
|--------|-----------|
| `npm run dev` | Inicia servidor com nodemon |
| `npm start` | Inicia servidor em producao |
| `npm run prisma:migrate` | Executa migrations |
| `npm run prisma:generate` | Gera cliente Prisma |
| `npm run prisma:studio` | Abre interface grafica do banco |

## Schema do Banco de Dados

### Tabela Animal

| Campo | Tipo | Descricao |
|-------|------|-----------|
| id | Int | ID auto-incrementado |
| nomeGeral | String | Nome popular do animal |
| nomeCientifico | String | Nome cientifico |
| genero | String | Genero taxonomico |
| familia | String | Familia taxonomica |
| popEstimada | Int | Populacao estimada |
| listaVermelha | Enum | Nivel de ameaca |

### Tabela User

| Campo | Tipo | Descricao |
|-------|------|-----------|
| id | UUID | ID unico |
| username | String | Nome de usuario (unico) |
| password | String | Senha criptografada |
| user_type | Enum | Tipo: ADMIN ou NORMAL |

### Enum ListaVermelha

| Codigo | Significado |
|--------|-------------|
| EX | Extinto |
| EW | Extinto na Natureza |
| CR | Criticamente em Perigo |
| EN | Em Perigo |
| VU | Vulneravel |
| NT | Quase Ameacada |
| LC | Pouco Preocupante |
| DD | Dados Insuficientes |

## Endpoints Disponiveis

### Animais

| Metodo | Rota | Descricao |
|--------|------|-----------|
| GET | `/animal` | Lista todos os animais |
| POST | `/animal/cadastro` | Cadastra novo animal |
| PUT | `/animal/update/:id` | Atualiza animal |
| DELETE | `/animal/delete/:id` | Remove animal |

### Exemplo de Requisicoes

#### Listar Animais
```bash
GET /animal
```

**Resposta:**
```json
{
  "animais": [
    {
      "id": 1,
      "nomeGeral": "Onca-pintada",
      "nomeCientifico": "Panthera onca",
      "genero": "Panthera",
      "familia": "Felidae",
      "popEstimada": 15000,
      "listaVermelha": "NT"
    }
  ]
}
```

#### Cadastrar Animal
```bash
POST /animal/cadastro
Content-Type: application/json

{
  "nomeGeral": "Onca-pintada",
  "nomeCientifico": "Panthera onca",
  "genero": "Panthera",
  "familia": "Felidae",
  "PopEstimada": 15000,
  "NivelAmeaca": "Quase Ameacada"
}
```

**Resposta:**
```json
{
  "message": "Animal cadastrado com sucesso!",
  "animal": {
    "id": 1,
    "nomeGeral": "Onca-pintada",
    "nomeCientifico": "Panthera onca",
    "genero": "Panthera",
    "familia": "Felidae",
    "popEstimada": 15000,
    "listaVermelha": "NT"
  }
}
```

#### Atualizar Animal
```bash
PUT /animal/update/1
Content-Type: application/json

{
  "nomeGeral": "Onca-pintada",
  "nomeCientifico": "Panthera onca",
  "genero": "Panthera",
  "familia": "Felidae",
  "PopEstimada": 12000,
  "NivelAmeaca": "Vulneravel"
}
```

#### Deletar Animal
```bash
DELETE /animal/delete/1
```

## Arquitetura MVC

O projeto segue o padrao **Model-View-Controller**:

- **Model**: Definido no `schema.prisma` e gerenciado pelo Prisma ORM
- **View**: Respostas JSON da API
- **Controller**: Logica de negocio em `controller/`
- **Routes**: Definicao de rotas em `routes/`
- **Services**: Camada de acesso a dados em `services/`

## Middleware de Logger

O projeto inclui um middleware de logging que registra todas as requisicoes:

- Registra metodo HTTP, URL e origem
- Salva logs em arquivos na pasta `logs/`
- Formato: `DATA    HORA    UUID    MENSAGEM`

## Services Disponiveis

### Animal.service.js
- `getAllAnimals()` - Retorna todos os animais
- `createAnimal(data)` - Cria novo animal
- `deleteAnimal(id)` - Remove animal por ID
- `updateAnimalFull(id, data)` - Atualiza animal completo

### Auth.service.js
- `register(username, password, type)` - Registra novo usuario
- `authenticate({ username, password })` - Autentica e retorna token JWT

### User.service.js
- `findByUsername(username)` - Busca usuario por nome
- `createUser({ username, password, type })` - Cria usuario no banco

---

## Atividades para Implementacao

As seguintes funcionalidades estao preparadas nos services mas precisam ser expostas via rotas e controllers:

### Atividade 1: Rotas de Autenticacao

**Objetivo:** Criar endpoints para registro e login de usuarios.

**Arquivos a criar:**
- `src/routes/auth.routes.js`
- `src/controller/auth.controller.js`

**Requisitos:**
- POST `/auth/register` - Registrar novo usuario
- POST `/auth/login` - Autenticar usuario e retornar token

**Dica:** Utilize o `Auth.service.js` que ja possui os metodos `register` e `authenticate`.

---

### Atividade 2: Middleware de Autenticacao JWT

**Objetivo:** Criar middleware para proteger rotas que requerem autenticacao.

**Arquivo a criar:**
- `src/middlewares/auth.middleware.js`

**Requisitos:**
- Verificar token no header `Authorization: Bearer <token>`
- Decodificar token e adicionar usuario em `req.user`
- Retornar erro 401 se token invalido ou ausente

**Dica:** Utilize o `jwtConfig.js` para obter a chave secreta.

---

### Atividade 3: Proteger Rotas de Animais

**Objetivo:** Aplicar o middleware de autenticacao nas rotas de animais.

**Arquivo a modificar:**
- `src/routes/animal.routes.js`

**Requisitos:**
- Rotas POST, PUT e DELETE devem exigir autenticacao
- Rota GET pode ser publica

---

### Atividade 4: Endpoint GET por ID

**Objetivo:** Criar endpoint para buscar um animal especifico.

**Arquivos a modificar:**
- `src/routes/animal.routes.js`
- `src/controller/animal.controller.js`
- `src/services/Animal.service.js`

**Requisitos:**
- GET `/animal/:id` - Retornar animal por ID
- Retornar 404 se animal nao encontrado

---

### Atividade 5: Tratamento de Erros

**Objetivo:** Adicionar tratamento de erros robusto nos controllers.

**Arquivos a modificar:**
- `src/controller/animal.controller.js`

**Requisitos:**
- Envolver operacoes em try/catch
- Retornar mensagens de erro apropriadas
- Usar status HTTP corretos (400, 404, 500)

---

### Atividade 6: Middleware de Erro Global

**Objetivo:** Criar middleware centralizado para tratamento de erros.

**Arquivo a criar:**
- `src/middlewares/error.middleware.js`

**Requisitos:**
- Capturar erros nao tratados
- Logar erros usando `logEvents`
- Retornar resposta padronizada de erro

---

### Atividade 7: Rotas de Usuario (Bonus)

**Objetivo:** Criar endpoints para gerenciamento de usuarios.

**Arquivos a criar:**
- `src/routes/user.routes.js`
- `src/controller/user.controller.js`

**Requisitos:**
- GET `/user/profile` - Retornar dados do usuario logado
- PUT `/user/profile` - Atualizar dados do usuario
- Apenas usuarios ADMIN podem listar todos usuarios

---

## Criterios de Avaliacao

| Criterio | Pontos |
|----------|--------|
| Funcionalidade correta | 40% |
| Arquitetura MVC | 20% |
| Tratamento de erros | 20% |
| Boas praticas (codigo limpo, .env) | 20% |

---

## Recursos Uteis

- [Documentacao Express](https://expressjs.com/)
- [Documentacao Prisma](https://www.prisma.io/docs)
- [JWT.io](https://jwt.io/)
- [HTTP Status Codes](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status)
