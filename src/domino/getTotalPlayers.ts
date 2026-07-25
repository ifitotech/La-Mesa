import { DominoGame } from "@/types/domino";

export function getTotalPlayers(
  game: DominoGame
) {
  return game.players.length;
}