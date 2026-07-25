import { DominoGame } from "@/types/domino";

export function getPlayersReverseOrder(
  game: DominoGame
) {
  return [...game.players].reverse();
}