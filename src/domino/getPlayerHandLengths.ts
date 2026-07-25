import { DominoGame } from "@/types/domino";

export function getPlayerHandLengths(
  game: DominoGame
) {
  return game.players.map(
    ({ uid, hand }) => ({
      uid,
      length: hand.length,
    })
  );
}