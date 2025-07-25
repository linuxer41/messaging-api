import { Router } from "express";
import chatRoutes from "./chats";
import groupRoutes from "./groups";
import messageRoutes from "./messages";
import sessionRoutes from "./sessions";
import contactRoutes from "./contacts";
import sendMediaRoutes from "./send-media";
import misc from "./misc";
import { apiKeyValidator } from "../middlewares/api-key-validator";

const router = Router();
router.use("/sessions", sessionRoutes);
router.use("/:sessionId/chats", apiKeyValidator, chatRoutes);
router.use("/:sessionId/contacts", apiKeyValidator, contactRoutes);
router.use("/:sessionId/groups", apiKeyValidator, groupRoutes);
router.use("/:sessionId/messages", apiKeyValidator, messageRoutes);
router.use("/:sessionId/send-media", apiKeyValidator, sendMediaRoutes);
router.use("/:sessionId/misc", apiKeyValidator, misc);

export default router;
