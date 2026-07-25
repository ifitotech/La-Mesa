import { DominoGame } from "@/types/domino";

export function getPlayersOrderedByTiles(
  game: DominoGame
) {
  return [...game.players].sort(
    (a, b) => a.hand.length - b.hand.length
  );
}