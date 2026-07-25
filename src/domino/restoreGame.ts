import { DominoGame } from "@/types/domino";

export function restoreGame(
  data: string
): DominoGame {
  return JSON.parse(data) as DominoGame;
}