import { describe, expect, it } from "vitest";

import {
  PARCHIS_GOAL,
  createParchisGame,
  legalParchisMoves,
  moveParchisPiece,
} from "./parchis-engine";

describe("parchis-engine", () => {
  it("solo permite sacar una ficha de casa con cinco", () => {
    const game = createParchisGame(["Ana", "Luis"]);
    expect(legalParchisMoves(game, 4)).toEqual([]);
    expect(legalParchisMoves(game, 5)).toEqual([0, 1, 2, 3]);
    moveParchisPiece(game, 0, 5);
    expect(game.players[0].pieces[0].steps).toBe(0);
  });

  it("captura una ficha rival fuera de una casilla segura", () => {
    const game = createParchisGame(["Ana", "Luis"]);
    game.players[0].pieces[0].steps = 20;
    game.players[1].pieces[0].steps = 4;
    const result = moveParchisPiece(game, 0, 1);
    expect(result?.captured).toEqual(["player-1-piece-0"]);
    expect(game.players[1].pieces[0].steps).toBe(-1);
    expect(result?.extraTurn).toBe(true);
  });

  it("exige llegada exacta y declara ganador con cuatro fichas", () => {
    const game = createParchisGame(["Ana", "Luis"]);
    game.players[0].pieces.forEach((piece) => { piece.steps = PARCHIS_GOAL; });
    game.players[0].pieces[3].steps = PARCHIS_GOAL - 2;
    expect(legalParchisMoves(game, 3)).toEqual([]);
    expect(moveParchisPiece(game, 3, 2)?.won).toBe(true);
    expect(game.winner).toBe("player-0");
  });

  it("con seis conserva el turno", () => {
    const game = createParchisGame(["Ana", "Luis"]);
    game.players[0].pieces[0].steps = 5;
    expect(moveParchisPiece(game, 0, 6)?.extraTurn).toBe(true);
    expect(game.turn).toBe(0);
  });
});
