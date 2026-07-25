import { DominoPlayer } from "@/types/domino";

export function calculatePoints(
  players: DominoPlayer[]
): number[] {
  return players.map((player) =>
    player.hand.reduce(
      (sum, tile) =>
        sum + tile.left + tile.right,
      0
    )
  );
}