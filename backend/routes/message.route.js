import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { getUsersForChat, getMessages, deleteMessage, editMessage, send64Message } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectedRoute, getUsersForChat);
router.get("/:userId", protectedRoute, getMessages);
router.post("/send64/:userId", protectedRoute, send64Message);
router.get("/delete/:messageId", protectedRoute, deleteMessage)
router.post("/edit/:messageId", protectedRoute, editMessage);
export default router;
