import { doc, updateDoc } from "firebase/firestore";

import { db } from "@/firebase/config";
import { DominoGame } from "@/types/domino";

export async function finishGame(game: DominoGame) {
  const scores = game.players.map((player) => ({
    uid: player.uid,
    score: player.hand.reduce(
      (total, tile) => total + tile.left + tile.right,
      0
    ),
  }));

  await updateDoc(doc(db, "games", game.roomId), {
    state: game,
    scores,
    finishedAt: Date.now(),
  });
}