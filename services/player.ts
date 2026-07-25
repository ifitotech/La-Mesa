import {
  doc,
  getDoc,
  increment,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export type Player = {
  uid: string;
  email: string;
  displayName: string;
  country: string;
  avatar: string;
  photoURL?: string;
  level: number;
  xp: number;
  coins: number;
  gems: number;
  streak: number;
  ranking: number;
  onboardingCompleted?: boolean;
  gamesPlayed?: number;
  wins?: number;
  losses?: number;
  trophies?: number;
  inventory?: Record<string, boolean>;
  claimedRooms?: string[];
};

export async function getPlayer(uid: string): Promise<Player | null> {
  const ref = doc(db, "users", uid);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as Player;
}

export function subscribeToPlayer(
  uid: string,
  callback: (player: Player | null) => void
) {
  const ref = doc(db, "users", uid);

  return onSnapshot(ref, (snapshot) => {
    if (!snapshot.exists()) {
      callback(null);
      return;
    }

    callback(snapshot.data() as Player);
  });
}

export async function updateAvatar(
  uid: string,
  avatar: string
) {
  await updateDoc(doc(db, "users", uid), {
    avatar,
  });
}

export async function updatePhotoURL(
  uid: string,
  photoURL: string
) {
  await updateDoc(doc(db, "users", uid), {
    photoURL,
  });
}

export async function addCoins(
  uid: string,
  amount: number
) {
  await updateDoc(doc(db, "users", uid), {
    coins: increment(amount),
  });
}

export async function addXP(
  uid: string,
  amount: number
) {
  await updateDoc(doc(db, "users", uid), {
    xp: increment(amount),
  });
}

export async function addGems(
  uid: string,
  amount: number
) {
  await updateDoc(doc(db, "users", uid), {
    gems: increment(amount),
  });
}

export async function updateCountry(
  uid: string,
  country: string,
  onboardingCompleted = false
) {
  await updateDoc(doc(db, "users", uid), {
    country,
    ...(onboardingCompleted ? { onboardingCompleted: true } : {}),
  });
}

export async function updatePlayerProfile(
  uid: string,
  profile: Pick<Player, "displayName" | "avatar" | "country">
) {
  await updateDoc(doc(db, "users", uid), profile);
}
