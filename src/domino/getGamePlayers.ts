import { DominoGame } from "@/types/domino";

export function getGamePlayers(
  game: DominoGame
) {
  return [...game.players];
}