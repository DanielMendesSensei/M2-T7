import express from "express";
import dotenv from "dotenv";
import { logger } from "./middlewares/logger.js";
import { testConnection, syncDatabase } from "./config/sequelize.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(logger);
app.use(express.json());

// Routes
// app.use("/", routes);

// Initialize database and start server
const startServer = async () => {
  try {
    // Test database connection
    await testConnection();

    // Sync database (create tables if they don't exist)
    await syncDatabase();

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📄 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(
        `🗄️  Database: SQLite (${
          process.env.DB_STORAGE || "./database/database.sqlite"
        })`
      );
    });
  } catch (error) {
    console.error("❌ Erro ao inicializar o servidor:", error);
    process.exit(1);
  }
};

startServer();
