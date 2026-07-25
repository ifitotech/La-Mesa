import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export async function joinQueue(uid: string) {
  await addDoc(collection(db, "queue"), {
    uid,
    createdAt: serverTimestamp(),
  });
}

export async function leaveQueue(queueId: string) {
  await deleteDoc(doc(db, "queue", queueId));
}

export async function findOpponent(uid: string) {
  const snapshot = await getDocs(
    query(
      collection(db, "queue"),
      where("uid", "!=", uid),
      limit(1)
    )
  );

  if (snapshot.empty) return null;

  return {
    id: snapshot.docs[0].id,
    uid: snapshot.docs[0].data().uid,
  };
}