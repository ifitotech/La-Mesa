import { DominoGame } from "@/types/domino";

export function getStockTiles(
  game: DominoGame
) {
  return game.stock;
}