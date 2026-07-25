import { DominoGame } from "@/types/domino";

export function validateMove(
  game: DominoGame,
  uid: string,
  tileId: string
): boolean {
  if (game.currentTurn !== uid) {
    return false;
  }

  const player = game.players.find(
    (p) => p.uid === uid
  );

  if (!player) {
    return false;
  }

  const tile = player.hand.find(
    (t) => t.id === tileId
  );

  if (!tile) {
    return false;
  }

  if (game.board.length === 0) {
    return true;
  }

  const left = game.board[0].left;
  const right = game.board[game.board.length - 1].right;

  return (
    tile.left === left ||
    tile.right === left ||
    tile.left === right ||
    tile.right === right
  );
}