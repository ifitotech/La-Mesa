import { DominoGame } from "@/types/domino";
import { getTileById } from "./getTileById";
import { removeTileFromHand } from "./removeTileFromHand";
import { placeLeft } from "./placeLeft";
import { placeRight } from "./placeRight";

export function playValidatedTile(
  game: DominoGame,
  uid: string,
  tileId: string,
  side: "left" | "right"
): boolean {
  const player = game.players.find(
    (p) => p.uid === uid
  );

  if (!player) {
    return false;
  }

  const tile = getTileById(player, tileId);

  if (!tile) {
    return false;
  }

  if (side === "left") {
    placeLeft(game, tile);
  } else {
    placeRight(game, tile);
  }

  removeTileFromHand(player, tileId);

  return true;
}