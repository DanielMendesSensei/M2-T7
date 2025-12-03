import express from "express";
import dotenv from "dotenv";
import { logger } from "./middlewares/logger.js";
import routes from "./routes/index.js";
import prisma from "./config/prisma.js";
import { globalLimiter } from "./middlewares/ratelimit.middleware.js";
import swaggerUI from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(logger);
app.use(express.json());
app.use(globalLimiter);

// Swagger Documentation
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec, {
    explorer: true,
    customSiteTitle: "Aula 7",
  })
);

// Routes
app.use("/", routes);

// ==============================================
// FUNÇÃO DE TESTE
// ==============================================

/**
 * Testa a conexão com o banco de dados Prisma
 */
async function testDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log("✅ Database connection successful!");

    // Conta total de registros
    const userCount = await prisma.user.count();
    const postCount = await prisma.post.count();

    console.log(`📊 Database stats:`);
    console.log(`   - Users: ${userCount}`);
    console.log(`   - Posts: ${postCount}`);

    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    return false;
  }
}

// ==============================================
// INICIALIZAÇÃO DO SERVIDOR
// ==============================================

app.listen(PORT, async () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`💾 Database: SQLite (Prisma ORM)`);

  // Testa conexão ao iniciar
  await testDatabaseConnection();

  console.log("\n");
});
