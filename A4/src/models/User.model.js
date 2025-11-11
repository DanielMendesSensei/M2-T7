import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Nome não pode ser vazio",
      },
      len: {
        args: [2, 100],
        msg: "Nome deve estar entre 2 e 100 caracteres",
      },
    },
  },
});
