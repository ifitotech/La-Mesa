import { DominoGame } from "@/types/domino";

export function getBoardFirstTile(
  game: DominoGame
) {
  return game.board[0] ?? null;
}