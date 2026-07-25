import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export async function logEvent(
  uid: string,
  event: string,
  data?: unknown
) {
  await addDoc(collection(db, "analytics"), {
    uid,
    event,
    data,
    createdAt: serverTimestamp(),
  });
}