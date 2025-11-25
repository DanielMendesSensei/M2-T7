import { Router } from "express";
import { userController } from "../controllers/userController.js";
import { validate } from "../middlewares/validate.js";
import { userValidation } from "../validations/userValidation.js";

const router = Router();

// User routes
router.post("/users", userController.create);
router.get("/users", userController.getAll);
router.get("/users/:id", userController.getById);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

export default router;
