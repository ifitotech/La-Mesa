import { DominoGame } from "@/types/domino";

export function hasStockTiles(
  game: DominoGame
) {
  return game.stock.length > 0;
}