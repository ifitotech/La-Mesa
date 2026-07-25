import { DominoGame } from "@/types/domino";

export function getPlayerByUid(
  game: DominoGame,
  uid: string
) {
  return (
    game.players.find(
      (player) => player.uid === uid
    ) ?? null
  );
}