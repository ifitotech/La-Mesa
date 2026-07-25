import {
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
  const userRef = doc(db, "users", credential.user.uid);
  const existingPlayer = await getDoc(userRef);

  if (!existingPlayer.exists()) {
    await setDoc(userRef, {
      uid: credential.user.uid,
      email: credential.user.email ?? "",
      displayName: credential.user.displayName ?? "Jugador",
      photoURL: credential.user.photoURL ?? "",
      avatar: "avatar_001",
      country: "CU",
      level: 1,
      xp: 0,
      coins: 1000,
      gems: 25,
      streak: 0,
      ranking: 0,
      presence: "online",
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    });
  } else {
    await setDoc(userRef, {
      displayName: credential.user.displayName ?? "Jugador",
      photoURL: credential.user.photoURL ?? "",
      lastLogin: serverTimestamp(),
      presence: "online",
    }, { merge: true });
  }

  return credential;
}

export function logoutUser() {
  if (!auth) {
    throw new Error("Configura Firebase en .env.local antes de usar autenticación.");
  }

  return signOut(auth);
}
