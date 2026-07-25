import { DominoGame } from "@/types/domino";

export function getRemainingStock(
  game: DominoGame
) {
  return game.stock.length;
}