import { Post, User } from "../model/index.js";

class PostController {
  // Create a new post
  async create(req, res) {
    try {
      const { title, content, tags, userId } = req.body;

      // Verify if user exists
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const post = await Post.create({
        title,
        content,
        tags,
        userId,
      });

      // Fetch the created post with user data
      const createdPost = await Post.findByPk(post.id, {
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "name", "email"],
          },
        ],
      });

      res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: createdPost,
      });
    } catch (error) {
      console.error("Error creating post:", error);

      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors.map((err) => ({
            field: err.path,
            message: err.message,
          })),
        });
      }

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  // Get all posts
  async getAll(req, res) {
    try {
      const { page = 1, limit = 10, isPublished, userId } = req.query;
      const offset = (page - 1) * limit;

      const whereClause = {};
      if (isPublished !== undefined) {
        whereClause.isPublished = isPublished === "true";
      }
      if (userId) {
        whereClause.userId = userId;
      }

      const { count, rows: posts } = await Post.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "name", "email"],
          },
        ],
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [["createdAt", "DESC"]],
      });

      res.json({
        success: true,
        data: {
          posts,
          pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(count / limit),
            totalItems: count,
            itemsPerPage: parseInt(limit),
          },
        },
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  // Get post by ID
  async getById(req, res) {
    try {
      const { id } = req.params;

      const post = await Post.findByPk(id, {
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "name", "email"],
          },
        ],
      });

      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }

      res.json({
        success: true,
        data: post,
      });
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  // Update post
  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, content, tags, isPublished } = req.body;

      const post = await Post.findByPk(id);

      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }

      await post.update({
        title,
        content,
        tags,
        isPublished,
      });

      // Fetch updated post with user data
      const updatedPost = await Post.findByPk(id, {
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "name", "email"],
          },
        ],
      });

      res.json({
        success: true,
        message: "Post updated successfully",
        data: updatedPost,
      });
    } catch (error) {
      console.error("Error updating post:", error);

      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors.map((err) => ({
            field: err.path,
            message: err.message,
          })),
        });
      }

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  // Delete post
  async delete(req, res) {
    try {
      const { id } = req.params;

      const post = await Post.findByPk(id);

      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }

      await post.destroy();

      res.json({
        success: true,
        message: "Post deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  // Publish/Unpublish post
  async togglePublish(req, res) {
    try {
      const { id } = req.params;

      const post = await Post.findByPk(id);

      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }

      await post.update({
        isPublished: !post.isPublished,
      });

      res.json({
        success: true,
        message: `Post ${
          post.isPublished ? "published" : "unpublished"
        } successfully`,
        data: { isPublished: post.isPublished },
      });
    } catch (error) {
      console.error("Error toggling post publish status:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}

export const postController = new PostController();
