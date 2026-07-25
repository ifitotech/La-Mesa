import { DominoGame } from "@/types/domino";

export function getBoardIsEmpty(
  game: DominoGame
) {
  return game.board.length === 0;
}