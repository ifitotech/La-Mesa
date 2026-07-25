"use client";

import { Country } from "@/lib/countries";

type Props = {
  country: Country;
  selected: boolean;
  onSelect: () => void;
};

export default function CountryCard({
  country,
  selected,
  onSelect,
}: Props) {
  return (
    <button
      onClick={onSelect}
      className={`
        w-full rounded-3xl border p-6 text-left transition-all duration-300
        ${
          selected
            ? "border-blue-500 bg-blue-500/20 scale-[1.02]"
            : "border-slate-800 bg-slate-900 hover:border-slate-600 hover:bg-slate-800"
        }
      `}
    >
      <div className="text-5xl">{country.flag}</div>

      <h2 className="mt-4 text-xl font-bold">
        {country.name}
      </h2>

      <p className="mt-2 text-sm text-slate-400">
        {country.greeting}
      </p>
    </button>
  );
}