import { DominoGame } from "@/types/domino";

export function getPlayerWithLeastTiles(
  game: DominoGame
) {
  return game.players.reduce((a, b) =>
    a.hand.length <= b.hand.length ? a : b
  );
}