import express from "express";
import commentController from "../controllers/CommentController.js";
import authMiddleware from "../Middleware/authMiddleware.js";
const router = express.Router();

router.get("/post/:id/page/:page", commentController.getAllRootCommentByPost);
router.get("/comment-reply/:comment_id", commentController.getAllCommentPath);
router.use(authMiddleware);
router.post("", commentController.createComment);
router.post("/create-reply", commentController.createCommentReply);
router.patch("", commentController.updateComment);
router.delete("/:id", commentController.deleteComment);

export default router;
