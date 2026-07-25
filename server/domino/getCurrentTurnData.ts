import { DominoGame } from "@/types/domino";

export function getCurrentTurnData(
  game: DominoGame
) {
  return {
    uid: game.currentTurn,
    index: game.players.findIndex(
      (player) => player.uid === game.currentTurn
    ),
  };
}