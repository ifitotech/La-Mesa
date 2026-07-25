import { DominoGame } from "@/types/domino";

export function getPlayersStillPlayingCount(
  game: DominoGame
) {
  return game.players.filter(
    (player) => player.hand.length > 0
  ).length;
}