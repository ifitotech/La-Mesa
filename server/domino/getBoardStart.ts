import { DominoGame } from "@/types/domino";

export function getBoardStart(
  game: DominoGame
) {
  return game.board[0] ?? null;
}