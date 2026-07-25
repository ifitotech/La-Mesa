import { DominoGame } from "@/types/domino";

export function getStockSize(
  game: DominoGame
): number {
  return game.stock.length;
}