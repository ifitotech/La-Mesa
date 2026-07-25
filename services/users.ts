import {
  collection,
  getDocs,
  limit,
  query,
} from "firebase/firestore";

import { db } from "@/firebase/config";
import { Player } from "./player";

export async function searchUsers(
  search: string
): Promise<Player[]> {
  const snapshot = await getDocs(
    query(collection(db, "users"), limit(50))
  );

  const text = search.trim().toLowerCase();

  return snapshot.docs
    .map((doc) => doc.data() as Player)
    .filter((user) => {
      return (
        user.displayName
          ?.toLowerCase()
          .includes(text) ||
        user.email
          ?.toLowerCase()
          .includes(text)
      );
    })
    .sort((a, b) =>
      a.displayName.localeCompare(b.displayName)
    );
}