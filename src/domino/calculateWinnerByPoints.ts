import { DominoGame } from "@/types/domino";

export function calculateWinnerByPoints(
  game: DominoGame
): string | undefined {
  if (game.players.length === 0) {
    return undefined;
  }

  return [...game.players]
    .sort((a, b) => a.points - b.points)[0]
    ?.uid;
}