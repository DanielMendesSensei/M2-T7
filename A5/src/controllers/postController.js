import { postService } from "../services/postService.js";

export const postController = {
  // Create a new post
  async create(req, res) {
    try {
      const post = await postService.createPost(req.body);

      res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: post,
      });
    } catch (error) {
      console.error("Error creating post:", error);

      if (error.message === "User not found") {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

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
  },

  // Get all posts
  async getAll(req, res) {
    try {
      const data = await postService.getAllPosts(req.query);

      res.json({
        success: true,
        data,
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  // Get post by ID
  async getById(req, res) {
    try {
      const post = await postService.getPostById(req.params.id);

      res.json({
        success: true,
        data: post,
      });
    } catch (error) {
      console.error("Error fetching post:", error);

      if (error.message === "Post not found") {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  // Update post
  async update(req, res) {
    try {
      const post = await postService.updatePost(req.params.id, req.body);

      res.json({
        success: true,
        message: "Post updated successfully",
        data: post,
      });
    } catch (error) {
      console.error("Error updating post:", error);

      if (error.message === "Post not found") {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }

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
  },

  // Delete post
  async delete(req, res) {
    try {
      await postService.deletePost(req.params.id);

      res.json({
        success: true,
        message: "Post deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting post:", error);

      if (error.message === "Post not found") {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  // Publish/Unpublish post
  async togglePublish(req, res) {
    try {
      const result = await postService.togglePostPublish(req.params.id);

      res.json({
        success: true,
        message: result.message,
        data: { isPublished: result.isPublished },
      });
    } catch (error) {
      console.error("Error toggling post publish status:", error);

      if (error.message === "Post not found") {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};
