import { DominoGame } from "@/types/domino";

export function getGameOverview(
  game: DominoGame
) {
  return {
    roomId: game.roomId,
    status: game.status,
    currentTurn: game.currentTurn,
    winner: game.winner,
    players: game.players.length,
    board: game.board.length,
    stock: game.stock.length,
  };
}