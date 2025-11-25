import { ChangeEvent } from "react";

type InputFieldProps = {
  label?: string;
  maxLength?: number;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  variant?: "default" | "title";
  readOnly?: boolean;
  showCharCount?: boolean;
  charCountLabel?: string;
  className?: string;
  type?: "text" | "number";
};

export const InputField = ({
  label,
  maxLength,
  placeholder,
  value,
  onChange,
  required = true,
  variant = "default",
  readOnly = false,
  showCharCount = false,
  charCountLabel,
  className = "",
  type = "text",
}: InputFieldProps) => {
  const variantClasses =
    variant === "title"
      ? "h-16 rounded-2xl text-xl placeholder:text-2xl"
      : "rounded-xl text-sm";

  const readOnlyClasses = readOnly ? "cursor-pointer bg-slate-50" : "";

  return (
    <div>
      {label && <p className="mb-2 text-sm font-bold text-slate-700">{label}</p>}
      <input
        type={type}
        maxLength={type === "text" ? maxLength : undefined}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100 placeholder:text-slate-300 ${variantClasses} ${readOnlyClasses} ${className}`}
      />
      {showCharCount && maxLength && (
        <p className="mt-2 text-right text-xs text-slate-400">
          {charCountLabel ? `${charCountLabel}: ${value.length}/${maxLength})` : `character limit: ${value.length}/${maxLength}`}
        </p>
      )}
    </div>
  );
};

