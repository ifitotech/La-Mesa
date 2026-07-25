import { DominoGame } from "@/types/domino";

export function getPlayerMap(
  game: DominoGame
) {
  return Object.fromEntries(
    game.players.map((player) => [
      player.uid,
      player,
    ])
  );
}