import { DominoGame } from "@/types/domino";

export function getPlayersArray(
  game: DominoGame
) {
  return [...game.players];
}