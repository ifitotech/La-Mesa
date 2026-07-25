import {
  DominoPlayer,
  DominoTile,
} from "@/types/domino";

export function getTileById(
  player: DominoPlayer,
  tileId: string
): DominoTile | undefined {
  return player.hand.find(
    (tile) => tile.id === tileId
  );
}