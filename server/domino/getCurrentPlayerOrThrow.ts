import {
  DominoGame,
  DominoPlayer,
} from "@/types/domino";

export function getCurrentPlayerOrThrow(
  game: DominoGame
): DominoPlayer {
  const player = game.players.find(
    (p) => p.uid === game.currentTurn
  );

  if (!player) {
    throw new Error(
      "Jugador actual no encontrado."
    );
  }

  return player;
}