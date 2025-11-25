import { ChangeEvent } from "react";

type Option = { label: string; value: string };

type ToggleGroupProps = {
  label: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  options: Option[];
};

export const ToggleGroup = ({ label, name, value, onChange, options }: ToggleGroupProps) => (
  <fieldset className="space-y-3">
    <legend className="flex items-center gap-2 px-1 text-sm font-bold text-slate-700">
      <span>{label}</span>
      <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 text-xs font-semibold text-slate-500">
        i
      </span>
    </legend>
    <div className="flex flex-col gap-3 sm:flex-row">
      {options.map((option) => {
        const isActive = value === option.value;
        return (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-3 text-sm font-medium text-slate-600"
          >
            <span className="relative flex h-4 w-4 items-center justify-center">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isActive}
                onChange={onChange}
                className="h-4 w-4 cursor-pointer appearance-none rounded-full border-2 border-slate-300 bg-white transition-all checked:border-sky-500 checked:bg-sky-500"
              />
              {isActive && (
                <span className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-white" />
              )}
            </span>
            <span>{option.label}</span>
          </label>
        );
      })}
    </div>
  </fieldset>
);

