import { useState } from 'react';
import { EXAMPLE_CHIPS, analyzeChange, type AnalysisResult } from '@/data/changeAnalysis';
import { Badge } from '@/components/Badge';
import {
  Sparkles,
  ArrowRight,
  FileText,
  Wand2,
  Loader2,
  CheckCircle2,
  Brain,
  GitBranch,
  Users,
  Calendar,
  AlertTriangle,
} from 'lucide-react';

interface ProposedChangeProps {
  onAnalyzed: (input: string, result: AnalysisResult) => void;
}

const LOADING_STEPS = [
  { label: 'Analyzing change', icon: Brain },
  { label: 'Mapping affected teams', icon: Users },
  { label: 'Tracing dependencies', icon: GitBranch },
  { label: 'Estimating effort', icon: Calendar },
  { label: 'Assessing delivery impact', icon: AlertTriangle },
];

export function ProposedChange({ onAnalyzed }: ProposedChangeProps) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const handleAnalyze = () => {
    if (!input.trim()) return;
    setLoading(true);
    setStepIndex(0);

    const stepInterval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= LOADING_STEPS.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 500);

    setTimeout(() => {
      clearInterval(stepInterval);
      const result = analyzeChange(input);
      setLoading(false);
      onAnalyzed(input, result);
    }, 2800);
  };

  if (loading) {
    const currentStep = LOADING_STEPS[stepIndex];
    return (
      <div className="max-w-3xl mx-auto px-8 py-16">
        <div className="card p-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
          </div>
          <h2 className="text-xl font-bold text-ink-900 mb-2">Analyzing Change Impact</h2>
          <p className="text-sm text-ink-500 mb-8">
            AI-assisted analysis in progress. No external systems are being modified.
          </p>
          <div className="space-y-2 max-w-md mx-auto text-left">
            {LOADING_STEPS.map((step, i) => {
              const Icon = step.icon;
              const isDone = i < stepIndex;
              const isActive = i === stepIndex;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-brand-50 border border-brand-200'
                      : isDone
                      ? 'bg-emerald-50/50'
                      : 'bg-ink-50 border border-ink-100'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : isActive ? (
                    <Loader2 className="w-4 h-4 text-brand-500 animate-spin shrink-0" />
                  ) : (
                    <Icon className="w-4 h-4 text-ink-300 shrink-0" />
                  )}
                  <span
                    className={`text-sm ${
                      isActive
                        ? 'text-brand-700 font-medium'
                        : isDone
                        ? 'text-ink-600'
                        : 'text-ink-400'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-ink-500 mb-3">
          <Wand2 className="w-4 h-4" />
          <span>Proposed Change</span>
        </div>
        <h1 className="text-3xl font-bold text-ink-900 tracking-tight mb-2">
          Proposed Change
        </h1>
        <p className="text-lg text-ink-500">
          Describe the implementation or requirement change you are considering.
        </p>
      </div>

      {/* Input Card */}
      <div className="card p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-brand-500" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold text-ink-900 mb-1">
              Change Description
            </label>
            <p className="text-xs text-ink-500 mb-3">
              Describe the change in natural language. The system will identify affected teams, tasks, and delivery impact.
            </p>
          </div>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Biometric authentication is now required for V1 before production launch."
          className="w-full min-h-[120px] px-4 py-3 text-sm text-ink-800 bg-ink-50 border border-ink-200 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400 transition-colors leading-relaxed"
        />

        {/* Example chips */}
        <div className="mt-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-ink-400 mb-2">
            Examples
          </div>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_CHIPS.map((chip) => (
              <button
                key={chip}
                onClick={() => setInput(chip)}
                className="px-3 py-1.5 text-xs font-medium text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-full transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Principle */}
      <div className="rounded-xl border border-violet-200 bg-violet-50/30 p-4 mb-6">
        <div className="flex items-center gap-2">
          <Badge variant="ai">
            <Sparkles className="w-3 h-3" />
            AI RECOMMENDATION
          </Badge>
          <span className="text-sm text-ink-600">AI recommends. Human approves.</span>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleAnalyze}
        disabled={!input.trim()}
        className="group inline-flex items-center gap-2 px-6 py-3.5 bg-brand-500 hover:bg-brand-600 disabled:bg-ink-300 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
      >
        <Sparkles className="w-4 h-4" />
        ANALYZE CHANGE IMPACT
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}
