import { DominoGame } from "@/types/domino";

export function getAverageHandSize(
  game: DominoGame
) {
  if (game.players.length === 0) {
    return 0;
  }

  const total = game.players.reduce(
    (sum, player) => sum + player.hand.length,
    0
  );

  return total / game.players.length;
}