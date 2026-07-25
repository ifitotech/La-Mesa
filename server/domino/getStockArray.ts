import { DominoGame } from "@/types/domino";

export function getStockArray(
  game: DominoGame
) {
  return [...game.stock];
}