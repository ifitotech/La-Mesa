import { DominoGame } from "@/types/domino";

export function getBoardFirst(
  game: DominoGame
) {
  return game.board.at(0) ?? null;
}