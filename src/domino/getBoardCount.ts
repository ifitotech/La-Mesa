import { DominoGame } from "@/types/domino";

export function getBoardCount(
  game: DominoGame
) {
  return game.board.length;
}