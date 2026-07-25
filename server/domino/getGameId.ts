import { DominoGame } from "@/types/domino";

export function getGameId(game: DominoGame) {
  return game.roomId;
}