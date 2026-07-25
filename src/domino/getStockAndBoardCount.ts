import { DominoGame } from "@/types/domino";

export function getStockAndBoardCount(
  game: DominoGame
) {
  return game.stock.length + game.board.length;
}