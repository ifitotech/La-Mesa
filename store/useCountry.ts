"use client";

import { create } from "zustand";
import { Country, countries } from "@/lib/countries";

type CountryStore = {
  country: Country;
  setCountry: (country: Country) => void;
};

export const useCountry = create<CountryStore>((set) => ({
  country: countries[0],
  setCountry: (country) => set({ country }),
}));