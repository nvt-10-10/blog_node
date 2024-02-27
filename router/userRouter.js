import express from "express";
import userController from "../controllers/UserController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("", userController.createUser);
router.use(authMiddleware);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);

export default router;
