import {
  User,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
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

function getAuthErrorMessage(error: unknown) {
  const code =
    typeof error === "object" && error !== null && "code" in error
      ? String(error.code)
      : "";

  const messages: Record<string, string> = {
    "auth/email-already-in-use": "Ya existe una cuenta con este correo.",
    "auth/invalid-email": "Escribe un correo electrónico válido.",
    "auth/invalid-credential": "El correo o la contraseña no son correctos.",
    "auth/user-disabled": "Esta cuenta está deshabilitada.",
    "auth/user-not-found": "No encontramos una cuenta con este correo.",
    "auth/wrong-password": "El correo o la contraseña no son correctos.",
    "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
    "auth/popup-closed-by-user": "Se cerró la ventana de Google antes de terminar.",
    "auth/popup-blocked": "El navegador bloqueó la ventana de acceso con Google.",
    "auth/operation-not-allowed": "Este método de acceso todavía no está habilitado en Firebase.",
    "auth/unauthorized-domain": "Este dominio no está autorizado en Firebase Authentication.",
    "auth/network-request-failed": "No pudimos conectar con Firebase. Revisa tu conexión.",
    "auth/too-many-requests": "Hubo demasiados intentos. Espera unos minutos e inténtalo otra vez.",
  };

  return messages[code] ?? "No se pudo completar la autenticación. Inténtalo otra vez.";
}

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
      inventory: {
        avatar_001: true,
      },
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    });
    return;
  }

  const existingData = existingPlayer.data();

  await setDoc(userRef, {
    email: user.email ?? "",
    displayName: user.displayName ?? existingData.displayName ?? "Jugador",
    photoURL: user.photoURL ?? existingData.photoURL ?? "",
    ...(!existingData.inventory
      ? { inventory: { [existingData.avatar ?? "avatar_001"]: true } }
      : {}),
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

  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await ensurePlayerProfile(credential.user);

    return credential;
  } catch (error) {
    throw new Error(getAuthErrorMessage(error));
  }
}

export async function loginUser(email: string, password: string) {
  if (!auth) {
    throw new Error("Configura Firebase en .env.local antes de usar autenticación.");
  }

  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new Error(getAuthErrorMessage(error));
  }
}

export async function loginWithGoogle() {
  if (!auth) {
    throw new Error("Configura Firebase en .env.local antes de usar autenticación.");
  }

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  try {
    const credential = await signInWithPopup(auth, provider);
    await ensurePlayerProfile(credential.user);

    return credential;
  } catch (error) {
    throw new Error(getAuthErrorMessage(error));
  }
}

export async function requestPasswordReset(email: string) {
  if (!auth) {
    throw new Error("Configura Firebase en .env.local antes de usar autenticación.");
  }

  if (!email.trim()) {
    throw new Error("Escribe tu correo electrónico primero.");
  }

  try {
    await sendPasswordResetEmail(auth, email.trim());
  } catch (error) {
    throw new Error(getAuthErrorMessage(error));
  }
}

export function logoutUser() {
  if (!auth) {
    throw new Error("Configura Firebase en .env.local antes de usar autenticación.");
  }

  return signOut(auth);
}
