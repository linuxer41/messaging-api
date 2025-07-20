import env from "../config/env";
import pino, { type Logger } from "pino";
import fs from 'fs';

export const logger: Logger = pino({
	timestamp: () => `,"time":"${new Date().toJSON()}"`,
	transport: {
		targets: [
			{
				level: env.LOG_LEVEL || "debug",
				target: "pino/file",
				options: { destination: setLoggerPath() },
			},
		],
	},
	mixin(mergeObject, level) {
		return {
			...mergeObject,
			level: level,
		};
	},
});

function setLoggerPath(){
	const path = `${env.LOG_FILE || "logs"}/${new Date().getFullYear()}/${new Date().getMonth() + 1}/whatsapp`;
	if (!fs.existsSync(path)) {
		fs.mkdirSync(path, { recursive: true });
	}
	return `${path}/app.log`;
}
