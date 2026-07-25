import { DominoGame } from "@/types/domino";

export function isBlockedGame(
  game: DominoGame
): boolean {
  if (game.board.length === 0) {
    return false;
  }

  const left = game.board[0].left;
  const right = game.board[game.board.length - 1].right;

  return game.players.every((player) =>
    player.hand.every(
      (tile) =>
        tile.left !== left &&
        tile.right !== left &&
        tile.left !== right &&
        tile.right !== right
    )
  );
}