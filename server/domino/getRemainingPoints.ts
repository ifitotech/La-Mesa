import { DominoPlayer } from "@/types/domino";

export function getRemainingPoints(
  player: DominoPlayer
): number {
  return player.hand.reduce(
    (sum, tile) => sum + tile.left + tile.right,
    0
  );
}