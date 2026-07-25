import { DominoGame } from "@/types/domino";

export function getPlayersFinished(
  game: DominoGame
) {
  return game.players.filter(
    (p) => p.hand.length === 0
  );
}