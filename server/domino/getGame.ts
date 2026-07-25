import { DominoEngine } from "./DominoEngine";

const games = new Map<string, DominoEngine>();

export function getGame(roomId: string) {
  return games.get(roomId) ?? null;
}

export function setGame(roomId: string, game: DominoEngine) {
  games.set(roomId, game);
}

export function removeGame(roomId: string) {
  games.delete(roomId);
}