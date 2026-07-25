import { DominoGame } from "@/types/domino";

import { advanceTurn } from "./advanceTurn";
import { canPlaceLeft } from "./canPlaceLeft";
import { canPlaceRight } from "./canPlaceRight";
import { drawTile } from "./drawTile";
import { getPlayableTiles } from "./getPlayableTiles";
import { playTileOnSide } from "./playTileOnSide";

export type ComputerTurnResult = "played" | "drew-and-played" | "passed" | "won" | "blocked";

function handPoints(game: DominoGame, uid: string) {
  const player = game.players.find((candidate) => candidate.uid === uid);
  return player?.hand.reduce((total, tile) => total + tile.left + tile.right, 0) ?? Infinity;
}

export function finishBlockedDominoGame(game: DominoGame) {
  const movable = game.players.some((player) => getPlayableTiles(game, player.uid).length > 0);
  if (game.stock.length > 0 || movable) return false;
  const winner = [...game.players].sort((a, b) => handPoints(game, a.uid) - handPoints(game, b.uid))[0];
  game.status = "finished";
  game.winner = winner?.uid;
  return true;
}

export function playComputerTurn(game: DominoGame, uid: string): ComputerTurnResult {
  if (game.status !== "playing" || game.currentTurn !== uid) return "passed";
  const player = game.players.find((candidate) => candidate.uid === uid);
  if (!player) return "passed";

  let drew = false;
  let playable = getPlayableTiles(game, uid);
  while (!playable.length && game.stock.length) {
    drawTile(player, game.stock);
    drew = true;
    playable = getPlayableTiles(game, uid);
  }

  if (!playable.length) {
    if (finishBlockedDominoGame(game)) return "blocked";
    advanceTurn(game);
    return "passed";
  }

  const tile = [...playable].sort(
    (a, b) => (b.left + b.right + (b.left === b.right ? 4 : 0)) - (a.left + a.right + (a.left === a.right ? 4 : 0)),
  )[0];
  const side = canPlaceRight(game, tile) ? "right" : canPlaceLeft(game, tile) ? "left" : "right";
  playTileOnSide(game, uid, tile.id, side);

  if (!player.hand.length) {
    game.status = "finished";
    game.winner = uid;
    return "won";
  }

  advanceTurn(game);
  return drew ? "drew-and-played" : "played";
}
