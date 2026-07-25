import { DominoGame } from "@/types/domino";

export function getPlayerIndex(
  game: DominoGame,
  uid: string
) {
  return game.players.findIndex(
    (player) => player.uid === uid
  );
}