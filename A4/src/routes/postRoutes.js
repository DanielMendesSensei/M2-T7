import { Router } from "express";
import { postController } from "../controllers/postController.js";

const router = Router();

// Post routes
router.post("/posts", postController.create);
router.get("/posts", postController.getAll);
router.get("/posts/:id", postController.getById);
router.put("/posts/:id", postController.update);
router.delete("/posts/:id", postController.delete);
router.patch("/posts/:id/toggle-publish", postController.togglePublish);

export default router;
