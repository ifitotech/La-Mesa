import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export async function weeklyLeaderboard() {
  const snapshot = await getDocs(
    query(
      collection(db, "users"),
      orderBy("weeklyXP", "desc"),
      limit(50)
    )
  );

  return snapshot.docs.map((doc) => ({
    uid: doc.id,
    ...doc.data(),
  }));
}