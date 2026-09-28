import { useState } from 'react';
import {
  RECOMMENDED_ACTIONS,
  RECOMMENDED_NEXT_STEP,
  WHY_THIS_MATTERS,
} from '@/data/mockData';
import { Badge } from '@/components/Badge';
import {
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Info,
  Check,
} from 'lucide-react';

interface RecommendationsProps {
  dynamicActions?: { id: number; label: string }[];
  dynamicNextStep?: string;
  dynamicWhyThisMatters?: string;
}

export function Recommendations({
  dynamicActions,
  dynamicNextStep,
  dynamicWhyThisMatters,
}: RecommendationsProps) {
  const actions = dynamicActions ?? RECOMMENDED_ACTIONS;
  const nextStep = dynamicNextStep ?? RECOMMENDED_NEXT_STEP;
  const whyThisMatters = dynamicWhyThisMatters ?? WHY_THIS_MATTERS;

  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [approved, setApproved] = useState(false);
  const [manualReview, setManualReview] = useState(false);
  const [error, setError] = useState(false);

  const toggleAction = (id: number) => {
    setError(false);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleApprove = () => {
    if (selected.size === 0) {
      setError(true);
      return;
    }
    setError(false);
    setApproved(true);
    setManualReview(false);
  };

  const handleManualReview = () => {
    setManualReview(true);
    setApproved(false);
    setError(false);
  };

  const selectedActions = actions.filter((a) => selected.has(a.id));

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-ink-500 mb-3">
          <Lightbulb className="w-4 h-4" />
          <span>Recommendations</span>
        </div>
        <h1 className="text-3xl font-bold text-ink-900 tracking-tight">Recommended Actions</h1>
        <p className="text-lg text-ink-500 mt-2">
          Suggested next steps for PM review.
        </p>
      </div>

      {/* Action Checkboxes */}
      <div className="card p-6 mb-6">
        <h3 className="text-sm font-semibold text-ink-900 mb-4">Select Actions to Approve</h3>
        <div className="space-y-2">
          {actions.map((action) => {
            const isSelected = selected.has(action.id);
            return (
              <button
                key={action.id}
                onClick={() => toggleAction(action.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all text-left ${
                  isSelected
                    ? 'border-brand-300 bg-brand-50/50'
                    : 'border-ink-100 hover:border-ink-200 hover:bg-ink-50/30'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'border-brand-500 bg-brand-500'
                      : 'border-ink-300 bg-white'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </div>
                <span
                  className={`text-sm ${
                    isSelected ? 'text-ink-900 font-medium' : 'text-ink-700'
                  }`}
                >
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 px-4 py-3 rounded-lg bg-red-50 border border-red-200">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <p className="text-sm text-red-700">Select at least one action before approval.</p>
          </div>
        )}
      </div>

      {/* Recommended Next Step */}
      <div className="card p-6 mb-6 border-violet-200 bg-violet-50/20">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
            <Lightbulb className="w-4 h-4 text-violet-600" />
          </div>
          <div>
            <Badge variant="ai">RECOMMENDED NEXT STEP</Badge>
            <p className="text-sm text-ink-800 leading-relaxed mt-2">
              {nextStep}
            </p>
          </div>
        </div>
      </div>

      {/* Why This Matters */}
      <div className="card p-6 mb-8">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-ink-100 flex items-center justify-center shrink-0">
            <Info className="w-4 h-4 text-ink-500" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-400 mb-1">
              Why This Matters
            </div>
            <p className="text-sm text-ink-700 leading-relaxed">{whyThisMatters}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleApprove}
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
        >
          <CheckCircle2 className="w-4 h-4" />
          APPROVE SELECTED ACTIONS
        </button>
        <button
          onClick={handleManualReview}
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-ink-50 text-ink-700 text-sm font-semibold rounded-lg border border-ink-200 transition-colors"
        >
          REVIEW MANUALLY
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Approval Result */}
      {approved && (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/50 p-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <Badge variant="human">
              <ShieldCheck className="w-3 h-3" />
              HUMAN APPROVAL
            </Badge>
            <span className="text-sm font-semibold text-emerald-700">
              ACTIONS APPROVED FOR PM REVIEW
            </span>
          </div>
          <div className="space-y-1.5 mb-4">
            {selectedActions.map((action) => (
              <div key={action.id} className="flex items-center gap-2 text-sm text-ink-700">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                {action.label}
              </div>
            ))}
          </div>
          <div className="pt-3 border-t border-emerald-200">
            <p className="text-xs text-ink-500 italic">
              No external systems were modified. This is a concept prototype.
            </p>
          </div>
        </div>
      )}

      {/* Manual Review Result */}
      {manualReview && (
        <div className="mt-6 rounded-xl border border-teal-200 bg-teal-50/50 p-5">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-teal-600" />
            <span className="text-sm font-semibold text-teal-700">Manual review selected.</span>
          </div>
          <p className="text-sm text-ink-600">AI recommendation → Human review</p>
        </div>
      )}
    </div>
  );
}
