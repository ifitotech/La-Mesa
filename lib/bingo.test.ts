import { describe, expect, it } from "vitest";

import { createBingoCard, hasBingo } from "./bingo";

describe("bingo", () => {
  it("crea columnas sin números repetidos y dentro de su rango oficial", () => {
    const card = createBingoCard();
    expect(card).toHaveLength(5);
    expect(card[2][2]).toBe(0);
    for (let column = 0; column < 5; column += 1) {
      const values = card.map((row) => row[column]).filter(Boolean);
      expect(new Set(values).size).toBe(values.length);
      for (const value of values) {
        expect(value).toBeGreaterThanOrEqual(column * 15 + 1);
        expect(value).toBeLessThanOrEqual(column * 15 + 15);
      }
    }
  });

  it("reconoce filas, columnas y diagonales completas", () => {
    expect(hasBingo(new Set([0, 1, 2, 3, 4]))).toBe(true);
    expect(hasBingo(new Set([0, 5, 10, 15, 20]))).toBe(true);
    expect(hasBingo(new Set([0, 6, 12, 18, 24]))).toBe(true);
    expect(hasBingo(new Set([0, 1, 2, 3]))).toBe(false);
  });
});
