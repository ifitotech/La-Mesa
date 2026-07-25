import { DominoGame } from "@/types/domino";

export function getCurrentPlayerData(
  game: DominoGame
) {
  return (
    game.players.find(
      (player) => player.uid === game.currentTurn
    ) ?? null
  );
}