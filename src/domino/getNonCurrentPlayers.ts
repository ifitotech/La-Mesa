import { DominoGame } from "@/types/domino";

export function getNonCurrentPlayers(
  game: DominoGame
) {
  return game.players.filter(
    (player) => player.uid !== game.currentTurn
  );
}