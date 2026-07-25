import { DominoGame } from "@/types/domino";

export function getBoardAndStock(
  game: DominoGame
) {
  return {
    board: game.board,
    stock: game.stock,
  };
}