import { DominoGame } from "@/types/domino";
import { findStartingPlayer } from "./findStartingPlayer";

export function startRound(
  game: DominoGame
): void {
  const starter = findStartingPlayer(game.players);

  if (!starter) {
    throw new Error("No se encontró un jugador inicial.");
  }

  game.currentTurn = starter;

  game.status = "playing";

  game.winner = undefined;
}