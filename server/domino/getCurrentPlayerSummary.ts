import { DominoGame } from "@/types/domino";

export function getCurrentPlayerSummary(
  game: DominoGame
) {
  const player = game.players.find(
    (p) => p.uid === game.currentTurn
  );

  if (!player) {
    return null;
  }

  return {
    uid: player.uid,
    tiles: player.hand.length,
  };
}