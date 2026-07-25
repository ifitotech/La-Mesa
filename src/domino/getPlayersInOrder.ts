import { DominoGame } from "@/types/domino";

export function getPlayersInOrder(
  game: DominoGame
) {
  return [...game.players];
}