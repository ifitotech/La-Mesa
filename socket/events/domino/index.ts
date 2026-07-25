import { Server, Socket } from "socket.io";

import { createRoom } from "./createRoom";
import { joinRoom } from "./joinRoom";
import { leaveRoom } from "./leaveRoom";
import { playTile } from "./playTile";
import { drawTile } from "./drawTile";
import { passTurn } from "./passTurn";

export function registerDominoEvents(
  io: Server,
  socket: Socket
) {
  createRoom(io, socket);
  joinRoom(io, socket);
  leaveRoom(io, socket);
  playTile(io, socket);
  drawTile(io, socket);
  passTurn(io, socket);
}