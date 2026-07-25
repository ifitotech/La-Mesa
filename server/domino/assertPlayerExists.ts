import { DominoGame } from "@/types/domino";
import { DominoPlayer } from "@/types/domino";

export function assertPlayerExists(
  game: DominoGame,
  uid: string
): DominoPlayer {
  const player = game.players.find(
    (p) => p.uid === uid
  );

  if (!player) {
    throw new Error("Jugador no encontrado.");
  }

  return player;
}