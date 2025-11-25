"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";

import {
  BOUNTY_MODE_OPTIONS,
  BOUNTY_TYPES,
  CURRENCY_RATES,
  IMPACT_CORES,
  MAX_DESCRIPTION,
  MAX_IMPACT_CERTIFICATE_BRIEF,
  MAX_SPONSOR_MESSAGE,
  MAX_SPONSOR_NAME,
  MAX_TITLE,
  PROJECT_OPTIONS,
  SDG_OPTIONS,
  STEP_LABELS,
  STEP_NUMBERS,
} from "../constants";

import { Button } from "../components/Button";
import { CurrencySelect } from "../components/CurrencySelect";
import { Dropdown } from "../components/Dropdown";
import { FileUpload } from "../components/FileUpload";
import { InputField } from "../components/InputField";
import { NavigationButtons } from "../components/NavigationButtons";
import { RequiredStar } from "../components/RequiredStar";
import { StepCircle } from "../components/StepCircle";
import { TextAreaField } from "../components/TextAreaField";
import { Toggle } from "../components/Toggle";
import { ToggleGroup } from "../components/ToggleGroup";

type BountyMode = "digital" | "physical";
type FormState = {
  title: string;
  description: string;
  bountyType: string;
  impactCore: string;
  mode: BountyMode;
  location: string;
  radius: string;
  project: string;
  budgetCurrency: string;
  budgetAmount: string;
  numberOfWinners: string;
  winnerReward: string;
  expirationDate: string;
  estimatedDays: string;
  estimatedHours: string;
  estimatedMinutes: string;
  maxImpactPoints: string;
  failureThreshold: string;
  hasImpactCertificate: boolean;
  impactCertificateBrief: string;
  sdgs: string;
  hasSponsor: boolean;
  sponsorName: string;
  sponsorLogo: File | null;
  sponsorMessage: string;
};

const INITIAL_FORM_STATE: FormState = {
  title: "",
  description: "",
  bountyType: "",
  impactCore: "",
  mode: "digital",
  location: "",
  radius: "50",
  project: "",
  budgetCurrency: "USD",
  budgetAmount: "",
  numberOfWinners: "",
  winnerReward: "",
  expirationDate: "",
  estimatedDays: "0",
  estimatedHours: "0",
  estimatedMinutes: "0",
  maxImpactPoints: "175",
  failureThreshold: "",
  hasImpactCertificate: false,
  impactCertificateBrief: "",
  sdgs: "",
  hasSponsor: true,
  sponsorName: "",
  sponsorLogo: null,
  sponsorMessage: "",
};

