import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase/config";
import { getPlayer, Player } from "./player";

export async function getFriends(
  uid: string
): Promise<Player[]> {
  const q = query(
    collection(db, "friends"),
    where("users", "array-contains", uid)
  );

  const snapshot = await getDocs(q);

  const friends: Player[] = [];

  for (const document of snapshot.docs) {
    const data = document.data();

    const friendUid = data.users.find(
      (id: string) => id !== uid
    );

    if (!friendUid) continue;

    const player = await getPlayer(friendUid);

    if (player) {
      friends.push(player);
    }
  }

  return friends.sort((a, b) =>
    a.displayName.localeCompare(b.displayName)
  );
}