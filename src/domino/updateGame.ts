import { Server } from "socket.io";

import { DominoEngine } from "./DominoEngine";
import { saveGame } from "./saveGame";
import { broadcastGame } from "./broadcastGame";

export async function updateGame(
  io: Server,
  engine: DominoEngine
) {
  await saveGame(engine);

  broadcastGame(io, engine);
}