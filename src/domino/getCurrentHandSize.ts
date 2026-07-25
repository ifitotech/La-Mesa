import { DominoGame } from "@/types/domino";

export function getCurrentHandSize(
  game: DominoGame
) {
  return (
    game.players.find(
      (player) => player.uid === game.currentTurn
    )?.hand.length ?? 0
  );
}