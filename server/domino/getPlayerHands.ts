import { DominoGame } from "@/types/domino";

export function getPlayerHands(
  game: DominoGame
) {
  return game.players.map((player) => player.hand);
}