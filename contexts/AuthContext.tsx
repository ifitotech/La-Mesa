"use client";

import {
  User,
  onAuthStateChanged,
} from "firebase/auth";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { auth } from "@/firebase/config";
import { ensurePlayerProfile } from "@/services/auth";
import { setUserPresence } from "@/services/presence";

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      const timer = window.setTimeout(() => setLoading(false), 0);
      return () => window.clearTimeout(timer);
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
        if (currentUser) {
          void ensurePlayerProfile(currentUser).catch((error) => {
            console.warn("No se pudo sincronizar el perfil de jugador.", error);
          });
        }
      },
      (error) => {
        console.warn("Firebase Auth no está disponible; se usará el modo invitado.", error);
        setUser(null);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) return;

    void setUserPresence(user.uid, "online");

    const updatePresence = () => {
      void setUserPresence(
        user.uid,
        document.visibilityState === "visible" ? "online" : "away"
      );
    };

    window.addEventListener("visibilitychange", updatePresence);

    return () => {
      window.removeEventListener("visibilitychange", updatePresence);
      void setUserPresence(user.uid, "offline");
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
