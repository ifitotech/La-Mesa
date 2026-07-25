import { DominoGame } from "@/types/domino";
import { calculateScores } from "./calculateScores";
import { calculateWinnerByPoints } from "./calculateWinnerByPoints";

export function endRound(
  game: DominoGame
): void {
  calculateScores(game);

  game.winner =
    calculateWinnerByPoints(game);

  game.status = "finished";
}