import { DominoGame } from "@/types/domino";

export function getPlayerByTurn(
  game: DominoGame
) {
  return (
    game.players.find(
      (p) => p.uid === game.currentTurn
    ) ?? null
  );
}