import { DominoGame } from "@/types/domino";

export function getTurnPlayer(
  game: DominoGame
) {
  return (
    game.players.find(
      (player) => player.uid === game.currentTurn
    ) ?? null
  );
}