import { sequelize } from "../config/sequelize.js";
import User from "./User.js";
import Post from "./Post.js";

// Import all models here
const models = {
  User,
  Post,
};

// Apply associations if they exist
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export { sequelize, User, Post };

export default models;
