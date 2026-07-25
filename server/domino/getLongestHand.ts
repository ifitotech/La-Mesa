import { DominoGame } from "@/types/domino";

export function getLongestHand(
  game: DominoGame
) {
  return Math.max(
    ...game.players.map(
      (player) => player.hand.length
    )
  );
}