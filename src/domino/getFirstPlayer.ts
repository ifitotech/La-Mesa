import { DominoGame } from "@/types/domino";

export function getFirstPlayer(
  game: DominoGame
) {
  return game.players[0] ?? null;
}