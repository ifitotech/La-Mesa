import {
  doc,
  updateDoc,
  serverTimestamp,
  increment,
} from "firebase/firestore";

import { db } from "@/firebase/config";
import { Question } from "./questions";

export async function startTrivia(
  roomId: string,
  questions: Question[]
) {
  await updateDoc(doc(db, "rooms", roomId), {
    status: "playing",
    currentQuestion: 0,
    questions,
    answers: {},
    scores: {},
    readyPlayers: [],
    questionStartedAt: serverTimestamp(),
  });
}

export async function nextRound(
  roomId: string
) {
  await updateDoc(doc(db, "rooms", roomId), {
    currentQuestion: increment(1),
    answers: {},
    readyPlayers: [],
    questionStartedAt: serverTimestamp(),
  });
}