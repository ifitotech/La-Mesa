import {
  DominoGame,
  DominoPlayer,
} from "@/types/domino";

export function getPlayerByUid(
  game: DominoGame,
  uid: string
): DominoPlayer | undefined {
  return game.players.find(
    (player) => player.uid === uid
  );
}