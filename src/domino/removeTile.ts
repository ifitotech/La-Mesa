import { DominoPlayer } from "@/types/domino";

export function removeTile(
  player: DominoPlayer,
  tileId: string
): boolean {
  const index = player.hand.findIndex(
    (tile) => tile.id === tileId
  );

  if (index === -1) {
    return false;
  }

  player.hand.splice(index, 1);

  return true;
}