import { authService } from "../services/authService.js";

export const authController = {
  async register(req, res) {
    try {
      const result = await authService.register(req.body);

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          user: result.user,
          token: result.token,
        },
      });
    } catch (error) {
      console.error("Error registering user:", error);

      if (error.message === "Email already exists") {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
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

  async login(req, res) {
    try {
      const result = await authService.login(req.body);

      res.json({
        success: true,
        message: "Login successful",
        data: {
          user: result.user,
          token: result.token,
        },
      });
    } catch (error) {
      console.error("Error logging in:", error);

      if (
        error.message === "Invalid credentials" ||
        error.message === "User account is inactive"
      ) {
        return res.status(401).json({
          success: false,
          message: error.message,
        });
      }

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  async refreshToken(req, res) {
    try {
      const result = await authService.refreshToken(req.user.id);

      res.json({
        success: true,
        message: "Token refreshed successfully",
        data: {
          user: result.user,
          token: result.token,
        },
      });
    } catch (error) {
      console.error("Error refreshing token:", error);

      if (error.message === "User not found or inactive") {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  async getProfile(req, res) {
    try {
      const user = await authService.getProfile(req.user.id);

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error("Error fetching profile:", error);

      if (error.message === "User not found") {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};
