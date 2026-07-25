import { DominoGame } from "@/types/domino";

export function getBoardTileCount(
  game: DominoGame
) {
  return game.board.length;
}