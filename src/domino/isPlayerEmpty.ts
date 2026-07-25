import { DominoGame } from "@/types/domino";

export function isPlayerEmpty(
  game: DominoGame,
  uid: string
) {
  const player = game.players.find(
    (p) => p.uid === uid
  );

  return player?.hand.length === 0;
}