import { DominoGame } from "@/types/domino";

export function getCurrentPlayerPosition(
  game: DominoGame
) {
  return (
    game.players.findIndex(
      (player) => player.uid === game.currentTurn
    ) + 1
  );
}