import { DominoGame } from "@/types/domino";

export function getRoomStatus(
  game: DominoGame
) {
  return {
    roomId: game.roomId,
    status: game.status,
  };
}