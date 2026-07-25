import { DominoGame } from "@/types/domino";

export function getOccupiedTiles(
  game: DominoGame
) {
  return (
    game.board.length +
    game.players.reduce(
      (total, player) => total + player.hand.length,
      0
    )
  );
}