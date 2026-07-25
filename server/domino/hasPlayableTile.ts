import { DominoGame } from "@/types/domino";
import { getPlayableTiles } from "./getPlayableTiles";

export function hasPlayableTile(
  game: DominoGame,
  uid: string
): boolean {
  return (
    getPlayableTiles(game, uid).length > 0
  );
}