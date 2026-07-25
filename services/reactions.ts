import {
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export async function sendReaction(
  roomId: string,
  uid: string,
  emoji: string
) {
  await updateDoc(doc(db, "rooms", roomId), {
    [`reactions.${uid}`]: emoji,
  });
}