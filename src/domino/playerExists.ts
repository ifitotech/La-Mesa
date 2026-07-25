import { DominoGame } from "@/types/domino";

export function playerExists(
  game: DominoGame,
  uid: string
) {
  return game.players.some(
    (p) => p.uid === uid
  );
}