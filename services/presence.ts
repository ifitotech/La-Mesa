import {
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export async function heartbeat(
  roomId: string,
  uid: string
) {
  await updateDoc(doc(db, "rooms", roomId), {
    [`presence.${uid}`]: Date.now(),
  });
}

export function watchRoom(
  roomId: string,
  callback: (room: unknown) => void
) {
  return onSnapshot(
    doc(db, "rooms", roomId),
    (docSnap) => {
      callback(docSnap.data());
    }
  );
}

export async function setUserPresence(
  uid: string,
  status: "online" | "away" | "offline"
) {
  await setDoc(doc(db, "users", uid), {
    presence: status,
    lastActiveAt: serverTimestamp(),
  }, { merge: true });
}

export function subscribeActiveUsers(
  callback: (count: number) => void
) {
  return onSnapshot(
    query(collection(db, "users"), where("presence", "==", "online")),
    (snapshot) => callback(snapshot.size),
    () => callback(0)
  );
}
