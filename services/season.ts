import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export async function getSeason() {
  const snap = await getDoc(
    doc(db, "config", "season")
  );

  return snap.data();
}