import { DominoGame } from "@/types/domino";

export function assertNotFinished(
  game: DominoGame
): void {
  if (game.status === "finished") {
    throw new Error(
      "La partida ya terminó."
    );
  }
}