import { DominoGame } from "@/types/domino";

export function getStockLength(
  game: DominoGame
) {
  return game.stock.length;
}