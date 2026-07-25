import { DominoGame } from "@/types/domino";

export function getCurrentPlayerExists(
  game: DominoGame
) {
  return game.players.some(
    (player) => player.uid === game.currentTurn
  );
}