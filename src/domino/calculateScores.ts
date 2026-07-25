import { DominoGame } from "@/types/domino";

export function calculateScores(
  game: DominoGame
): void {
  game.players.forEach((player) => {
    player.points = player.hand.reduce(
      (sum, tile) => sum + tile.left + tile.right,
      0
    );
  });
}