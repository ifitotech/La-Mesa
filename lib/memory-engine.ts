export type MemoryCard = { id: string; value: string; matchedBy?: string };
export type MemoryPlayer = { id: string; name: string; score: number };
export type MemoryGame = {
  cards: MemoryCard[];
  players: MemoryPlayer[];
  turn: number;
  selected: number[];
  moves: number;
  finished: boolean;
};

export function createMemoryGame(symbols: string[], names: string[], random: () => number = Math.random): MemoryGame {
  const cards = [...symbols, ...symbols].map((value, index) => ({ id: `${value}-${index}`, value }));
  for (let index = cards.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [cards[index], cards[swapIndex]] = [cards[swapIndex], cards[index]];
  }
  const playerNames = names.length ? names : ["Jugador"];
  return {
    cards,
    players: playerNames.map((name, index) => ({ id: `memory-player-${index}`, name, score: 0 })),
    turn: 0,
    selected: [],
    moves: 0,
    finished: false,
  };
}

export type MemoryReveal = "first" | "match" | "miss" | "invalid";

export function revealMemoryCard(game: MemoryGame, index: number): MemoryReveal {
  const card = game.cards[index];
  if (!card || card.matchedBy || game.selected.includes(index) || game.finished || game.selected.length >= 2) return "invalid";
  game.selected.push(index);
  if (game.selected.length === 1) return "first";

  game.moves += 1;
  const [firstIndex, secondIndex] = game.selected;
  const first = game.cards[firstIndex];
  const second = game.cards[secondIndex];
  if (first.value === second.value) {
    const player = game.players[game.turn];
    first.matchedBy = player.id;
    second.matchedBy = player.id;
    player.score += 1;
    game.selected = [];
    game.finished = game.cards.every((candidate) => Boolean(candidate.matchedBy));
    return "match";
  }
  return "miss";
}

export function closeMemoryMiss(game: MemoryGame) {
  if (game.selected.length !== 2) return;
  game.selected = [];
  game.turn = (game.turn + 1) % game.players.length;
}

export function memoryWinners(game: MemoryGame) {
  const highest = Math.max(...game.players.map((player) => player.score));
  return game.players.filter((player) => player.score === highest);
}
