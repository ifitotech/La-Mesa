import { DominoGame } from "@/types/domino";

export function getHandSize(
  game: DominoGame,
  uid: string
): number {
  const player = game.players.find(
    (p) => p.uid === uid
  );

  return player?.hand.length ?? 0;
}