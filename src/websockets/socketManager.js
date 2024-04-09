import { Server } from "socket.io";
import { prodLogger } from "../utils/logger.js";
import { messageService } from "../services/index.js";

export default class SocketManager {
  constructor(server) {
    this.socketServer = new Server(server);
  }
  enable() {
    this.socketServer.on("connection", async (socket) => {
      prodLogger.info("Cliente Conectado");
      const messages = await messageService.get();
      this.socketServer.emit("log-messages", messages);
      socket.on("new-message", async (data) => {
        await messageService.create(data);
        const messages = await messageService.get();
        this.socketServer.emit("log-messages", messages);
      });
    });
  }
}
