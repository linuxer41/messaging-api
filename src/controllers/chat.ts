import type { RequestHandler } from "express";
import { logger, serializePrisma } from "../utils";
import type { Chat, Message } from "@prisma/client";
import { prisma } from "../config/database";
import { presenceHandler } from "./misc";
import { PrismaClient} from "@prisma/client";

export const list: RequestHandler = async (req, res) => {
	try {
		const { sessionId } = req.params;
		const { cursor = undefined, limit = 25 } = req.query;
		const chats = (
			await prisma.chat.findMany({
				cursor: cursor ? { pkId: Number(cursor) } : undefined,
				take: Number(limit),
				skip: cursor ? 1 : 0,
				where: { sessionId },
			})
		).map((c: Chat) => serializePrisma(c));

		res.status(200).json({
			data: chats,
			cursor:
				chats.length !== 0 && chats.length === Number(limit)
					? chats[chats.length - 1].pkId
					: null,
		});
	} catch (e: any) {
		const message = "An error occured during chat list";
		logger.error(e, message);
		res.status(500).json({ error: message });
	}
};

export const find: RequestHandler = async (req, res) => {
	try {
		const { sessionId, jid } = req.params;
		const { cursor = undefined, limit = 25 } = req.query;
		const messages = (
			await prisma.message.findMany({
				cursor: cursor ? { pkId: Number(cursor) } : undefined,
				take: Number(limit),
				skip: cursor ? 1 : 0,
				where: { sessionId, remoteJid: jid },
				orderBy: { messageTimestamp: "desc" },
			})
		).map((m: Message) => serializePrisma(m));

		res.status(200).json({
			data: messages,
			cursor:
				messages.length !== 0 && messages.length === Number(limit)
					? messages[messages.length - 1].pkId
					: null,
		});
	} catch (e: any) {
		const message = "An error occured during chat find";
		logger.error(e, message);
		res.status(500).json({ error: message });
	}
};

export const presence = presenceHandler();
