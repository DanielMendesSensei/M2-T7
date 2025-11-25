import { Router } from "express";
import userRoutes from "./userRoutes.js";
import postRoutes from "./postRoutes.js";

const router = Router();

// API routes
router.use("/api", userRoutes);
router.use("/api", postRoutes);

// Health check route
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// API info route
router.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "A3 API with Sequelize ORM",
    version: "1.0.0",
    database: "SQLite",
    endpoints: {
      users: {
        "POST /api/users": "Create user",
        "GET /api/users": "Get all users",
        "GET /api/users/:id": "Get user by ID",
        "PUT /api/users/:id": "Update user",
        "DELETE /api/users/:id": "Delete user",
      },
      posts: {
        "POST /api/posts": "Create post",
        "GET /api/posts": "Get all posts",
        "GET /api/posts/:id": "Get post by ID",
        "PUT /api/posts/:id": "Update post",
        "DELETE /api/posts/:id": "Delete post",
        "PATCH /api/posts/:id/toggle-publish": "Toggle post publish status",
      },
    },
  });
});

export default router;
