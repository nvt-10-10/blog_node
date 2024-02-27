import express from "express";
import likeController from "../controllers/LikeController.js";
import authMiddleware from "../Middleware/authMiddleware.js";
const router = express.Router();
router.use(authMiddleware);
router.post("", likeController.createLike);
router.delete(
    "/object_id/:object_id/type/:type/user_id/:user_id",
    likeController.deleteLike
);

export default router;
