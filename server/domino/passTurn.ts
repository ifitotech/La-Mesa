import { DominoGame } from "@/types/domino";
import { nextTurn } from "./nextTurn";

export function passTurn(
  game: DominoGame
): void {
  nextTurn(game);
}
