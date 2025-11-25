import { ChangeEvent } from "react";

type Option = { label: string; value: string };

type DropdownProps = {
  label?: string;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  className?: string;
  showLabel?: boolean;
};

export const Dropdown = ({
  label,
  placeholder,
  value,
  onChange,
  options,
  className = "",
  showLabel = true,
}: DropdownProps) => (
  <div>
    {label && showLabel && (
      <label className="mb-2 block text-sm font-bold text-slate-700">{label}</label>
    )}
    <select
      value={value}
      onChange={onChange}
      className={`w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100 ${className}`}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

