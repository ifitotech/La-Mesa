import { DominoGame } from "@/types/domino";
import { declareWinner } from "./declareWinner";
import { shouldEndGame } from "./shouldEndGame";
import { calculateScores } from "./calculateScores";
import { calculateWinnerByPoints } from "./calculateWinnerByPoints";

export function finishIfNeeded(
  game: DominoGame
): boolean {
  if (!shouldEndGame(game)) {
    return false;
  }

  calculateScores(game);

  const winner =
    calculateWinnerByPoints(game);

  if (winner) {
    declareWinner(game, winner);
  }

  return true;
}