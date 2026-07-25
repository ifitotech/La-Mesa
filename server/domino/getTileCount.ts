import { DominoGame } from "@/types/domino";

export function getTileCount(
  game: DominoGame
) {
  return game.players.reduce(
    (total, player) =>
      total + player.hand.length,
    game.board.length + game.stock.length
  );
}