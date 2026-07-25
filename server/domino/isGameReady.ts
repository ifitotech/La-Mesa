import { DominoGame } from "@/types/domino";

export function isGameReady(
  game: DominoGame
) {
  return (
    game.players.length >= 2 &&
    game.board.length >= 0
  );
}