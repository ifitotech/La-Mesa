import { DominoGame } from "@/types/domino";

export function getPlayersPlaying(
  game: DominoGame
) {
  return game.players.filter(
    (p) => p.hand.length > 0
  );
}