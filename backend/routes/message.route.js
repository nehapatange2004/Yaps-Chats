import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { getUsersForChat, getMessages, sendMessage, deleteMessage, editMessage } from "../controllers/message.controller.js";
import multer from "multer";
const router = express.Router();

router.get("/users", protectedRoute, getUsersForChat);
router.get("/:userId", protectedRoute, getMessages);

const upload = multer({dest: "/uploading"});
router.post("/send/:userId", protectedRoute, upload.single("file"), sendMessage);
router.get("/delete/:messageId", protectedRoute, deleteMessage)
router.post("/edit/:messageId", protectedRoute, editMessage);
export default router;
