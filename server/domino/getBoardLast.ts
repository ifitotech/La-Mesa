import { DominoGame } from "@/types/domino";

export function getBoardLast(
  game: DominoGame
) {
  return game.board.at(-1) ?? null;
}