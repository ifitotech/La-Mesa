import { DominoGame } from "@/types/domino";

export function getPlayerPosition(
  game: DominoGame,
  uid: string
) {
  return game.players.findIndex(
    (player) => player.uid === uid
  );
}