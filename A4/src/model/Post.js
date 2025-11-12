import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.js";

class Post extends Model {
  static associate(models) {
    Post.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  }
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Title cannot be empty",
        },
        len: {
          args: [3, 200],
          msg: "Title must be between 3 and 200 characters",
        },
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Content cannot be empty",
        },
      },
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Post",
    tableName: "posts",
    indexes: [
      {
        fields: ["user_id"],
      },
      {
        fields: ["is_published"],
      },
    ],
  }
);

export default Post;
