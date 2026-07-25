import { DominoGame } from "@/types/domino";

export function playerHasTiles(
  game: DominoGame,
  uid: string
): boolean {
  const player = game.players.find(
    (p) => p.uid === uid
  );

  if (!player) {
    return false;
  }

  return player.hand.length > 0;
}