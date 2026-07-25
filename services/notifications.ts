import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export async function pushNotification(
  uid: string,
  title: string,
  body: string
) {
  await addDoc(
    collection(db, "users", uid, "notifications"),
    {
      title,
      body,
      read: false,
      createdAt: serverTimestamp(),
    }
  );
}