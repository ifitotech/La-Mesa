import { DominoGame } from "@/types/domino";

export function getTotalPlayerTiles(
  game: DominoGame
) {
  return game.players.reduce(
    (sum, player) => sum + player.hand.length,
    0
  );
}