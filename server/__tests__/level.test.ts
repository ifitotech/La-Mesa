import { describe, expect, it } from "vitest";

import { getLevelForXP, getLevelInfo } from "../../services/level";

describe("player levels", () => {
  it.each([
    [0, 1],
    [99, 1],
    [100, 2],
    [249, 2],
    [250, 3],
    [449, 3],
    [450, 4],
    [700, 5],
    [1000, 6],
    [1400, 7],
  ])("maps %i XP to level %i", (xp, expectedLevel) => {
    expect(getLevelForXP(xp)).toBe(expectedLevel);
  });

  it("uses each level target as the next promotion threshold", () => {
    expect(getLevelInfo(1).requiredXP).toBe(100);
    expect(getLevelInfo(2).requiredXP).toBe(250);
    expect(getLevelInfo(6).requiredXP).toBe(1400);
  });
});
