import { DominoGame } from "@/types/domino";

export function getRoomSummary(
  game: DominoGame
) {
  return {
    roomId: game.roomId,
    players: game.players.length,
    status: game.status,
  };
}