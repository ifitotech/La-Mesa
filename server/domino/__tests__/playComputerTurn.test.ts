import { describe, expect, it } from "vitest";

import { playComputerTurn } from "../playComputerTurn";
import { DominoGame } from "@/types/domino";

function game(overrides: Partial<DominoGame> = {}): DominoGame {
  return {
    roomId: "practice",
    players: [
      { uid: "human", points: 0, hand: [{ id: "h", left: 1, right: 2 }] },
      { uid: "computer", points: 0, hand: [{ id: "c", left: 2, right: 6 }] },
    ],
    board: [{ id: "b", left: 4, right: 2 }],
    stock: [],
    currentTurn: "computer",
    round: 1,
    status: "playing",
    ...overrides,
  };
}

describe("playComputerTurn", () => {
  it("juega una ficha válida y gana al vaciar su mano", () => {
    const state = game();
    expect(playComputerTurn(state, "computer")).toBe("won");
    expect(state.status).toBe("finished");
    expect(state.winner).toBe("computer");
    expect(state.board.at(-1)?.right).toBe(6);
  });

  it("roba hasta encontrar una ficha válida", () => {
    const state = game({
      players: [
        { uid: "human", points: 0, hand: [{ id: "h", left: 1, right: 1 }] },
        { uid: "computer", points: 0, hand: [{ id: "c", left: 5, right: 6 }] },
      ],
      stock: [{ id: "drawn", left: 2, right: 3 }],
    });
    expect(playComputerTurn(state, "computer")).toBe("drew-and-played");
    expect(state.board.at(-1)?.right).toBe(3);
    expect(state.currentTurn).toBe("human");
  });

  it("cierra un juego bloqueado por menor cantidad de puntos", () => {
    const state = game({
      board: [{ id: "b", left: 0, right: 0 }],
      players: [
        { uid: "human", points: 0, hand: [{ id: "h", left: 1, right: 1 }] },
        { uid: "computer", points: 0, hand: [{ id: "c", left: 5, right: 6 }] },
      ],
    });
    expect(playComputerTurn(state, "computer")).toBe("blocked");
    expect(state.winner).toBe("human");
  });
});
