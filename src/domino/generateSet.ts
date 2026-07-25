import { DominoTile } from "@/types/domino";

export function generateSet(): DominoTile[] {
  const tiles: DominoTile[] = [];

  let id = 0;

  for (let i = 0; i <= 6; i++) {
    for (let j = i; j <= 6; j++) {
      tiles.push({
        id: `${id++}`,
        left: i,
        right: j,
      });
    }
  }

  return shuffle(tiles);
}

function shuffle<T>(array: T[]) {
  return [...array].sort(() => Math.random() - 0.5);
}