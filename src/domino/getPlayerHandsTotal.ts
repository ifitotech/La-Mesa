import { DominoGame } from "@/types/domino";

export function getPlayerHandsTotal(
  game: DominoGame
) {
  return game.players.reduce(
    (total, player) => total + player.hand.length,
    0
  );
}