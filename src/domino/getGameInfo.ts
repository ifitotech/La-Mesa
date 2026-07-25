import { DominoGame } from "@/types/domino";

export function getGameInfo(
  game: DominoGame
) {
  return {
    roomId: game.roomId,
    status: game.status,
    currentTurn: game.currentTurn,
    playerCount: game.players.length,
  };
}