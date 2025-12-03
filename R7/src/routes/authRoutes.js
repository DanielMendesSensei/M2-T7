import { Router } from "express";
import { authController } from "../controllers/authController.js";
///import { validate } from "../middlewares/validate.js";
// import { authValidation } from "../validations/authValidation.js";
import { authenticate } from "../middlewares/authenticate.js";
// import { authLimiter } from "../middlewares/rateLimit.js";

const router = Router();

router.post(
  "/auth/register",
  // authLimiter,
  //validate(authValidation.register),
  authController.register
);

router.post(
  "/auth/login",
  // authLimiter,
  //validate(authValidation.login),
  authController.login
);

router.post("/auth/refresh", authenticate, authController.refreshToken);

router.get("/auth/profile", authenticate, authController.getProfile);

export default router;
