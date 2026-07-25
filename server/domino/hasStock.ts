import { DominoGame } from "@/types/domino";

export function hasStock(game: DominoGame) {
  return game.stock.length > 0;
}