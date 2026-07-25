import { describe, expect, it } from "vitest";
import { createGame } from "../createGame";
import { playTile } from "../playTile";

describe("playTile", () => {
  it("debe jugar la primera ficha", () => {
    const game = createGame("room", ["A", "B"]);

    const player = game.players.find(
      (p) => p.uid === game.currentTurn
    )!;

    const tile = player.hand[0];

    expect(
      playTile(game, player.uid, tile.id)
    ).toBe(true);

    expect(game.board.length).toBe(1);
    expect(player.hand.length).toBe(6);
  });

  it("no debe permitir jugar fuera de turno", () => {
    const game = createGame("room", ["A", "B"]);

    const other = game.players.find(
      (p) => p.uid !== game.currentTurn
    )!;

    const tile = other.hand[0];

    expect(
      playTile(game, other.uid, tile.id)
    ).toBe(false);
  });

  it("no debe aceptar una ficha inexistente", () => {
    const game = createGame("room", ["A", "B"]);

    expect(
      playTile(
        game,
        game.currentTurn,
        "fake-id"
      )
    ).toBe(false);
  });
});