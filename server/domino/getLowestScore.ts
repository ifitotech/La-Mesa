import { DominoGame } from "@/types/domino";

import { getPlayerScore } from "./getPlayerScore";

export function getLowestScore(
  game: DominoGame
) {
  return Math.min(
    ...game.players.map((p) =>
      getPlayerScore(game, p.uid)
    )
  );
}