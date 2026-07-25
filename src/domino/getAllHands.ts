import { DominoGame } from "@/types/domino";

export function getAllHands(
  game: DominoGame
) {
  return game.players.map((player) => ({
    uid: player.uid,
    hand: player.hand,
  }));
}