export default function Home() {
  const router = useRouter();
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPublished, setIsPublished] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [resultPayload, setResultPayload] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [redirectCountdown, setRedirectCountdown] = useState(3);

  const isPhysical = formState.mode === "physical";

  const validateStep = (step: number): string[] => {
    const errors: string[] = [];

    if (step === 0) {
      if (!formState.title.trim()) {
        errors.push("Title is required");
      } else if (formState.title.trim().length > MAX_TITLE) {
        errors.push(`Title must be ${MAX_TITLE} characters or less`);
      }
      if (!formState.description.trim()) {
        errors.push("Description is required");
      }
      if (isPhysical && !formState.location.trim()) {
        errors.push("Location is required for physical bounties");
      }
      if (!formState.project.trim()) {
        errors.push("Project is required");
      }
      if (!formState.bountyType.trim()) {
        errors.push("Bounty Type is required");
      }
      if (!formState.impactCore.trim()) {
        errors.push("Dominant Impact Core is required");
      }
    }

    if (step === 1) {
      const budget = parseFloat((formState.budgetAmount || "").replace(/,/g, "")) || 0;
      const winners = parseFloat(formState.numberOfWinners || "0") || 0;

      if (!formState.budgetAmount.trim()) {
        errors.push("Budget amount is required");
      } else if (budget <= 0) {
        errors.push("Amount must be greater than 0");
      }
      if (!formState.numberOfWinners.trim()) {
        errors.push("Number of winners is required");
      } else if (winners <= 0) {
        errors.push("Number of winners must be greater than 0");
      }
      if (!formState.expirationDate.trim()) {
        errors.push("Expiration date is required");
      }
      if (formState.hasImpactCertificate) {
        if (!formState.impactCertificateBrief.trim()) {
          errors.push("Impact Certificate Brief is required");
        }
      }
    }

    if (step === 2) {
      if (formState.hasSponsor) {
        if (!formState.sponsorName.trim()) {
          errors.push("Backer name is required");
        }
        if (!formState.sponsorLogo) {
          errors.push("Backer logo is required");
        }
      }
    }

    return errors;
  };

  const isStepValid = useMemo(() => {
    if (currentStep === 0) {
      if (!formState.title.trim() || !formState.description.trim()) return false;
      if (formState.title.trim().length > MAX_TITLE) return false;
      if (!formState.project.trim()) return false;
      if (!formState.bountyType.trim()) return false;
      if (!formState.impactCore.trim()) return false;
      if (isPhysical && !formState.location.trim()) return false;
      return true;
    }
    if (currentStep === 1) {
      const budget = parseFloat((formState.budgetAmount || "").replace(/,/g, "")) || 0;
      const winners = parseFloat(formState.numberOfWinners || "0") || 0;
      
      if (!(formState.budgetAmount || "").trim() || budget <= 0) return false;
      if (!(formState.numberOfWinners || "").trim() || winners <= 0) return false;
      if (!formState.expirationDate.trim()) return false;
      if (formState.hasImpactCertificate && !(formState.impactCertificateBrief || "").trim()) return false;
      return true;
    }
    if (currentStep === 2) {
      if (formState.hasSponsor) {
        if (!formState.sponsorName.trim() || !formState.sponsorLogo) return false;
      }
      return true;
    }
    return true;
  }, [formState, isPhysical, currentStep]);

  const handleChange = (field: keyof FormState) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const value = event.target.value;
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggle = (field: keyof FormState, value: boolean) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (file: File | null) => {
    setFormState((prev) => ({ ...prev, sponsorLogo: file }));
  };

  const usdAmount = useMemo(() => {
    const amount = parseFloat((formState.budgetAmount || "").replace(/,/g, "")) || 0;
    const rate = CURRENCY_RATES[formState.budgetCurrency] || 1;
    return Math.round(amount * rate);
  }, [formState.budgetAmount, formState.budgetCurrency]);

  const calculatedWinnerReward = useMemo(() => {
    const budget = parseFloat((formState.budgetAmount || "").replace(/,/g, "")) || 0;
    const winners = parseFloat(formState.numberOfWinners || "0") || 0;
    if (winners > 0) {
      return Math.round(budget / winners);
    }
    return 0;
  }, [formState.budgetAmount, formState.numberOfWinners]);

  useEffect(() => {
    if (currentStep === 5) {
      setFormState((prev) => ({ ...prev, winnerReward: calculatedWinnerReward.toString() }));
    }
  }, [calculatedWinnerReward, currentStep]);

  useEffect(() => {
    if (validationErrors.length > 0 && isStepValid) {
      setValidationErrors([]);
    }
  }, [isStepValid, validationErrors.length]);

  const buildPayload = () => {
    const budget = parseFloat((formState.budgetAmount || "").replace(/,/g, "")) || 0;
    const winners = parseFloat(formState.numberOfWinners || "0") || 0;
    const reward = Math.round(budget / winners);

    const payload: any = {
      title: formState.title,
      description: formState.description,
      projectTitle: formState.project,
      type: formState.bountyType,
      dominant_core: formState.impactCore,
      mode: formState.mode,
      reward: {
        currency: formState.budgetCurrency,
        amount: budget,
        winners: winners,
      },
      timeline: {
        expiration_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        estimated_completion: {
          days: 2,
          hours: 4,
          minutes: 0,
        },
      },
      hasImpactCertificate: formState.hasImpactCertificate,
      has_backer: formState.hasSponsor,
      terms_accepted: true,
    };

    if (formState.mode === "physical") {
      payload.location = formState.location;
    }

    if (formState.hasImpactCertificate) {
      payload.impactBriefMessage = formState.impactCertificateBrief;
    }

    if (formState.hasSponsor) {
      payload.backer = {
        name: formState.sponsorName,
        logo: formState.sponsorLogo ? URL.createObjectURL(formState.sponsorLogo) : null,
        message: formState.sponsorMessage,
      };
    }

    return payload;
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    setShowConfirmation(false);

    setTimeout(() => {
      const payload = buildPayload();
      setResultPayload(payload);
      setIsSubmitting(false);
      setIsPublished(true);
      setRedirectCountdown(3);
      
      localStorage.setItem("bountyPayload", JSON.stringify(payload));
    }, 2000);
  };

  useEffect(() => {
    if (isPublished && redirectCountdown > 0) {
      const timer = setTimeout(() => {
        setRedirectCountdown(redirectCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isPublished && redirectCountdown === 0) {
      router.push("/success");
    }
  }, [isPublished, redirectCountdown, router]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const errors = validateStep(currentStep);
    if (errors.length > 0) {
      setValidationErrors(errors);
      setTimeout(() => setValidationErrors([]), 5000);
      return;
    }

    setValidationErrors([]);

    if (currentStep === 0) {
      setCurrentStep(4);
    } else if (currentStep === 4) {
      setCurrentStep(5);
    } else if (currentStep === 5) {
      setShowConfirmation(true);
    }
  };

  if (isSubmitting) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-10 bg-white">
        <div className="flex w-full max-w-2xl flex-col items-center justify-center space-y-8 rounded-3xl bg-white p-12 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-sky-500"></div>
            <p className="text-lg font-medium text-slate-700">Submitting bounty...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isPublished && resultPayload) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-10 bg-white">
        <div className="flex w-full max-w-4xl flex-col space-y-8 rounded-3xl bg-white p-12 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col items-center space-y-6">
            <h1 className="text-center text-2xl font-bold text-slate-900">
              Bounty is published and live on Impact Miner!
            </h1>
            <div className="flex items-center justify-center">
              <Image
                src="/b9dec21cc7681a1b8f0ba7c292a0d7b1172ca87b.gif"
                alt="Fist bump celebration"
                width={400}
                height={300}
                className="object-contain"
                unoptimized
              />
            </div>
            <p className="text-lg font-medium text-slate-700">
              Redirecting in {redirectCountdown}...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-xl font-bold text-slate-900">Confirm Bounty Creation</h3>
            <p className="mb-6 text-sm text-slate-600">
              Are you sure you want to create this bounty? Please review all details before submitting.
            </p>
            <div className="mb-6 flex items-center gap-2">
              <input
                type="checkbox"
                id="terms-checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-sky-500 focus:ring-2 focus:ring-sky-500"
              />
              <label htmlFor="terms-checkbox" className="text-sm text-slate-700">
                I accept the terms and conditions
              </label>
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setShowConfirmation(false);
                  setTermsAccepted(false);
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleFinalSubmit}
                className="flex-1"
                disabled={!termsAccepted}
              >
                Create Bounty
              </Button>
            </div>
          </div>
        </div>
      )}
      {validationErrors.length > 0 && (
        <div
          className="fixed top-4 left-1/2 z-50 -translate-x-1/2"
          style={{
            animation: "slideDown 0.3s ease-out",
          }}
        >
          <div className="rounded-xl border-2 border-rose-500 bg-rose-50 p-4 shadow-lg">
            <div className="flex flex-col gap-2">
              {validationErrors.map((error, index) => (
                <p key={index} className="text-sm font-medium text-rose-600">
                  {error}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="flex min-h-screen justify-center px-4 py-10 text-slate-900" style={{ background: "#F7F7F7" }}>
      <main className="flex w-full max-w-5xl flex-col gap-8 rounded-3xl p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] lg:flex-row lg:gap-12" style={{ background: "#F7F7F7" }}>
        <aside className="mt-[140px] flex flex-row justify-between text-sm font-medium text-slate-500 lg:flex-col lg:justify-start lg:text-base">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Bounty Steps</p>
            <ol className="space-y-3">
              {STEP_LABELS.map((label, index) => {
                const isCurrent = index === currentStep;
                return (
                  <li
                    key={label}
                    className={`text-base ${isCurrent ? "font-bold text-sky-500" : "font-normal text-slate-400"}`}
                  >
                    {index + 1}. {label}
                  </li>
                );
              })}
            </ol>
          </div>
        </aside>

        <section className="flex-1 rounded-3xl border border-slate-100 p-6 shadow-sm sm:p-8" style={{ background: "#F7F7F7" }}>
          <header className="mb-10">
            <div className="flex justify-center">
              <div className="flex gap-3">
                {STEP_NUMBERS.map((num) => {
                  const stepIndex = num - 1;
                  const isActive = stepIndex === currentStep;
                  const isCompleted = stepIndex < currentStep;
                  return (
                    <StepCircle
                      key={num}
                      num={num}
                      isActive={isActive}
                      isCompleted={isCompleted}
                    />
                  );
                })}
              </div>
            </div>
          </header>

          {currentStep === 0 && (
            <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 font-bold flex items-center text-sm text-slate-700">
                <span>Bounty Title</span>
                <RequiredStar className="ml-2" />
              </label>
              <InputField
                type="text"
                maxLength={MAX_TITLE}
                placeholder="Bounty Title"
                value={formState.title}
                onChange={handleChange("title")}
                variant="title"
                showCharCount={true}
                charCountLabel="character limit"
              />
            </div>

            <div>
              <label className="mb-2 font-bold flex items-center text-sm text-slate-700">
                <span>Bounty Description</span>
                <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 text-xs font-semibold text-slate-500">
                  i
                </span>
              </label>
              <TextAreaField
                maxLength={MAX_DESCRIPTION}
                placeholder="Briefly describe what the bounty does"
                value={formState.description}
                onChange={handleChange("description")}
                showCharCount={true}
                charCountLabel="character limit"
              />
            </div>

            <Dropdown
              label="Project"
              placeholder="Choose a project to link the bounty"
              value={formState.project}
              onChange={handleChange("project")}
              options={PROJECT_OPTIONS}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Dropdown
                label="Bounty Type"
                placeholder="Choose category"
                value={formState.bountyType}
                onChange={handleChange("bountyType")}
                options={BOUNTY_TYPES.map((type) => ({
                  label: type,
                  value: type.toLowerCase(),
                }))}
              />
              <Dropdown
                label="Dominant Impact Core"
                placeholder="Choose core"
                value={formState.impactCore}
                onChange={handleChange("impactCore")}
                options={IMPACT_CORES.map((core) => ({
                  label: core,
                  value: core.toLowerCase(),
                }))}
              />
            </div>

            <ToggleGroup
              label="Bounty Mode"
              name="bounty-mode"
              value={formState.mode}
              onChange={handleChange("mode")}
              options={BOUNTY_MODE_OPTIONS}
            />
            {isPhysical && (
              <div className="space-y-4 rounded-2xl border border-slate-200 p-5" style={{ background: "#F7F7F7" }}>
                <label className="mb-1 flex items-center text-sm font-bold text-slate-800">
                  Enter Location
                  <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 text-xs font-semibold text-slate-500">
                    i
                  </span>
                </label>

                <div>
                  <p className="mb-2 text-sm font-medium text-slate-700">City/Town where the bounty is live*?</p>
                  <InputField
                    type="text"
                    label=""
                    maxLength={120}
                    placeholder="Type in the location where the bounty should be available"
                    value={formState.location}
                    onChange={handleChange("location")}
                  />
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-slate-200">
                  <Image
                    src="/1b5a4c78ed930e5f9d6e2dd0fbe2631fe53b14d6.png"
                    alt="Map showing bounty radius"
                    width={640}
                    height={360}
                    className="h-full w-full object-cover"
                    priority
                  />
                  <p className="absolute bottom-3 left-4 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-700">
                    Click to change position of marker
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-sm font-bold text-slate-700">Enter Bounty Radius (in Kms)*</p>
                  <InputField
                    type="number"
                    label=""
                    placeholder="50"
                    value={formState.radius}
                    onChange={handleChange("radius")}
                  />
                </div>
              </div>
            )}

            <NavigationButtons
              showBack={false}
              showSaveDraft={true}
              onSaveDraft={() => {
                console.log("Save as draft clicked");
              }}
              nextLabel="Next"
              isNextDisabled={!isStepValid}
            />
          </form>
          )}

          {currentStep === 4 && (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Toggle
                label="Does the bounty have a sponsor or backer?"
                description="Select this option if you wish to display the bounty sponsor/backer's logo and name on the bounty"
                checked={formState.hasSponsor}
                onChange={(checked) => handleToggle("hasSponsor", checked)}
              />

              {formState.hasSponsor && (
                <>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Enter sponsor or backer's name <RequiredStar />
                    </label>
                    <InputField
                      type="text"
                      maxLength={MAX_SPONSOR_NAME}
                      required={formState.hasSponsor}
                      placeholder="Mention the name that will appear on bounties & impact certs"
                      value={formState.sponsorName}
                      onChange={handleChange("sponsorName")}
                      showCharCount={true}
                      charCountLabel="(character limit"
                    />
                  </div>

                  <FileUpload
                    label="Upload sponsor or backer's logo"
                    required={formState.hasSponsor}
                    value={formState.sponsorLogo}
                    onFileChange={handleFileChange}
                  />

                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Enter Sponsor Message</label>
                    <InputField
                      type="text"
                      maxLength={MAX_SPONSOR_MESSAGE}
                      required={false}
                      placeholder="Add sponsor message if any, optional"
                      value={formState.sponsorMessage}
                      onChange={handleChange("sponsorMessage")}
                      showCharCount={true}
                      charCountLabel="(character limit"
                    />
                  </div>
                </>
              )}

              <NavigationButtons
                onBack={() => setCurrentStep(0)}
                nextLabel="Next"
                isNextDisabled={!isStepValid}
              />
            </form>
          )}

          {currentStep === 5 && (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-slate-900">Bounty Reward</h2>
                <p className="text-sm text-slate-500">Choose bounty reward token and set the amount</p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  What is your budget for this bounty?<RequiredStar className="ml-2" />
                </label>
                <div className="flex gap-3">
                  <CurrencySelect
                    value={formState.budgetCurrency}
                    onChange={handleChange("budgetCurrency")}
                  />
                  <div className="flex-1">
                    <InputField
                      type="number"
                      placeholder="12,000"
                      value={formState.budgetAmount}
                      onChange={handleChange("budgetAmount")}
                      required={true}
                    />
                    <p className="mt-1 text-right text-sm text-slate-400">in USD: {usdAmount}</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  How many winners?<RequiredStar />
                </label>
                <InputField
                  type="number"
                  placeholder="10"
                  value={formState.numberOfWinners}
                  onChange={handleChange("numberOfWinners")}
                  required={true}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Each winner will be awarded:<RequiredStar />
                </label>
                <InputField
                  type="number"
                  placeholder=""
                  value={calculatedWinnerReward.toString() || ""}
                  onChange={() => {}}
                  readOnly={true}
                  required={false}
                />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-700">
                  Maximum Impact Points allocated: <span className="text-slate-900 text-[16px]">{formState.maxImpactPoints}</span>
                </p>
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                  <span>
                    Set Failure Threshold %<RequiredStar />
                  </span>
                  <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 text-[10px] font-semibold text-slate-500">
                    i
                  </span>
                </label>
                <InputField
                  type="number"
                  placeholder="Enter the pass %"
                  value={formState.failureThreshold}
                  onChange={handleChange("failureThreshold")}
                  required={true}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleToggle("hasImpactCertificate", !formState.hasImpactCertificate)}
                    className={`cursor-pointer relative h-6 w-11 rounded-full transition-colors ${
                      formState.hasImpactCertificate ? "bg-orange-500" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                        formState.hasImpactCertificate ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-slate-700">Impact Certificate</p>
                    <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 text-[10px] font-semibold text-slate-500">
                      i
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-400">Do you wish to issue impact certificates for this bounty?</p>
              </div>

              {formState.hasImpactCertificate && (
                <>
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                      <span>
                        Impact Certificate Brief<RequiredStar />
                      </span>
                      <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 text-[10px] font-semibold text-slate-500">
                        i
                      </span>
                    </label>
                    <TextAreaField
                      maxLength={MAX_IMPACT_CERTIFICATE_BRIEF}
                      value={formState.impactCertificateBrief}
                      onChange={handleChange("impactCertificateBrief")}
                      placeholder="Creating digital assets for fellow guild members"
                      height="h-24"
                    />
                    <p className="mt-2 text-right text-xs text-slate-400">Max 100 characters</p>
                  </div>

                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                      <span>
                        SDGs<RequiredStar />
                      </span>
                      <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 text-[10px] font-semibold text-slate-500">
                        i
                      </span>
                    </label>
                    <Dropdown
                      placeholder="Choose upto 4 secondary SDGs (optional)"
                      value={formState.sdgs}
                      onChange={handleChange("sdgs")}
                      options={SDG_OPTIONS}
                      showLabel={false}
                    />
                  </div>
                </>
              )}

              <NavigationButtons
                onBack={() => setCurrentStep(4)}
                nextLabel="Create Bounty"
                isNextDisabled={!isStepValid}
              />
            </form>
          )}
        </section>
      </main>
    </div>
    </>
  );
}
