import { DominoGame } from "@/types/domino";
import { DominoTile } from "@/types/domino";
import { canPlaceLeft } from "./canPlaceLeft";
import { canPlaceRight } from "./canPlaceRight";

export function assertTilePlayable(
  game: DominoGame,
  tile: DominoTile
): void {
  if (
    !canPlaceLeft(game, tile) &&
    !canPlaceRight(game, tile)
  ) {
    throw new Error(
      "La ficha no puede jugarse."
    );
  }
}