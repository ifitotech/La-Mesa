import { DominoGame } from "@/types/domino";

export function getPlayerIndexByUid(
  game: DominoGame,
  uid: string
) {
  return game.players.findIndex(
    (player) => player.uid === uid
  );
}