import { describe, expect, it } from "vitest";
import { createGame } from "../createGame";
import { drawTile } from "../drawTile";

describe("drawTile", () => {
  it("debe robar una ficha", () => {
    const game = createGame("room", ["A", "B"]);

    const player = game.players[0];

    const beforeHand = player.hand.length;
    const beforeStock = game.stock.length;

    const ok = drawTile(player, game.stock);

    expect(ok).toBe(true);
    expect(player.hand.length).toBe(beforeHand + 1);
    expect(game.stock.length).toBe(beforeStock - 1);
  });

  it("no roba cuando el pozo está vacío", () => {
    const game = createGame("room", ["A", "B"]);

    const player = game.players[0];

    game.stock = [];

    expect(
      drawTile(player, game.stock)
    ).toBe(false);
  });
});