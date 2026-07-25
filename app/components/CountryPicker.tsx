"use client";

import Select from "react-select";
import ReactCountryFlag from "react-country-flag";

import { countries } from "@/services/countries";

type Props = {
  value: string;
  onChange: (country: string) => void;
};

const options = countries.map((country) => ({
  value: country.value,
  label: country.label,
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
          <ReactCountryFlag
            countryCode={option.value}
            svg
            style={{
              width: "1.5em",
              height: "1.5em",
            }}
          />

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