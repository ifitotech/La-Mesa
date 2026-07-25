import { DominoGame } from "@/types/domino";

export function getStockInfo(
  game: DominoGame
) {
  return {
    tiles: game.stock.length,
    empty: game.stock.length === 0,
  };
}