import {
  DominoPlayer,
  DominoTile,
} from "@/types/domino";

export function assertTileExists(
  player: DominoPlayer,
  tileId: string
): DominoTile {
  const tile = player.hand.find(
    (t) => t.id === tileId
  );

  if (!tile) {
    throw new Error("Ficha no encontrada.");
  }

  return tile;
}