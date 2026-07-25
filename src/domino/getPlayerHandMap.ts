import { DominoGame } from "@/types/domino";

export function getPlayerHandMap(
  game: DominoGame
) {
  return Object.fromEntries(
    game.players.map((player) => [
      player.uid,
      player.hand.length,
    ])
  );
}