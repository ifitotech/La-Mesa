import { DominoGame } from "@/types/domino";

export function getTotalTiles(
  game: DominoGame
) {
  return (
    game.board.length +
    game.stock.length +
    game.players.reduce(
      (sum, player) => sum + player.hand.length,
      0
    )
  );
}