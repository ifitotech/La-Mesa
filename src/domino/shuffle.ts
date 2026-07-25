import { DominoTile } from "@/types/domino";

export function shuffle(
  tiles: DominoTile[]
): DominoTile[] {
  const shuffled = [...tiles];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [shuffled[i], shuffled[j]] = [
      shuffled[j],
      shuffled[i],
    ];
  }

  return shuffled;
}