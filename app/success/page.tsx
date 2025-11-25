"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
  const [payload, setPayload] = useState<any>(null);

  useEffect(() => {
    const storedPayload = localStorage.getItem("bountyPayload");
    if (storedPayload) {
      setPayload(JSON.parse(storedPayload));
    } else {
      router.push("/");
    }
  }, [router]);

  if (!payload) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-sky-500 mx-auto"></div>
          <p className="text-slate-600">Loading bounty details...</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    const symbols: Record<string, string> = {
      USD: "$",
      EUR: "€",
      INR: "₹",
      GBP: "£",
    };
    return `${symbols[currency] || currency} ${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 rounded-2xl bg-white p-8 shadow-lg">
          <div className="mb-6 border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold text-slate-900">Bounty Overview</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Title
                </label>
                <p className="text-lg font-semibold text-slate-900">{payload.title}</p>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Description
                </label>
                <p className="text-slate-700">{payload.description}</p>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Project
                </label>
                <p className="text-slate-700">{payload.projectTitle || "N/A"}</p>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Type
                  </label>
                  <span className="inline-block rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700">
                    {payload.type}
                  </span>
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Impact Core
                  </label>
                  <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                    {payload.dominant_core}
                  </span>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Mode
                </label>
                <span
                  className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                    payload.mode === "digital"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {payload.mode === "digital" ? "Digital" : "Physical"}
                </span>
                {payload.location && (
                  <p className="mt-1 text-sm text-slate-600">📍 {payload.location}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl bg-linear-to-br from-sky-50 to-blue-50 p-4">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Reward
                </label>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-sky-900">
                    {formatCurrency(payload.reward.amount, payload.reward.currency)}
                  </p>
                  <p className="text-sm text-slate-600">
                    {payload.reward.winners} {payload.reward.winners === 1 ? "winner" : "winners"}
                  </p>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Expiration Date
                </label>
                <p className="text-slate-700">{formatDate(payload.timeline.expiration_date)}</p>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Estimated Completion
                </label>
                <p className="text-slate-700">
                  {payload.timeline.estimated_completion.days > 0 && `${payload.timeline.estimated_completion.days}d `}
                  {payload.timeline.estimated_completion.hours > 0 && `${payload.timeline.estimated_completion.hours}h `}
                  {payload.timeline.estimated_completion.minutes > 0 && `${payload.timeline.estimated_completion.minutes}m`}
                  {payload.timeline.estimated_completion.days === 0 &&
                    payload.timeline.estimated_completion.hours === 0 &&
                    payload.timeline.estimated_completion.minutes === 0 &&
                    "Not specified"}
                </p>
              </div>

              {payload.hasImpactCertificate && (
                <div className="rounded-xl bg-amber-50 p-4">
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-amber-700">
                    Impact Certificate
                  </label>
                  <p className="text-sm text-amber-900">{payload.impactBriefMessage}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {payload.has_backer && payload.backer && (
          <div className="mb-6 rounded-2xl bg-white p-8 shadow-lg">
            <div className="mb-4 border-b border-slate-200 pb-4">
              <h2 className="text-xl font-bold text-slate-900">Backer Information</h2>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">{payload.backer.name}</h3>
              
              {payload.backer.message && (
                <p className="text-slate-600">{payload.backer.message}</p>
              )}
              
              {payload.backer.logo && (
                <div className="h-full w-full overflow-hidden rounded-lg bg-slate-100">
                  <img src={payload.backer.logo} alt="Backer logo" className="h-full w-full object-cover" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="rounded-xl cursor-pointer border border-slate-300 bg-white px-8 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Create Another Bounty
          </button>
          <button
            onClick={() => window.print()}
            className="rounded-xl cursor-pointer bg-sky-500 px-8 py-3 font-semibold text-white transition hover:bg-sky-600"
            style={{ backgroundColor: "#0085FF" }}
          >
            Print Details
          </button>
        </div>
    </div>
  );
}

