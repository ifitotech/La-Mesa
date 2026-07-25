import { DominoGame } from "@/types/domino";
import { canPlaceLeft } from "./canPlaceLeft";
import { canPlaceRight } from "./canPlaceRight";
import { getPlayerByUid } from "./getPlayerByUid";
import { getTile } from "./getTile";
import { placeLeft } from "./placeLeft";
import { placeRight } from "./placeRight";
import { removeTile } from "./removeTile";

export function playTileOnSide(game: DominoGame, playerId: string, tileId: string, side: "left" | "right") {
  if (game.status !== "playing" || game.currentTurn !== playerId) return false;
  const player = getPlayerByUid(game, playerId); const tile = player ? getTile(player, tileId) : undefined;
  if (!player || !tile) return false;
  if (game.board.length === 0) { removeTile(player, tileId); game.board.push(tile); return true; }
  if (side === "left" && !canPlaceLeft(game, tile)) return false;
  if (side === "right" && !canPlaceRight(game, tile)) return false;
  removeTile(player, tileId);
  if (side === "left") placeLeft(game, tile); else placeRight(game, tile);
  return true;
}
