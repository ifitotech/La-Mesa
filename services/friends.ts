import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export type FriendRequest = {
  id?: string;
  from: string;
  to: string;
  status: "pending" | "accepted" | "declined";
  createdAt?: unknown;
};

const REQUESTS = "friendRequests";
const FRIENDS = "friends";

export async function sendFriendRequest(
  from: string,
  to: string
) {
  if (from === to) {
    throw new Error("You cannot add yourself.");
  }

  const existing = query(
    collection(db, REQUESTS),
    where("from", "==", from),
    where("to", "==", to),
    where("status", "==", "pending")
  );

  const snapshot = await getDocs(existing);

  if (!snapshot.empty) return;

  await addDoc(collection(db, REQUESTS), {
    from,
    to,
    status: "pending",
    createdAt: serverTimestamp(),
  });
}

export async function cancelFriendRequest(
  requestId: string
) {
  await deleteDoc(doc(db, REQUESTS, requestId));
}

export async function getPendingRequests(
  uid: string
): Promise<FriendRequest[]> {
  const q = query(
    collection(db, REQUESTS),
    where("to", "==", uid),
    where("status", "==", "pending")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...(d.data() as FriendRequest),
  }));
}

export async function acceptFriendRequest(
  request: FriendRequest
) {
  if (!request.id) return;

  await updateDoc(doc(db, REQUESTS, request.id), {
    status: "accepted",
  });

  await setDoc(
    doc(db, FRIENDS, `${request.from}_${request.to}`),
    {
      users: [request.from, request.to],
      createdAt: serverTimestamp(),
    }
  );
}

export async function declineFriendRequest(
  requestId: string
) {
  await updateDoc(doc(db, REQUESTS, requestId), {
    status: "declined",
  });
}