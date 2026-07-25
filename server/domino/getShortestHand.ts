import { DominoGame } from "@/types/domino";

export function getShortestHand(
  game: DominoGame
) {
  return Math.min(
    ...game.players.map(
      (player) => player.hand.length
    )
  );
}