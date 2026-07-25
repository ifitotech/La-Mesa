import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export type ChatMessage = {
  id: string;
  uid: string;
  name: string;
  avatar: string;
  message: string;
  createdAt: unknown;
};

export async function sendMessage(
  roomId: string,
  uid: string,
  name: string,
  avatar: string,
  message: string
) {
  if (!message.trim()) return;

  await addDoc(
    collection(db, "rooms", roomId, "chat"),
    {
      uid,
      name,
      avatar,
      message,
      createdAt: serverTimestamp(),
    }
  );
}

export function subscribeChat(
  roomId: string,
  callback: (messages: ChatMessage[]) => void
) {
  return onSnapshot(
    query(
      collection(db, "rooms", roomId, "chat"),
      orderBy("createdAt")
    ),
    (snapshot) => {
      callback(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<
            ChatMessage,
            "id"
          >),
        }))
      );
    }
  );
}