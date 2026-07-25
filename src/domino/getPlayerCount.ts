import { DominoGame } from "@/types/domino";

export function getPlayerCount(
  game: DominoGame
) {
  return game.players.length;
}