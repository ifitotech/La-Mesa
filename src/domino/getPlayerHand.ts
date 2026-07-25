import { DominoGame } from "@/types/domino";

export function getPlayerHand(
  game: DominoGame,
  uid: string
) {
  return (
    game.players.find(
      (player) => player.uid === uid
    )?.hand ?? []
  );
}