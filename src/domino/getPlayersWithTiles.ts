import { DominoGame } from "@/types/domino";

export function getPlayersWithTiles(
  game: DominoGame
) {
  return game.players.filter(
    (player) => player.hand.length > 0
  );
}