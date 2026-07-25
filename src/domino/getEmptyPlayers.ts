import { DominoGame } from "@/types/domino";

export function getEmptyPlayers(
  game: DominoGame
) {
  return game.players.filter(
    (player) => player.hand.length === 0
  );
}