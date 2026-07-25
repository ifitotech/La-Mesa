import { describe, expect, it } from "vitest";

import { BlackjackCard, blackjackHandValue, dealerShouldHit, isBlackjack, resolveBlackjack } from "./blackjack";

const card = (rank: BlackjackCard["rank"], suit: BlackjackCard["suit"] = "♠"): BlackjackCard => ({ id: `${rank}-${suit}`, rank, suit });

describe("blackjack", () => {
  it("reduce ases de once a uno para evitar pasarse", () => {
    expect(blackjackHandValue([card("A"), card("A", "♥"), card("9")])).toBe(21);
  });

  it("reconoce blackjack natural", () => {
    expect(isBlackjack([card("A"), card("K")])).toBe(true);
    expect(isBlackjack([card("7"), card("7"), card("7")])).toBe(false);
  });

  it("el crupier pide hasta diecisiete", () => {
    expect(dealerShouldHit([card("10"), card("6")])).toBe(true);
    expect(dealerShouldHit([card("10"), card("7")])).toBe(false);
  });

  it("resuelve victoria, derrota y empate", () => {
    expect(resolveBlackjack([card("10"), card("9")], [card("10"), card("8")])).toBe("win");
    expect(resolveBlackjack([card("10"), card("8")], [card("10"), card("9")])).toBe("lose");
    expect(resolveBlackjack([card("10"), card("8")], [card("9"), card("9")])).toBe("push");
  });
});
