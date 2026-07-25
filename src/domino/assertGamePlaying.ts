import { DominoGame } from "@/types/domino";

export function assertGamePlaying(
  game: DominoGame
): void {
  if (game.status !== "playing") {
    throw new Error(
      "La partida no está en juego."
    );
  }
}