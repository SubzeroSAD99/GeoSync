import { Server } from "socket.io";

class SocketServer {
  static #io = null;

  static init(httpServer, { corsOrigins = [] } = {}) {
    if (this.#io) return this.#io;

    this.#io = new Server(httpServer, {
      cors: { origin: corsOrigins, credentials: false },
      transports: ["websocket", "polling"],
    });

    this.#io.on("connection", (socket) => {
      socket.on("join:payment", (paymentId) => {
        if (!paymentId) return;
        socket.join(`payment:${paymentId}`);
      });
    });

    return this.#io;
  }

  static io() {
    if (!this.#io) throw new Error("SocketServer não inicializado");
    return this.#io;
  }

  static emitToPayment(paymentId, event, payload) {
    if (!paymentId) return;
    this.io().to(`payment:${paymentId}`).emit(event, payload);
  }
}

export default SocketServer;
