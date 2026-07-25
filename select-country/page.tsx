"use client";

import CountryCard from "@/components/CountryCard";
import { countries } from "@/lib/countries";
import { useCountry } from "@/store/useCountry";

export default function SelectCountryPage() {
  const { country, setCountry } = useCountry();

  return (
    <main className="min-h-screen bg-slate-950 p-10 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-5xl font-bold">
          Elige tu país
        </h1>

        <p className="mt-3 text-slate-400">
          Personalizaremos tu experiencia según tu cultura.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {countries.map((item) => (
            <CountryCard
              key={item.code}
              country={item}
              selected={country.code === item.code}
              onSelect={() => setCountry(item)}
            />
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">
            País seleccionado
          </h2>

          <p className="mt-4 text-4xl">
            {country.flag} {country.name}
          </p>

          <p className="mt-2 text-slate-400">
            {country.greeting}
          </p>
        </div>
      </div>
    </main>
  );
}