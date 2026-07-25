import { doc, updateDoc } from "firebase/firestore";

import { db } from "@/firebase/config";
import { DominoEngine } from "./DominoEngine";

export async function saveGame(engine: DominoEngine) {
  const game = engine.getGame();

  await updateDoc(doc(db, "games", game.roomId), {
    state: game,
    updatedAt: Date.now(),
  });
}