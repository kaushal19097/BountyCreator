import { ChangeEvent } from "react";

type CurrencySelectProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export const CurrencySelect = ({ value, onChange }: CurrencySelectProps) => (
  <div className="relative">
    <select
      value={value}
      onChange={onChange}
      className="h-[48px] w-32 appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm font-medium text-slate-700 outline-none transition-all hover:border-slate-300 focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
    >
      <option value="INR">₹ INR</option>
      <option value="USD">$ USD</option>
      <option value="EUR">€ EUR</option>
      <option value="GBP">£ GBP</option>
    </select>
    <div className="pointer-events-none absolute right-3 top-[35%] -translate-y-1/2">
      <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
);

