import { DominoGame } from "@/types/domino";
import { setWinner } from "./setWinner";

export function finishByPlayer(
  game: DominoGame,
  uid: string
): void {
  setWinner(game, uid);
  game.status = "finished";
}