import { DominoGame } from "@/types/domino";

export function getBoardLength(
  game: DominoGame
) {
  return game.board.length;
}