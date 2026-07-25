import { Server, Socket } from "socket.io";
import { DominoEngine } from "@/server/domino";

const rooms = new Map<string, DominoEngine>();

export function createRoom(
  io: Server,
  socket: Socket
) {
  socket.on(
    "domino:create-room",
    ({ roomId, players }) => {
      console.log("=================================");
      console.log("[CREATE ROOM]");
      console.log("Room:", roomId);
      console.log("Players:", players);

      if (rooms.has(roomId)) {
        console.log("[ERROR] Room already exists");

        socket.emit(
          "domino:error",
          "Room already exists"
        );

        return;
      }

      const engine = new DominoEngine(
        roomId,
        players
      );

      rooms.set(roomId, engine);

      console.log("[OK] Room created");
      console.log(
        "[ROOMS]",
        [...rooms.keys()]
      );

      socket.join(roomId);

      console.log(
        "[EMIT] domino:state ->",
        roomId
      );

      io.to(roomId).emit(
        "domino:state",
        engine.getGame()
      );

      console.log("=================================");
    }
  );
}

export { rooms };