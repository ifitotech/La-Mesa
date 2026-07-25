import {
  DominoPlayer,
  DominoTile,
} from "@/types/domino";

export function getTile(
  player: DominoPlayer,
  tileId: string
): DominoTile | undefined {
  return player.hand.find(
    (tile) => tile.id === tileId
  );
}