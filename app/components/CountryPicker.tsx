"use client";

import Select from "react-select";
import { countryProfiles } from "@/lib/country-profile";

type Props = {
  value: string;
  onChange: (country: string) => void;
};

const options = countryProfiles.map((country) => ({
  value: country.code,
  label: `${country.flag} ${country.name}`,
}));

export default function CountryPicker({
  value,
  onChange,
}: Props) {
  return (
    <Select
      options={options}
      value={options.find((o) => o.value === value)}
      onChange={(option) => {
        if (option) {
          onChange(option.value);
        }
      }}
      isSearchable
      placeholder="Select your country..."
      formatOptionLabel={(option) => (
        <div className="flex items-center gap-3">
          <span>{option.label}</span>
        </div>
      )}
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: "#0f172a",
          borderColor: "#334155",
          minHeight: 52,
        }),

        menu: (base) => ({
          ...base,
          backgroundColor: "#0f172a",
        }),

        option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused
            ? "#1e293b"
            : "#0f172a",
          color: "white",
          cursor: "pointer",
        }),

        singleValue: (base) => ({
          ...base,
          color: "white",
        }),

        input: (base) => ({
          ...base,
          color: "white",
        }),

        placeholder: (base) => ({
          ...base,
          color: "#94a3b8",
        }),
      }}
    />
  );
}
