import { DominoGame } from "@/types/domino";

export function getStockRemaining(
  game: DominoGame
) {
  return game.stock.length;
}