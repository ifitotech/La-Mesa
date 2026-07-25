export type BingoCard = number[][];

function randomFrom(values: number[], amount: number) {
  return [...values].sort(() => Math.random() - 0.5).slice(0, amount).sort((a, b) => a - b);
}

export function createBingoCard(): BingoCard {
  return Array.from({ length: 5 }, (_, row) => [
    ...randomFrom(Array.from({ length: 15 }, (_, index) => index + 1), 1),
    ...randomFrom(Array.from({ length: 15 }, (_, index) => index + 16), 1),
    row === 2 ? 0 : randomFrom(Array.from({ length: 15 }, (_, index) => index + 31), 1)[0],
    ...randomFrom(Array.from({ length: 15 }, (_, index) => index + 46), 1),
    ...randomFrom(Array.from({ length: 15 }, (_, index) => index + 61), 1),
  ].flat());
}

export function hasBingo(marked: Set<number>) {
  const lines = [
    ...Array.from({ length: 5 }, (_, row) => Array.from({ length: 5 }, (_, col) => row * 5 + col)),
    ...Array.from({ length: 5 }, (_, col) => Array.from({ length: 5 }, (_, row) => row * 5 + col)),
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
  ];
  return lines.some((line) => line.every((position) => marked.has(position)));
}
