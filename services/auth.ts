import {
  User,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "@/firebase/config";

export async function ensurePlayerProfile(user: User) {
  const userRef = doc(db, "users", user.uid);
  const existingPlayer = await getDoc(userRef);

  if (!existingPlayer.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email ?? "",
      displayName: user.displayName ?? user.email?.split("@")[0] ?? "Jugador",
      photoURL: user.photoURL ?? "",
      avatar: "avatar_001",
      country: "CU",
      level: 1,
      xp: 0,
      coins: 1000,
      gems: 25,
      streak: 0,
      ranking: 0,
      gamesPlayed: 0,
      wins: 0,
      losses: 0,
      trophies: 0,
      presence: "online",
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    });
    return;
  }

  await setDoc(userRef, {
    email: user.email ?? "",
    displayName: user.displayName ?? existingPlayer.data().displayName ?? "Jugador",
    photoURL: user.photoURL ?? existingPlayer.data().photoURL ?? "",
    lastLogin: serverTimestamp(),
    presence: "online",
  }, { merge: true });
}

export async function registerUser(
  email: string,
  password: string
) {
  if (!auth) {
    throw new Error("Configura Firebase en .env.local antes de usar autenticación.");
  }

  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await setDoc(doc(db, "users", credential.user.uid), {
    uid: credential.user.uid,
    email: credential.user.email,
    displayName:
      credential.user.email?.split("@")[0] ?? "Jugador",
    country: "🇨🇺",
    level: 1,
    xp: 0,
    coins: 1000,
    gems: 25,
    streak: 0,
    ranking: 0,
    avatar: "avatar_001",
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    trophies: 0,
    createdAt: serverTimestamp(),
    lastLogin: serverTimestamp(),
  });

  return credential;
}

export function loginUser(email: string, password: string) {
  if (!auth) {
    throw new Error("Configura Firebase en .env.local antes de usar autenticación.");
  }

  return signInWithEmailAndPassword(auth, email, password);
}

export async function loginWithGoogle() {
  if (!auth) {
    throw new Error("Configura Firebase en .env.local antes de usar autenticación.");
  }

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  const credential = await signInWithPopup(auth, provider);
  await ensurePlayerProfile(credential.user);

  return credential;
}

export function logoutUser() {
  if (!auth) {
    throw new Error("Configura Firebase en .env.local antes de usar autenticación.");
  }

  return signOut(auth);
}
