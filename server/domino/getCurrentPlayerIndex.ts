import { DominoGame } from "@/types/domino";

export function getCurrentPlayerIndex(
  game: DominoGame
) {
  return game.players.findIndex(
    (player) => player.uid === game.currentTurn
  );
}