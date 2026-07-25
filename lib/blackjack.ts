export type BlackjackSuit = "♠" | "♥" | "♦" | "♣";
export type BlackjackRank = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";
export type BlackjackCard = { id: string; rank: BlackjackRank; suit: BlackjackSuit };
export type BlackjackOutcome = "blackjack" | "win" | "lose" | "push";

const suits: BlackjackSuit[] = ["♠", "♥", "♦", "♣"];
const ranks: BlackjackRank[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

export function createBlackjackDeck(random: () => number = Math.random) {
  const deck = suits.flatMap((suit) => ranks.map((rank) => ({ id: `${rank}-${suit}`, rank, suit })));
  for (let index = deck.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [deck[index], deck[swapIndex]] = [deck[swapIndex], deck[index]];
  }
  return deck;
}

export function blackjackHandValue(cards: BlackjackCard[]) {
  let aces = 0;
  let total = cards.reduce((sum, card) => {
    if (card.rank === "A") { aces += 1; return sum + 11; }
    if (["J", "Q", "K"].includes(card.rank)) return sum + 10;
    return sum + Number(card.rank);
  }, 0);
  while (total > 21 && aces > 0) {
    total -= 10;
    aces -= 1;
  }
  return total;
}

export function isBlackjack(cards: BlackjackCard[]) {
  return cards.length === 2 && blackjackHandValue(cards) === 21;
}

export function dealerShouldHit(cards: BlackjackCard[]) {
  return blackjackHandValue(cards) < 17;
}

export function resolveBlackjack(player: BlackjackCard[], dealer: BlackjackCard[]): BlackjackOutcome {
  const playerValue = blackjackHandValue(player);
  const dealerValue = blackjackHandValue(dealer);
  if (playerValue > 21) return "lose";
  if (isBlackjack(player) && !isBlackjack(dealer)) return "blackjack";
  if (dealerValue > 21) return "win";
  if (dealerValue > playerValue) return "lose";
  if (dealerValue < playerValue) return "win";
  return "push";
}
