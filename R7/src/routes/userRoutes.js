import { Router } from "express";
import { userController } from "../controllers/userController.js";
// import { validate } from "../middlewares/validate.js";
// import { userValidation } from "../validations/userValidation.js";
// import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

// User routes (protected)
router.post(
  "/users",
  //authenticate,
  //validate(userValidation.create),
  userController.create
);
router.get(
  "/users",
  //authenticate,
  //validate(userValidation.getAll),
  userController.getAll
);
router.get(
  "/users/:id",
  //authenticate,
  //validate(userValidation.getById),
  userController.getById
);
router.put(
  "/users/:id",
  //authenticate,
  //validate(userValidation.update),
  userController.update
);
router.delete(
  "/users/:id",
  //authenticate,
  //validate(userValidation.delete),
  userController.delete
);

export default router;
