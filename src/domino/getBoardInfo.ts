import { DominoGame } from "@/types/domino";

export function getBoardInfo(
  game: DominoGame
) {
  return {
    tiles: game.board.length,
    empty: game.board.length === 0,
  };
}