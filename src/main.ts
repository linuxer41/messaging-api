import { Server } from "./server";
require("./utils/logger.console");

async function bootstrap() {
	const server = new Server();
	await server.start();
}

bootstrap();
