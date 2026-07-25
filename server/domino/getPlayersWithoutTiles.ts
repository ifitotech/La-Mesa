import { DominoGame } from "@/types/domino";

export function getPlayersWithoutTiles(
  game: DominoGame
) {
  return game.players.filter(
    (player) => player.hand.length === 0
  );
}