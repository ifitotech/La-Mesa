import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export async function getInventory(uid: string) {
  const snap = await getDoc(
    doc(db, "users", uid)
  );

  return snap.data()?.inventory ?? {};
}

export async function equipAvatar(
  uid: string,
  avatar: string
) {
  await updateDoc(doc(db, "users", uid), {
    avatar,
  });
}