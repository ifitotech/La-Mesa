import { DominoGame } from "@/types/domino";

export function getStockTileCount(
  game: DominoGame
) {
  return game.stock.length;
}