import { DominoGame } from "@/types/domino";

export function getPlayerIds(
  game: DominoGame
) {
  return game.players.map(
    (player) => player.uid
  );
}