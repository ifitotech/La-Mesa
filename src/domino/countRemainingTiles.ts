import { DominoPlayer } from "@/types/domino";

export function countRemainingTiles(
  player: DominoPlayer
): number {
  return player.hand.length;
}