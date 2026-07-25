import { DominoPlayer } from "@/types/domino";
import { createSet } from "./createSet";
import { shuffle } from "./shuffle";

export function deal(playerIds: string[], maxPip = 6) {
  const deck = shuffle(createSet(maxPip));
  const tilesPerPlayer = maxPip === 9 ? 10 : 7;

  const players: DominoPlayer[] = playerIds.map(
    (uid) => ({
      uid,
      hand: [],
      points: 0,
    })
  );

  for (let i = 0; i < tilesPerPlayer; i++) {
    for (const player of players) {
      const tile = deck.pop();

      if (tile) {
        player.hand.push(tile);
      }
    }
  }

  return {
    players,
    stock: deck,
  };
}
