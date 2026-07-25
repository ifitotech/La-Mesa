import { DominoGame } from "@/types/domino";

export function getCurrentPlayerHandCount(
  game: DominoGame
) {
  const player = game.players.find(
    (p) => p.uid === game.currentTurn
  );

  return player?.hand.length ?? 0;
}