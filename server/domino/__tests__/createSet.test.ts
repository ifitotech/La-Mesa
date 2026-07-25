import { describe, expect, it } from "vitest";
import { createSet } from "../createSet";
import { deal } from "../deal";

describe("configuraciones del dominó", () => {
  it("crea un juego completo de doble seis", () => {
    const tiles = createSet(6);

    expect(tiles).toHaveLength(28);
    expect(tiles.some((tile) => tile.left === 6 && tile.right === 6)).toBe(true);
    expect(Math.max(...tiles.flatMap((tile) => [tile.left, tile.right]))).toBe(6);
  });

  it("crea y reparte correctamente el doble nueve", () => {
    const tiles = createSet(9);
    const { players, stock } = deal(["jugador-1"], 9);

    expect(tiles).toHaveLength(55);
    expect(tiles.some((tile) => tile.left === 9 && tile.right === 9)).toBe(true);
    expect(players[0].hand).toHaveLength(10);
    expect(stock).toHaveLength(45);
  });
});
