import {
  DominoGame,
  DominoPlayer,
} from "@/types/domino";

export function getCurrentPlayer(
  game: DominoGame
): DominoPlayer | undefined {
  return game.players.find(
    (player) => player.uid === game.currentTurn
  );
}