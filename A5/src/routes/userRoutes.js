import { Router } from "express";
import { userController } from "../controllers/userController.js";
import { validate } from "../middlewares/validate.js";
import { userValidation } from "../validations/userValidation.js";

const router = Router();

// User routes
router.post("/users", validate(userValidation.create), userController.create);
router.get("/users", validate(userValidation.getAll), userController.getAll);
router.get(
  "/users/:id",
  validate(userValidation.getById),
  userController.getById
);
router.put(
  "/users/:id",
  validate(userValidation.update),
  userController.update
);
router.delete(
  "/users/:id",
  validate(userValidation.delete),
  userController.delete
);

export default router;
