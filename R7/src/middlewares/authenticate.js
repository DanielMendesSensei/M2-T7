import { verifyToken } from "../config/jwt.js";
import { userService } from "../services/userService.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access token is required",
      });
    }

    // Fatia aí para pegar só o token
    const token = authHeader.substring(7);

    const decoded = verifyToken(token);

    const consultUser = userService.getUserById(decoded.userId);

    // const user = await prisma.user.findUnique({
    //   where: { id: decoded.userId },
    // });

    // if (!user || !user.isActive) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "User not found or inactive",
    //   });
    // }

    req.user = {
      id: consultUser.id,
      email: consultUser.email,
      name: consultUser.name,
    };

    next();
  } catch (error) {
    console.error("Authentication error:", error);

    if (error.message === "Invalid or expired token") {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
