import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";
import User from "./User.js";

const Post = sequelize.define(
  "Post",
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
        model: User,
        key: "id",
      },
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
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

// Define associations
User.hasMany(Post, {
  foreignKey: "userId",
  as: "posts",
});

Post.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export default Post;
