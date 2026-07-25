import {
  DominoGame,
  DominoTile,
} from "@/types/domino";
import { canPlaceLeft } from "./canPlaceLeft";
import { placeLeft } from "./placeLeft";
import { placeRight } from "./placeRight";

export function placeTile(
  game: DominoGame,
  tile: DominoTile
): boolean {
  if (canPlaceLeft(game, tile)) {
    placeLeft(game, tile);
    return true;
  }

  placeRight(game, tile);

  return true;
}