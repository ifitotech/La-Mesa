import { DominoGame } from "@/types/domino";

export function getPlayerUidList(
  game: DominoGame
) {
  return game.players.map(
    ({ uid }) => uid
  );
}