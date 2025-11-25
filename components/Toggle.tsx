type ToggleProps = {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export const Toggle = ({ label, description, checked, onChange }: ToggleProps) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <p className="text-sm font-bold text-slate-700">{label}</p>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`cursor-pointer relative h-6 w-11 rounded-full transition-colors ${
          checked ? "bg-orange-500" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
    {description && <p className="text-xs text-slate-400">{description}</p>}
  </div>
);

