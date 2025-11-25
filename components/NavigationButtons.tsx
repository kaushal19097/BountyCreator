import { Button } from "./Button";

type NavigationButtonsProps = {
  onBack?: () => void;
  backLabel?: string;
  nextLabel?: string;
  isNextDisabled?: boolean;
  showBack?: boolean;
  showSaveDraft?: boolean;
  onSaveDraft?: () => void;
};

export const NavigationButtons = ({
  onBack,
  backLabel = "Back",
  nextLabel = "Next",
  isNextDisabled = false,
  showBack = true,
  showSaveDraft = false,
  onSaveDraft,
}: NavigationButtonsProps) => {
  return (
    <div className="flex justify-between pt-4">
      <div>
        {showBack && (
          <Button type="button" variant="secondary" onClick={onBack}>
            {backLabel}
          </Button>
        )}
        {showSaveDraft && (
          <Button type="button" variant="secondary" onClick={onSaveDraft}>
            Save as draft
          </Button>
        )}
      </div>
      <Button type="submit" disabled={isNextDisabled}>
        {nextLabel}
      </Button>
    </div>
  );
};

