import { DominoGame } from "@/types/domino";

export function getPlayerScore(
  game: DominoGame,
  uid: string
) {
  const player = game.players.find(
    (p) => p.uid === uid
  );

  if (!player) return 0;

  return player.hand.reduce(
    (sum, tile) => sum + tile.left + tile.right,
    0
  );
}