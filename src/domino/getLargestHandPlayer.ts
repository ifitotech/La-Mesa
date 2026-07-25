import { DominoGame } from "@/types/domino";

export function getLargestHandPlayer(
  game: DominoGame
) {
  return [...game.players].sort(
    (a, b) => b.hand.length - a.hand.length
  )[0] ?? null;
}