import { DominoGame } from "@/types/domino";

export function getPlayerTileCount(
  game: DominoGame,
  uid: string
) {
  const player = game.players.find(
    (p) => p.uid === uid
  );

  return player ? player.hand.length : 0;
}