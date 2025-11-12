import { sequelize } from "../config/sequelize.js";
import User from "./User.js";
// importar POSTs

const models = {
  User,
  //Post
};

// Aplicação da associação entre entidades caso elas existam
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export { sequelize, User };

export default models;
