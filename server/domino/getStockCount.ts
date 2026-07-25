import { DominoGame } from "@/types/domino";

export function getStockCount(game: DominoGame) {
  return game.stock.length;
}