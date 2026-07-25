import { DominoGame } from "@/types/domino";

export function isStockAvailable(
  game: DominoGame
) {
  return game.stock.length > 0;
}