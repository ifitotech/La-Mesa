import { Server, Socket } from "socket.io";
import { rooms } from "./createRoom";

export function joinRoom(
  io: Server,
  socket: Socket
) {
  socket.on(
    "domino:join-room",
    ({ roomId }) => {
      console.log("=================================");
      console.log("[JOIN ROOM]");
      console.log("Room:", roomId);
      console.log("Available rooms:", [...rooms.keys()]);

      const engine = rooms.get(roomId);

      if (!engine) {
        console.log("[ERROR] Room not found");

        socket.emit(
          "domino:error",
          "Room not found"
        );

        return;
      }

      console.log("[OK] Room found");

      socket.join(roomId);

      console.log("[EMIT] domino:state");

      socket.emit(
        "domino:state",
        engine.getGame()
      );

      console.log("=================================");
    }
  );
}