import { DominoGame } from "@/types/domino";

export function getGameStats(
  game: DominoGame
) {
  return {
    roomId: game.roomId,
    status: game.status,
    players: game.players.length,
    boardTiles: game.board.length,
    stockTiles: game.stock.length,
    currentTurn: game.currentTurn,
    winner: game.winner ?? null,
  };
}