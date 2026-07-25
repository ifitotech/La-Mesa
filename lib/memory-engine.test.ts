import { describe, expect, it } from "vitest";

import { closeMemoryMiss, createMemoryGame, memoryWinners, revealMemoryCard } from "./memory-engine";

function fixedGame() {
  const game = createMemoryGame(["A", "B"], ["Ana", "Luis"], () => 0.999);
  game.cards = [
    { id: "a1", value: "A" },
    { id: "b1", value: "B" },
    { id: "a2", value: "A" },
    { id: "b2", value: "B" },
  ];
  return game;
}

describe("memory-engine", () => {
  it("da un punto y conserva el turno al formar pareja", () => {
    const game = fixedGame();
    expect(revealMemoryCard(game, 0)).toBe("first");
    expect(revealMemoryCard(game, 2)).toBe("match");
    expect(game.players[0].score).toBe(1);
    expect(game.turn).toBe(0);
  });

  it("cambia el turno después de fallar", () => {
    const game = fixedGame();
    revealMemoryCard(game, 0);
    expect(revealMemoryCard(game, 1)).toBe("miss");
    closeMemoryMiss(game);
    expect(game.turn).toBe(1);
  });

  it("finaliza y determina ganador", () => {
    const game = fixedGame();
    revealMemoryCard(game, 0);
    revealMemoryCard(game, 2);
    revealMemoryCard(game, 1);
    revealMemoryCard(game, 3);
    expect(game.finished).toBe(true);
    expect(memoryWinners(game).map((player) => player.name)).toEqual(["Ana"]);
  });
});
