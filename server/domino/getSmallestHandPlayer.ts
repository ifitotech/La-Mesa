import { DominoGame } from "@/types/domino";

export function getSmallestHandPlayer(
  game: DominoGame
) {
  return [...game.players].sort(
    (a, b) => a.hand.length - b.hand.length
  )[0] ?? null;
}