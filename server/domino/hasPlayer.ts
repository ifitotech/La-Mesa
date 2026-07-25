import { DominoGame } from "@/types/domino";

export function hasPlayer(
  game: DominoGame,
  uid: string
) {
  return game.players.some(
    (player) => player.uid === uid
  );
}