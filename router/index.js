import express from "express";
import userRoutes from "./userRouter.js";
import postRoutes from "./postRouter.js";
import likeRoutes from "./likeRouter.js";
import commentRoutes from "./commentRouter.js";
import authRoutes from "./authRoutes.js";

const router = express.Router();

router.use("/api", authRoutes);
router.use("/api/users", userRoutes);
router.use("/api/posts", postRoutes);
router.use("/api/likes", likeRoutes);
router.use("/api/comments", commentRoutes);

export default router;
