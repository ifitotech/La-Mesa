import { DominoGame } from "@/types/domino";
import { getPlayerByUid } from "./getPlayerByUid";
import { getTile } from "./getTile";
import { removeTile } from "./removeTile";
import { canPlaceLeft } from "./canPlaceLeft";
import { canPlaceRight } from "./canPlaceRight";
import { placeLeft } from "./placeLeft";
import { placeRight } from "./placeRight";

export function playTile(
  game: DominoGame,
  playerId: string,
  tileId: string
): boolean {
  if (game.currentTurn !== playerId) {
    return false;
  }

  const player = getPlayerByUid(
    game,
    playerId
  );

  if (!player) {
    return false;
  }

  const tile = getTile(
    player,
    tileId
  );

  if (!tile) {
    return false;
  }

  if (game.board.length === 0) {
    removeTile(player, tileId);
    game.board.push(tile);
    return true;
  }

  if (canPlaceRight(game, tile)) {
    removeTile(player, tileId);
    placeRight(game, tile);
    return true;
  }

  if (canPlaceLeft(game, tile)) {
    removeTile(player, tileId);
    placeLeft(game, tile);
    return true;
  }

  return false;
}