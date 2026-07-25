import { DominoGame } from "@/types/domino";

export function checkBlocked(
  game: DominoGame
): boolean {
  return (
    game.stock.length === 0 &&
    game.players.every(
      (p) => p.hand.length > 0
    )
  );
}