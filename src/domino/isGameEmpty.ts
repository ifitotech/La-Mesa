import { DominoGame } from "@/types/domino";

export function isGameEmpty(
  game: DominoGame
) {
  return (
    game.board.length === 0 &&
    game.stock.length === 0 &&
    game.players.every(
      (player) => player.hand.length === 0
    )
  );
}