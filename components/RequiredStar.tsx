type RequiredStarProps = {
  color?: "rose-500" | "rose-600" | "red-500" | "red-600";
  className?: string;
};

const colorClassMap: Record<string, string> = {
  "rose-500": "text-rose-500",
  "rose-600": "text-rose-600",
  "red-500": "text-red-500",
  "red-600": "text-red-600",
};

export const RequiredStar = ({ color = "rose-500", className = "" }: RequiredStarProps) => {
  const colorClass = colorClassMap[color] || "text-rose-500";
  const classes = className ? `${colorClass} ${className}` : colorClass;
  return <span className={classes}>*</span>;
};

