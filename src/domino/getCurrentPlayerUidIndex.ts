import { DominoGame } from "@/types/domino";

export function getCurrentPlayerUidIndex(
  game: DominoGame
) {
  return game.players.findIndex(
    (player) => player.uid === game.currentTurn
  );
}