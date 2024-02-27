import express from "express";
import postController from "../controllers/PostController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/detail/:id", postController.getPostDetailById);
router.get("/page/:page", postController.getAllPostByPage);
router.get("/user/:user_id/post/:post_id", postController.getAllPostsByUserId);
router.use(authMiddleware);
router.get("/update/:id", (req, res) =>
    postController.getPostById(req, res, ["base", "edit"])
);
router.post("", postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

export default router;
