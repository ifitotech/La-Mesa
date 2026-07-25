import { DominoGame } from "@/types/domino";
import { getPlayerIndex } from "./getPlayerIndex";

export function getNextPlayer(
  game: DominoGame
): string {
  const index = getPlayerIndex(
    game,
    game.currentTurn
  );

  const next =
    (index + 1) % game.players.length;

  return game.players[next].uid;
}