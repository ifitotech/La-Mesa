import { DominoGame } from "@/types/domino";

export function getGameSnapshot(
  game: DominoGame
) {
  return {
    roomId: game.roomId,
    currentTurn: game.currentTurn,
    status: game.status,
    boardSize: game.board.length,
    stockSize: game.stock.length,
  };
}