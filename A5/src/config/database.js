import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Configure dotenv
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const config = {
  development: {
    dialect: process.env.DB_DIALECT || "sqlite",
    storage: path.join(
      process.cwd(),
      process.env.DB_STORAGE || "./database/database.sqlite"
    ),
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
    },
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
    },
  },
  production: {
    dialect: process.env.DB_DIALECT || "sqlite",
    storage: path.join(
      process.cwd(),
      process.env.DB_STORAGE || "./database/database.sqlite"
    ),
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
    },
  },
};

export default config;
