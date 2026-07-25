import { DominoGame } from "@/types/domino";

export function getOpponentPlayers(
  game: DominoGame,
  uid: string
) {
  return game.players.filter(
    (p) => p.uid !== uid
  );
}