import { DominoGame } from "@/types/domino";

export function canPlayerMove(
  game: DominoGame,
  uid: string
): boolean {
  const player = game.players.find(
    (p) => p.uid === uid
  );

  if (!player) {
    return false;
  }

  if (game.board.length === 0) {
    return player.hand.length > 0;
  }

  const left = game.board[0].left;
  const right = game.board[game.board.length - 1].right;

  return player.hand.some(
    (tile) =>
      tile.left === left ||
      tile.right === left ||
      tile.left === right ||
      tile.right === right
  );
}