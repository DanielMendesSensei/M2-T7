# API com Prisma ORM, JWT e Paginação

## Migração de Sequelize para Prisma

Este projeto foi migrado de **Sequelize** para **Prisma ORM** para melhor experiência de desenvolvimento e facilidade de ensino.

### Por que Prisma?

- **Type-safe**: Cliente totalmente tipado (mesmo em JavaScript)
- **Intuitivo**: API mais limpa e legível
- **Migrations**: Sistema de migração robusto e confiável
- **Prisma Studio**: Interface visual para visualizar dados
- **Melhor DX**: Autocomplete, validações e erros mais claros

## Stack Tecnológica

- **Node.js** + **Express** 
- **Prisma ORM** (SQLite)
- **JWT** para autenticação
- **Zod** para validação
- **Bcrypt** para hash de senhas

## Estrutura do Projeto

```
src/
├── config/
│   ├── jwt.js              # Configuração JWT
│   └── prisma.js           # Cliente Prisma (singleton)
├── controllers/
│   ├── authController.js   # Autenticação
│   ├── userController.js   # Usuários
│   └── postController.js   # Posts
├── services/
│   ├── authService.js      # Lógica de autenticação
│   ├── userService.js      # Lógica de usuários
│   └── postService.js      # Lógica de posts
├── middlewares/
│   ├── authenticate.js     # Middleware JWT
│   ├── validate.js         # Validação Zod
│   └── logger.js           # Logger de requisições
├── validations/
│   ├── authValidation.js   # Validações de auth
│   ├── userValidation.js   # Validações de user
│   └── postValidation.js   # Validações de post
├── routes/
│   ├── authRoutes.js       # Rotas de autenticação
│   ├── userRoutes.js       # Rotas de usuários
│   ├── postRoutes.js       # Rotas de posts
│   └── index.js            # Agregador de rotas
├── generated/
│   └── prisma/             # Prisma Client gerado (não editar!)
└── server.js               # Servidor Express

prisma/
├── schema.prisma           # Schema do Prisma (models definidos aqui!)
└── migrations/             # Histórico de migrações

database/
└── database.sqlite         # Banco SQLite
```

**Nota importante**: Com Prisma, **não existe pasta `model/`**! Os modelos são definidos no arquivo `prisma/schema.prisma` e o Prisma Client é gerado automaticamente.

## Schema Prisma

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  age       Int?
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  posts     Post[]

  @@map("users")
}

model Post {
  id          Int      @id @default(autoincrement())
  title       String
  content     String?
  tags        String?
  isPublished Boolean  @default(false)
  userId      Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("posts")
  @@index([userId])
}
```

## Configuração

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

```env
# Database
DATABASE_URL="file:./database/database.sqlite"

# Application
NODE_ENV=development
PORT=3000

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Logging
LOG_LEVEL=info
```

### 3. Executar Migrações

```bash
# Aplicar migrações existentes
npx prisma migrate dev

# Ou criar nova migração
npx prisma migrate dev --name nome_da_migracao

# Visualizar banco de dados
npx prisma studio
```

### 4. Gerar Prisma Client

```bash
npx prisma generate
```

### 5. Iniciar Servidor

```bash
npm run dev
```

## Comandos Prisma Úteis

```bash
# Gerar Prisma Client
npx prisma generate

# Criar e aplicar migração
npx prisma migrate dev --name nome_da_migracao

# Aplicar migrações em produção
npx prisma migrate deploy

# Resetar banco de dados (DEV ONLY!)
npx prisma migrate reset

# Abrir Prisma Studio (GUI)
npx prisma studio

# Formatar schema
npx prisma format

# Validar schema
npx prisma validate
```

## Exemplos de Uso do Prisma

### Criar Usuário

```javascript
const user = await prisma.user.create({
  data: {
    name: "João Silva",
    email: "joao@email.com",
    password: hashedPassword,
    age: 25,
  },
});
```

### Buscar com Relações

```javascript
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    posts: {
      orderBy: { createdAt: "desc" },
    },
  },
});
```

### Paginação

```javascript
const [users, count] = await Promise.all([
  prisma.user.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" },
  }),
  prisma.user.count(),
]);
```

### Atualizar

```javascript
const user = await prisma.user.update({
  where: { id: 1 },
  data: { name: "Novo Nome" },
});
```

### Deletar

```javascript
await prisma.user.delete({
  where: { id: 1 },
});
```

### Transações

```javascript
await prisma.$transaction([
  prisma.user.create({ data: userData }),
  prisma.post.create({ data: postData }),
]);
```

## API Endpoints

### Autenticação (Públicos)

```bash
POST /api/auth/register  # Registrar
POST /api/auth/login     # Login
```

### Autenticação (Protegidos)

```bash
POST /api/auth/refresh   # Refresh token
GET  /api/auth/profile   # Ver perfil
```

### Usuários (Protegidos)

```bash
GET    /api/users        # Listar (paginado)
GET    /api/users/:id    # Buscar por ID
POST   /api/users        # Criar
PUT    /api/users/:id    # Atualizar
DELETE /api/users/:id    # Deletar
```

### Posts (Protegidos)

```bash
GET   /api/posts              # Listar (paginado)
GET   /api/posts/:id          # Buscar por ID
POST  /api/posts              # Criar
PUT   /api/posts/:id          # Atualizar
PATCH /api/posts/:id/toggle-publish  # Publicar/Despublicar
DELETE /api/posts/:id         # Deletar
```

## Exemplo de Requisição

### Registro

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "password": "senha123",
    "age": 25
  }'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@email.com",
    "password": "senha123"
  }'
```

### Listar Usuários (com token)

```bash
curl -X GET "http://localhost:3000/api/users?page=1&limit=10" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## Diferenças: Sequelize vs Prisma

### Sequelize (Antes)

```javascript
// Definir modelo
const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
});

// Query
const users = await User.findAll({
  include: ['posts'],
  limit: 10,
  offset: 0,
});
```

### Prisma (Agora)

```javascript
// Schema em schema.prisma
model User {
  name  String
  email String
  posts Post[]
}

// Query
const users = await prisma.user.findMany({
  include: { posts: true },
  take: 10,
  skip: 0,
});
```

## Vantagens do Prisma

1. **Schema Declarativo**: Mais legível e fácil de entender
2. **Type Safety**: Cliente totalmente tipado
3. **Migrations**: Sistema mais robusto e confiável
4. **Prisma Studio**: Interface visual integrada
5. **Melhor Performance**: Queries otimizadas
6. **Sem Modelos**: Não precisa definir modelos em JavaScript
7. **Autocomplete**: Melhor experiência no editor

## Segurança

- Senhas hashadas com bcrypt
- Tokens JWT com expiração
- Validação com Zod
- Proteção de rotas com middleware
- Senhas nunca retornadas nas respostas

## Desenvolvimento

```bash
# Modo desenvolvimento com watch
npm run dev

# Ver logs do banco
npx prisma studio

# Validar schema
npx prisma validate
```

## Produção

```bash
# Build (se necessário)
npm run build

# Aplicar migrações
npx prisma migrate deploy

# Iniciar
npm start
```

## Troubleshooting

### Erro: Prisma Client não encontrado

```bash
npx prisma generate
```

### Erro: Migration pendente

```bash
npx prisma migrate dev
```

### Resetar banco de dados

```bash
npx prisma migrate reset --force
```

### Ver estrutura do banco

```bash
npx prisma studio
```

## Recursos

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
- [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate)
