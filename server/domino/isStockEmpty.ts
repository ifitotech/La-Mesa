import { DominoGame } from "@/types/domino";

export function isStockEmpty(
  game: DominoGame
): boolean {
  return game.stock.length === 0;
}