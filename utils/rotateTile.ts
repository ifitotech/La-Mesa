import { DominoTile } from "@/types/domino";

export function rotateTile(
  tile: DominoTile
): DominoTile {

  return {

    ...tile,

    left: tile.right,

    right: tile.left,

  };

}