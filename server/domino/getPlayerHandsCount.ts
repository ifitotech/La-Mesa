import { DominoGame } from "@/types/domino";

export function getPlayerHandsCount(
  game: DominoGame
) {
  return game.players.map((player) => ({
    uid: player.uid,
    tiles: player.hand.length,
  }));
}