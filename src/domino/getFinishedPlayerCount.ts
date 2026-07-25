import { DominoGame } from "@/types/domino";

export function getFinishedPlayerCount(
  game: DominoGame
) {
  return game.players.filter(
    (player) => player.hand.length === 0
  ).length;
}