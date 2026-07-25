import { describe, expect, it } from "vitest";
import { createGame } from "../createGame";
import { passTurn } from "../passTurn";

describe("passTurn", () => {
  it("debe cambiar el turno", () => {
    const game = createGame("room", ["A", "B"]);

    const first = game.currentTurn;

    passTurn(game);

    expect(game.currentTurn).not.toBe(first);
  });
});