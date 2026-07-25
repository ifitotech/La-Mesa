import { DominoGame } from "@/types/domino";

export function countBoardTiles(
  game: DominoGame
) {
  return game.board.length;
}