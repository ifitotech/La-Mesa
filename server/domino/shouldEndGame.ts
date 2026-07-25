import { DominoGame } from "@/types/domino";
import { playerFinished } from "./playerFinished";
import { isBlockedGame } from "./isBlockedGame";

export function shouldEndGame(
  game: DominoGame
): boolean {
  if (
    playerFinished(
      game,
      game.currentTurn
    )
  ) {
    return true;
  }

  return isBlockedGame(game);
}