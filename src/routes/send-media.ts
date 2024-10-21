import { Router } from "express";
import { send_media } from "@/controllers";
import requestValidator from "@/middlewares/request-validator";
import sessionValidator from "@/middlewares/session-validator";
import { body } from "express-validator";
import multer from "multer";

const router = Router({ mergeParams: true });
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // file size in bytes
});

router.post(
    "/send",
    upload.single("media"),
    //body("jid").isString().notEmpty(),
    //body("type").isString().isIn(["group", "number"]).optional(),
    //body("message").isObject().notEmpty(),
    //body("options").isObject().optional(),
    requestValidator,
    sessionValidator,
    send_media.send,
);


export default router;
