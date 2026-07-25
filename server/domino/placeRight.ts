import { DominoGame, DominoTile } from "@/types/domino";
import { normalizeTileForRight } from "./normalizeTileForRight";

export function placeRight(
  game: DominoGame,
  tile: DominoTile
): void {
  if (game.board.length === 0) {
    game.board.push(tile);
    return;
  }

  const normalized = normalizeTileForRight(
    game.board[game.board.length - 1].right,
    tile
  );

  game.board.push(normalized);
}