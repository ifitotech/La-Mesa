import { DominoGame } from "@/types/domino";

import { getLowestScore } from "./getLowestScore";
import { getPlayerScore } from "./getPlayerScore";

export function getWinningPlayer(
  game: DominoGame
) {
  const score = getLowestScore(game);

  return (
    game.players.find(
      (p) =>
        getPlayerScore(game, p.uid) === score
    ) ?? null
  );
}