import { DominoGame } from "@/types/domino";

export function getPlayerTotal(
  game: DominoGame
) {
  return game.players.length;
}