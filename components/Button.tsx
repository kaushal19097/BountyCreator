import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export const Button = ({ variant = "primary", className = "", children, ...props }: ButtonProps) => {
  const baseClasses =
    "cursor-pointer rounded-xl px-12 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60";
  const variantClasses =
    variant === "primary"
      ? "text-white hover:opacity-90"
      : "border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700";
  const primaryStyle = variant === "primary" ? { backgroundColor: "#0085FF" } : {};
  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} style={primaryStyle} {...props}>
      {children}
    </button>
  );
};

