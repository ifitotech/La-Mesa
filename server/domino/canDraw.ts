import { DominoGame } from "@/types/domino";

export function canDraw(
  game: DominoGame
) {
  return game.stock.length > 0;
}