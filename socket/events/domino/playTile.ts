import { Server, Socket } from "socket.io";
import { rooms } from "./createRoom";

export function playTile(
  io: Server,
  socket: Socket
) {
  socket.on(
    "domino:play",
    ({
      roomId,
      uid,
      tileId,
    }) => {
      const engine = rooms.get(roomId);

      if (!engine) return;

      const ok = engine.play(
        uid,
        tileId
      );

      if (!ok) {
        socket.emit(
          "domino:error",
          "Invalid move"
        );
        return;
      }

      io.to(roomId).emit(
        "domino:state",
        engine.getGame()
      );
    }
  );
}