import { DominoGame } from "@/types/domino";

export function isCurrentPlayerEmpty(
  game: DominoGame
) {
  return (
    game.players.find(
      (player) => player.uid === game.currentTurn
    )?.hand.length === 0
  );
}