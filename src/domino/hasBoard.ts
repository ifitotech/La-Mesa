import { DominoGame } from "@/types/domino";

export function hasBoard(
  game: DominoGame
) {
  return game.board.length > 0;
}