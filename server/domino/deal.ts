import { DominoPlayer } from "@/types/domino";
import { createSet } from "./createSet";
import { shuffle } from "./shuffle";

export function deal(playerIds: string[]) {
  const deck = shuffle(createSet());

  const players: DominoPlayer[] = playerIds.map(
    (uid) => ({
      uid,
      hand: [],
      points: 0,
    })
  );

  for (let i = 0; i < 7; i++) {
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