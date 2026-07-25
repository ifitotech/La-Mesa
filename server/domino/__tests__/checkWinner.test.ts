import { describe, expect, it } from "vitest";
import { createGame } from "../createGame";
import { checkWinner } from "../checkWinner";

describe("checkWinner", () => {
  it("detecta un ganador", () => {
    const game = createGame("room", ["A", "B"]);

    game.players[0].hand = [];

    expect(checkWinner(game)).toBe(
      game.players[0].uid
    );
  });

  it("no devuelve ganador mientras todos tengan fichas", () => {
    const game = createGame("room", ["A", "B"]);

    expect(checkWinner(game)).toBeUndefined();
  });
});