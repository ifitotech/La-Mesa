import { DominoGame } from "@/types/domino";

export function getGameSummary(
  game: DominoGame
) {
  return {
    roomId: game.roomId,
    status: game.status,
    players: game.players.length,
    stock: game.stock.length,
    board: game.board.length,
    currentTurn: game.currentTurn,
  };
}