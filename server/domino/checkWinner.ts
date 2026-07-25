import { DominoGame } from "@/types/domino";

export function checkWinner(
  game: DominoGame
): string | undefined {
  const winner = game.players.find(
    (player) => player.hand.length === 0
  );

  return winner?.uid;
}