import { DominoGame } from "@/types/domino";
import { getNextPlayer } from "./getNextPlayer";
import { setCurrentTurn } from "./setCurrentTurn";

export function advanceTurn(
  game: DominoGame
): void {
  setCurrentTurn(
    game,
    getNextPlayer(game)
  );
}