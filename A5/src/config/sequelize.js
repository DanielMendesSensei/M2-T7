import { Sequelize } from "sequelize";
import { config } from "./database.js";
import path from "path";
import fs from "fs";

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

// Ensure database directory exists
const dbDir = path.dirname(dbConfig.storage);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Create Sequelize instance
export const sequelize = new Sequelize(dbConfig);

// Test connection function
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection has been established successfully.");
    return true;
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    return false;
  }
};

// Sync database function
export const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log(
      `✅ Database synchronized successfully ${force ? "(with force)" : ""}`
    );
  } catch (error) {
    console.error("❌ Error synchronizing database:", error);
    throw error;
  }
};

// Close connection function
export const closeConnection = async () => {
  try {
    await sequelize.close();
    console.log("✅ Database connection closed successfully.");
  } catch (error) {
    console.error("❌ Error closing database connection:", error);
  }
};

export default sequelize;
