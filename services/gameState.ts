import {
  doc,
  onSnapshot,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export function subscribeGame(
  roomId: string,
  callback: (game: unknown) => void
) {
  return onSnapshot(
    doc(db, "rooms", roomId),
    (docSnap) => {
      if (!docSnap.exists()) return;

      callback({
        id: docSnap.id,
        ...docSnap.data(),
      });
    }
  );
}
