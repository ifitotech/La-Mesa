import { DominoGame, DominoTile } from "@/types/domino";
import { normalizeTileForLeft } from "./normalizeTileForLeft";

export function placeLeft(
  game: DominoGame,
  tile: DominoTile
): void {
  if (game.board.length === 0) {
    game.board.push(tile);
    return;
  }

  const normalized = normalizeTileForLeft(
    game.board[0].left,
    tile
  );

  game.board.unshift(normalized);
}