import { DominoGame } from "@/types/domino";

export function getLastPlayer(
  game: DominoGame
) {
  return game.players[
    game.players.length - 1
  ] ?? null;
}