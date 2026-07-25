import { getGame } from "./getGame";

export function gameExists(
  roomId: string
) {
  return getGame(roomId) !== null;
}