import {
  DominoPlayer,
  DominoTile,
} from "@/types/domino";

export function drawTile(
  player: DominoPlayer,
  stock: DominoTile[]
): boolean {
  if (!stock.length) {
    return false;
  }

  const tile = stock.pop();

  if (!tile) {
    return false;
  }

  player.hand.push(tile);

  return true;
}