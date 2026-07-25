import { Server, Socket } from "socket.io";
import { rooms } from "./createRoom";

export function passTurn(
  io: Server,
  socket: Socket
) {
  socket.on(
    "domino:pass",
    ({ roomId }) => {
      const engine = rooms.get(roomId);

      if (!engine) return;

      engine.pass();

      io.to(roomId).emit(
        "domino:state",
        engine.getGame()
      );
    }
  );
}