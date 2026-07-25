import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export async function saveMatch(
  roomId: string,
  players: string[],
  scores: Record<string, number>
) {
  await addDoc(collection(db, "matches"), {
    roomId,
    players,
    scores,
    createdAt: serverTimestamp(),
  });
}