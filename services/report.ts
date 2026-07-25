import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export async function reportPlayer(
  reporter: string,
  reported: string,
  reason: string
) {
  await addDoc(collection(db, "reports"), {
    reporter,
    reported,
    reason,
    createdAt: serverTimestamp(),
  });
}