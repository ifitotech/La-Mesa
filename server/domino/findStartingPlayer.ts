import { DominoPlayer } from "@/types/domino";

export function findStartingPlayer(
  players: DominoPlayer[]
): string | undefined {
  let starter: string | undefined;
  let highestDouble = -1;

  for (const player of players) {
    for (const tile of player.hand) {
      if (
        tile.left === tile.right &&
        tile.left > highestDouble
      ) {
        highestDouble = tile.left;
        starter = player.uid;
      }
    }
  }

  if (starter) {
    return starter;
  }

  let highest = -1;

  for (const player of players) {
    for (const tile of player.hand) {
      const value = tile.left + tile.right;

      if (value > highest) {
        highest = value;
        starter = player.uid;
      }
    }
  }

  return starter;
}