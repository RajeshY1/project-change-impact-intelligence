import { WORK_ITEMS, TRACEABILITY, PROJECT } from '@/data/mockData';
import { ImpactBadge, Badge } from '@/components/Badge';
import { AlertTriangle, ArrowDown, ArrowRight, Lightbulb, GitBranch } from 'lucide-react';

interface ExplainImpactProps {
  onRecommendations: () => void;
}

function TraceNode({ label, type }: { label: string; type: string }) {
  const styles: Record<string, string> = {
    change: 'bg-brand-50 text-brand-700 border-brand-200',
    work: 'bg-white text-ink-800 border-ink-200',
    owner: 'bg-teal-50 text-teal-700 border-teal-200',
    milestone: 'bg-ink-900 text-white border-ink-900',
    risk: 'bg-orange-50 text-orange-700 border-orange-200',
  };
  return (
    <div
      className={`px-4 py-2.5 rounded-lg border text-sm font-medium text-center min-w-[220px] shadow-sm ${styles[type]}`}
    >
      {label}
    </div>
  );
}

export function ExplainImpact({ onRecommendations }: ExplainImpactProps) {
  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-ink-500 mb-3">
          <AlertTriangle className="w-4 h-4" />
          <span>Explain Impact</span>
        </div>
        <h1 className="text-3xl font-bold text-ink-900 tracking-tight">
          Why are these items affected?
        </h1>
      </div>

      {/* Before / After reminder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="card p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-ink-400 mb-1">
            Before
          </div>
          <p className="text-sm text-ink-600 leading-relaxed line-through decoration-ink-300">
            {PROJECT.originalRequirement}
          </p>
        </div>
        <div className="card p-4 border-brand-200 bg-brand-50/30">
          <div className="text-xs font-semibold uppercase tracking-wider text-brand-600 mb-1">
            After
          </div>
          <p className="text-sm text-ink-900 leading-relaxed font-medium">
            {PROJECT.newRequirement}
          </p>
        </div>
      </div>

      {/* Affected Items with Reasons */}
      <div className="card p-6 mb-6">
        <h3 className="text-sm font-semibold text-ink-900 mb-4">Affected Items & Reasons</h3>
        <div className="space-y-3">
          {WORK_ITEMS.map((item) => (
            <div
              key={item.id}
              className="border border-ink-100 rounded-lg overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 bg-ink-50/50">
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`text-xs font-mono font-semibold px-2 py-1 rounded ${
                      item.type === 'MILESTONE'
                        ? 'text-ink-700 bg-ink-200'
                        : 'text-brand-600 bg-brand-50'
                    }`}
                  >
                    {item.id}
                  </span>
                  <span className="text-sm font-semibold text-ink-900 truncate">
                    {item.title}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-ink-500 hidden sm:inline">{item.owner}</span>
                  <ImpactBadge level={item.impact} />
                </div>
              </div>
              <div className="px-4 py-3 bg-white">
                <div className="flex items-start gap-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-ink-400 mt-0.5 shrink-0">
                    Reason
                  </div>
                  <p className="text-sm text-ink-700 leading-relaxed">{item.reason}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Traceability */}
      <div className="card p-6 mb-6">
        <div className="flex items-center gap-2 mb-5">
          <GitBranch className="w-4 h-4 text-ink-500" />
          <h3 className="text-sm font-semibold text-ink-900">Traceability</h3>
        </div>
        <div className="flex flex-col items-center">
          {TRACEABILITY.map((node, i) => (
            <div key={i} className="w-full flex flex-col items-center">
              <TraceNode label={node.label} type={node.type} />
              {i < TRACEABILITY.length - 1 && (
                <div className="py-1.5">
                  <ArrowDown className="w-4 h-4 text-ink-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendation Principle */}
      <div className="rounded-xl border border-violet-200 bg-violet-50/50 p-5 mb-8">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
            <Lightbulb className="w-4 h-4 text-violet-600" />
          </div>
          <div>
            <Badge variant="ai">AI RECOMMENDATION</Badge>
            <p className="text-sm text-ink-700 leading-relaxed mt-2">
              AI recommends. Human approves.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onRecommendations}
        className="group inline-flex items-center gap-2 px-6 py-3.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
      >
        VIEW RECOMMENDATIONS
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}
