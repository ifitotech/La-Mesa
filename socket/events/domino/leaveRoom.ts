import { Server, Socket } from "socket.io";
import { rooms } from "./createRoom";

export function leaveRoom(
  io: Server,
  socket: Socket
) {
  socket.on(
    "domino:leave-room",
    ({ roomId }: { roomId: string }) => {
      socket.leave(roomId);

      const room = io.sockets.adapter.rooms.get(roomId);

      if (!room || room.size === 0) {
        rooms.delete(roomId);
      }
    }
  );
}