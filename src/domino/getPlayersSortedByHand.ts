import { DominoGame } from "@/types/domino";

export function getPlayersSortedByHand(
  game: DominoGame
) {
  return [...game.players].sort(
    (a, b) => a.hand.length - b.hand.length
  );
}