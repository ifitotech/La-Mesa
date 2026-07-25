import { DominoGame } from "@/types/domino";

export function getCurrentHand(
  game: DominoGame
) {
  return (
    game.players.find(
      (player) => player.uid === game.currentTurn
    )?.hand ?? []
  );
}