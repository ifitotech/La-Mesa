import { DominoGame, DominoTile } from "@/types/domino";

export function getPlayableTiles(
  game: DominoGame,
  uid: string
): DominoTile[] {
  const player = game.players.find(
    (p) => p.uid === uid
  );

  if (!player) {
    return [];
  }

  if (game.board.length === 0) {
    return [...player.hand];
  }

  const left = game.board[0].left;
  const right = game.board[game.board.length - 1].right;

  return player.hand.filter(
    (tile) =>
      tile.left === left ||
      tile.right === left ||
      tile.left === right ||
      tile.right === right
  );
}