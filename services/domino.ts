import { socket } from "@/services/socket";

function emit(event: string, payload: unknown) {
  if (!socket.connected) {
    socket.connect();
  }

  socket.emit(event, payload);
}

export const dominoService = {
  createRoom(
    roomId: string,
    players: string[]
  ) {
    emit("domino:create-room", {
      roomId,
      players,
    });
  },

  joinRoom(roomId: string) {
    emit("domino:join-room", {
      roomId,
    });
  },

  play(
    roomId: string,
    uid: string,
    tileId: string,
    side: "left" | "right"
  ) {
    emit("domino:play", {
      roomId,
      uid,
      tileId,
      side,
    });
  },

  draw(
    roomId: string,
    uid: string
  ) {
    emit("domino:draw", {
      roomId,
      uid,
    });
  },

  pass(roomId: string) {
    emit("domino:pass", {
      roomId,
    });
  },

  leave(roomId: string) {
    emit("domino:leave-room", {
      roomId,
    });
  },

  socket,
};
