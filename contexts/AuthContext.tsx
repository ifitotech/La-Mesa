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

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

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
