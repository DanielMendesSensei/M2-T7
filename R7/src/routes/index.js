import { Router } from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import postRoutes from "./postRoutes.js";
// import commentRoutes from "./commentRoutes.js";

const router = Router();

// API routes
router.use("/api", authRoutes);
router.use("/api", userRoutes);
router.use("/api", postRoutes);
// router.use("/api", commentRoutes);

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
    message: "A3 API with Prisma ORM",
    version: "1.0.0",
    database: "SQLite",
    endpoints: {
      auth: {
        "POST /api/auth/register": "Register new user",
        "POST /api/auth/login": "Login user",
        "POST /api/auth/refresh": "Refresh token (requires auth)",
        "GET /api/auth/profile": "Get user profile (requires auth)",
      },
      users: {
        "POST /api/users": "Create user",
        "GET /api/users": "Get all users (paginated)",
        "GET /api/users/:id": "Get user by ID",
        "PUT /api/users/:id": "Update user",
        "DELETE /api/users/:id": "Delete user",
      },
      posts: {
        "POST /api/posts": "Create post",
        "GET /api/posts": "Get all posts (paginated)",
        "GET /api/posts/:id": "Get post by ID",
        "PUT /api/posts/:id": "Update post",
        "DELETE /api/posts/:id": "Delete post",
        "PATCH /api/posts/:id/toggle-publish": "Toggle post publish status",
      },
      comments: {
        "POST /api/comments": "Create comment (requires auth)",
        "GET /api/posts/:postId/comments":
          "Get comments by post (requires auth)",
        "GET /api/comments/me": "Get my comments (requires auth)",
        "PUT /api/comments/:id": "Update comment (requires auth)",
        "DELETE /api/comments/:id": "Delete comment (requires auth)",
        "PATCH /api/comments/:id/approve":
          "Approve/unapprove comment (requires auth)",
      },
    },
  });
});

export default router;
