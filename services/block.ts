import {
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export async function blockPlayer(
  uid: string,
  blockedUid: string
) {
  await updateDoc(doc(db, "users", uid), {
    [`blocked.${blockedUid}`]: true,
  });
}

export async function unblockPlayer(
  uid: string,
  blockedUid: string
) {
  await updateDoc(doc(db, "users", uid), {
    [`blocked.${blockedUid}`]: false,
  });
}