import { DominoGame } from "@/types/domino";

export function hasPlayers(
  game: DominoGame
) {
  return game.players.length > 0;
}