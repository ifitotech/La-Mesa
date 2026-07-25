"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

import { getCountryProfile, CountryProfile } from "@/lib/country-profile";
import { useAuthContext } from "@/contexts/AuthContext";
import { subscribeToPlayer, updateCountry } from "@/services/player";

type CountryContextValue = {
  country: CountryProfile;
  changeCountry: (code: string) => Promise<void>;
};

const CountryContext = createContext<CountryContextValue>({
  country: getCountryProfile(),
  changeCountry: async () => {},
});

export function CountryProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();
  const [country, setCountry] = useState(getCountryProfile());
  const localOverride = useRef<string | null>(null);

  async function changeCountry(code: string) {
    localOverride.current = code;
    window.localStorage.setItem("la-mesa-country", code);
    setCountry(getCountryProfile(code));
    if (user) {
      try {
        await updateCountry(user.uid, code);
      } catch {
        // The local choice remains usable in beta mode without Firebase.
      }
    }
  }

  useEffect(() => {
    if (!user) {
      const savedCountry = window.localStorage.getItem("la-mesa-country");
      if (savedCountry) {
        window.setTimeout(() => {
          setCountry(getCountryProfile(savedCountry));
        }, 0);
      }
      return;
    }

    return subscribeToPlayer(user.uid, (player) => {
      if (localOverride.current && player?.country !== localOverride.current) return;
      if (localOverride.current === player?.country) localOverride.current = null;
      setCountry(getCountryProfile(player?.country));
    });
  }, [user]);

  return <CountryContext.Provider value={{ country, changeCountry }}>{children}</CountryContext.Provider>;
}

export function useCountry() {
  return useContext(CountryContext);
}
