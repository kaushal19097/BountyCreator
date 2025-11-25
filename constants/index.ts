export const STEP_LABELS = ["Brief", "Criteria", "Microtasks", "Config", "Backer", "Rewards"] as const;
export const BOUNTY_TYPES = ["Content", "Design", "Development", "Marketing", "Other"] as const;
export const IMPACT_CORES = ["Water", "Earth", "Social", "Energy"] as const;
export const STEP_NUMBERS = [1, 2, 3, 4, 5, 6] as const;

export const MAX_TITLE = 40;
export const MAX_DESCRIPTION = 1000;
export const MAX_SPONSOR_NAME = 35;
export const MAX_SPONSOR_MESSAGE = 80;
export const MAX_IMPACT_CERTIFICATE_BRIEF = 100;

export const PROJECT_OPTIONS = [
  { label: "Sustainability Hub", value: "sustainability" },
  { label: "Climate Collective", value: "climate" },
  { label: "Innovation Guild", value: "innovation" },
];

export const BOUNTY_MODE_OPTIONS = [
  { label: "Digital Bounty", value: "digital" },
  { label: "Physical Bounty", value: "physical" },
];

export const SDG_OPTIONS = [
  { label: "SDG 1: No Poverty", value: "1" },
  { label: "SDG 2: Zero Hunger", value: "2" },
  { label: "SDG 3: Good Health and Well-being", value: "3" },
  { label: "SDG 4: Quality Education", value: "4" },
  { label: "SDG 5: Gender Equality", value: "5" },
];

export const CURRENCY_RATES: Record<string, number> = {
  INR: 0.012,
  USD: 1,
  EUR: 1.08,
};

