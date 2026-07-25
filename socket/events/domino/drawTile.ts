import { Server, Socket } from "socket.io";
import { rooms } from "./createRoom";

export function drawTile(
  io: Server,
  socket: Socket
) {
  socket.on(
    "domino:draw",
    ({ roomId, uid }) => {
      const engine = rooms.get(roomId);

      if (!engine) return;

      engine.draw(uid);

      io.to(roomId).emit(
        "domino:state",
        engine.getGame()
      );
    }
  );
}