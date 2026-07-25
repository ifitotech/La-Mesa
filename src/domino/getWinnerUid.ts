import { DominoGame } from "@/types/domino";

export function getWinnerUid(
  game: DominoGame
) {
  return game.winner ?? null;
}