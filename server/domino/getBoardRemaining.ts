import { DominoGame } from "@/types/domino";

export function getBoardRemaining(
  game: DominoGame
) {
  return game.board.length;
}