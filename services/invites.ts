import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export async function invitePlayer(
  from: string,
  to: string,
  roomId: string
) {
  await addDoc(collection(db, "invites"), {
    from,
    to,
    roomId,
    status: "pending",
    createdAt: serverTimestamp(),
  });
}