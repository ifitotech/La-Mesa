import { Server } from "socket.io";

import { DominoEngine } from "./DominoEngine";

export function broadcastGame(
  io: Server,
  engine: DominoEngine
) {
  const game = engine.getGame();

  io.to(game.roomId).emit("gameUpdated", game);
}