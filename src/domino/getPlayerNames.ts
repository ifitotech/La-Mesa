import { DominoGame } from "@/types/domino";

export function getPlayerNames(
  game: DominoGame
): string[] {
  return game.players.map((player) => player.uid);
}