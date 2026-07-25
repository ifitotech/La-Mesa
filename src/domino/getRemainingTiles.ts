import { DominoGame } from "@/types/domino";

export function getRemainingTiles(
  game: DominoGame
) {
  return game.players.reduce(
    (sum, player) => sum + player.hand.length,
    game.stock.length
  );
}