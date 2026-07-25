import { DominoGame } from "@/types/domino";

export function getPlayerHandsMap(
  game: DominoGame
) {
  return Object.fromEntries(
    game.players.map((player) => [
      player.uid,
      player.hand,
    ])
  );
}