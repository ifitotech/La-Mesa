import { DominoGame } from "@/types/domino";

export function getGameCounts(
  game: DominoGame
) {
  return {
    players: game.players.length,
    board: game.board.length,
    stock: game.stock.length,
  };
}