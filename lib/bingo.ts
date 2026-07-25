export type BingoCard = number[][];

function randomFrom(values: number[], amount: number) {
  return [...values].sort(() => Math.random() - 0.5).slice(0, amount).sort((a, b) => a - b);
}

export function createBingoCard(): BingoCard {
  const starts = [1, 16, 31, 46, 61];
  const columns = starts.map((start, column) =>
    randomFrom(
      Array.from({ length: 15 }, (_, index) => start + index),
      column === 2 ? 4 : 5,
    ),
  );
  return Array.from({ length: 5 }, (_, row) =>
    columns.map((column, columnIndex) => {
      if (columnIndex === 2 && row === 2) return 0;
      return column[row > 2 && columnIndex === 2 ? row - 1 : row];
    }),
  );
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
