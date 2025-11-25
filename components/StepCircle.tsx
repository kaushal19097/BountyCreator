type StepCircleProps = {
  num: number | string;
  isActive: boolean;
  isCompleted: boolean;
};

export const StepCircle = ({ num, isActive, isCompleted }: StepCircleProps) => {
  if (isCompleted) {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-300 bg-sky-50 text-base font-bold text-sky-600">
        ✓
      </span>
    );
  }

  if (isActive) {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-sky-500 bg-white text-sm font-semibold text-sky-600">
        {num}
      </span>
    );
  }

  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-900">
      {num}
    </span>
  );
};

