import { Router } from "express";
import { postController } from "../controllers/postController.js";
import { validate } from "../middlewares/validate.js";
import { postValidation } from "../validations/postValidation.js";

const router = Router();

// Post routes
router.post("/posts", validate(postValidation.create), postController.create);
router.get("/posts", validate(postValidation.getAll), postController.getAll);
router.get(
  "/posts/:id",
  validate(postValidation.getById),
  postController.getById
);
router.put(
  "/posts/:id",
  validate(postValidation.update),
  postController.update
);
router.delete(
  "/posts/:id",
  validate(postValidation.delete),
  postController.delete
);
router.patch(
  "/posts/:id/toggle-publish",
  validate(postValidation.togglePublish),
  postController.togglePublish
);

export default router;
