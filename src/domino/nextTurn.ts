import { DominoGame } from "@/types/domino";

export function nextTurn(game: DominoGame) {
  const current = game.players.findIndex(
    (p) => p.uid === game.currentTurn
  );

  if (current === -1) return;

  const next = (current + 1) % game.players.length;

  game.currentTurn = game.players[next].uid;
}