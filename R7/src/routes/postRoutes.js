import { Router } from "express";
import { postController } from "../controllers/postController.js";
// import { validate } from "../middlewares/validate.js";
// import { postValidation } from "../validations/postValidation.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

// Post routes (protected)
router.post(
  "/posts",
  authenticate,
  //validate(postValidation.create),
  postController.create
);
router.get(
  "/posts",
  authenticate,
  //validate(postValidation.getAll),
  postController.getAll
);
router.get(
  "/posts/:id",
  authenticate,
  //validate(postValidation.getById),
  postController.getById
);
router.put(
  "/posts/:id",
  authenticate,
  //validate(postValidation.update),
  postController.update
);
router.delete(
  "/posts/:id",
  authenticate,
  //validate(postValidation.delete),
  postController.delete
);
router.patch(
  "/posts/:id/toggle-publish",
  authenticate,
  //validate(postValidation.togglePublish),
  postController.togglePublish
);

export default router;
