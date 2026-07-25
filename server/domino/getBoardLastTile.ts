import { DominoGame } from "@/types/domino";

export function getBoardLastTile(
  game: DominoGame
) {
  return game.board[
    game.board.length - 1
  ] ?? null;
}