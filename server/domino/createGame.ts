import { DominoGame } from "@/types/domino";
import { deal } from "./deal";
import { findStartingPlayer } from "./findStartingPlayer";

export function createGame(
  roomId: string,
  playerIds: string[]
): DominoGame {
  const { players, stock } = deal(playerIds);

  const currentTurn = findStartingPlayer(players);

  if (!currentTurn) {
    throw new Error(
      "No se pudo determinar el jugador inicial."
    );
  }

  return {
    roomId,
    players,
    board: [],
    stock,
    currentTurn,
    round: 1,
    status: "playing",
  };
}