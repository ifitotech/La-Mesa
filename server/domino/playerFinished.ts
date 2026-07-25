import { DominoGame } from "@/types/domino";

export function playerFinished(
  game: DominoGame,
  uid: string
): boolean {
  const player = game.players.find(
    (p) => p.uid === uid
  );

  return player?.hand.length === 0;
}