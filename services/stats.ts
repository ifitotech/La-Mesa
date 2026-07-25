import {
  doc,
  increment,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export async function registerWin(uid: string) {
  await updateDoc(doc(db, "users", uid), {
    wins: increment(1),
  });
}

export async function registerCorrect(uid: string) {
  await updateDoc(doc(db, "users", uid), {
    correctAnswers: increment(1),
  });
}

export async function registerWrong(uid: string) {
  await updateDoc(doc(db, "users", uid), {
    wrongAnswers: increment(1),
  });
}