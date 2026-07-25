import { DominoGame } from "@/types/domino";

export function getPlayersInfo(
  game: DominoGame
) {
  return game.players.map((player) => ({
    uid: player.uid,
    handSize: player.hand.length,
  }));
}