import { DominoGame } from "@/types/domino";

export function getPlayerIndex(
  game: DominoGame,
  uid: string
): number {
  return game.players.findIndex(
    (player) => player.uid === uid
  );
}