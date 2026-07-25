import { DominoGame } from "@/types/domino";

export function getPlayersWithoutCurrent(
  game: DominoGame
) {
  return game.players.filter(
    (player) => player.uid !== game.currentTurn
  );
}