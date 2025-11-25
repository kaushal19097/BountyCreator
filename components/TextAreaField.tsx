import { ChangeEvent } from "react";

type TextAreaFieldProps = {
  maxLength?: number;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  showCharCount?: boolean;
  charCountLabel?: string;
  height?: string;
  className?: string;
};

export const TextAreaField = ({
  maxLength,
  placeholder,
  value,
  onChange,
  showCharCount = false,
  charCountLabel,
  height = "h-32",
  className = "",
}: TextAreaFieldProps) => (
  <>
    <textarea
      required
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${height} w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100 ${className}`}
    />
    {showCharCount && maxLength && (
      <p className="mt-2 text-right text-xs text-slate-400">
        {charCountLabel || "character limit"}: {value.length}/{maxLength}
      </p>
    )}
  </>
);

