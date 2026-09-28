import {
  WORK_ITEMS,
  AFFECTED_TEAMS,
  DEPENDENCY_CHAIN,
  SECONDARY_DEPENDENCY,
  DELIVERY_RISK,
  PROJECT,
} from '@/data/mockData';
import { ImpactBadge, Badge } from '@/components/Badge';
import { ArrowRight, ArrowDown, GitBranch, Users, AlertTriangle, Sparkles } from 'lucide-react';

interface ImpactAnalysisProps {
  onExplain: () => void;
}

function ChainNode({ label, type }: { label: string; type: string }) {
  const styles: Record<string, string> = {
    change: 'bg-brand-50 text-brand-700 border-brand-200',
    work: 'bg-white text-ink-800 border-ink-200',
    milestone: 'bg-ink-900 text-white border-ink-900',
  };
  return (
    <div
      className={`px-4 py-2.5 rounded-lg border text-sm font-medium text-center min-w-[200px] shadow-sm ${styles[type]}`}
    >
      {label}
    </div>
  );
}

function ChainArrow() {
  return (
    <div className="flex justify-center py-1.5">
      <ArrowDown className="w-4 h-4 text-ink-300" />
    </div>
  );
}

export function ImpactAnalysis({ onExplain }: ImpactAnalysisProps) {
  const jiraItems = WORK_ITEMS.filter((w) => w.type === 'JIRA');
  const milestoneItems = WORK_ITEMS.filter((w) => w.type === 'MILESTONE');

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-ink-500 mb-3">
          <GitBranch className="w-4 h-4" />
          <span>Impact Analysis</span>
        </div>
        <h1 className="text-3xl font-bold text-ink-900 tracking-tight">Change Impact Analysis</h1>
      </div>

      {/* Before / After */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="card p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-ink-400 mb-2">
            Before
          </div>
          <p className="text-base text-ink-600 leading-relaxed line-through decoration-ink-300">
            {PROJECT.originalRequirement}
          </p>
        </div>
        <div className="card p-5 border-brand-200 bg-brand-50/30">
          <div className="text-xs font-semibold uppercase tracking-wider text-brand-600 mb-2">
            After
          </div>
          <p className="text-base text-ink-900 leading-relaxed font-medium">
            {PROJECT.newRequirement}
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="card p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-400 mb-1">
              Overall Impact
            </div>
            <div className="flex items-center gap-3">
              <ImpactBadge level="HIGH" />
              <span className="text-sm text-ink-500">Across project delivery</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center py-3 rounded-lg bg-ink-50 border border-ink-100">
            <div className="text-2xl font-bold text-ink-900">4</div>
            <div className="text-xs text-ink-500 mt-0.5">Work Items Affected</div>
          </div>
          <div className="text-center py-3 rounded-lg bg-ink-50 border border-ink-100">
            <div className="text-2xl font-bold text-ink-900">5</div>
            <div className="text-xs text-ink-500 mt-0.5">Teams Affected</div>
          </div>
          <div className="text-center py-3 rounded-lg bg-ink-50 border border-ink-100">
            <div className="text-2xl font-bold text-ink-900">1</div>
            <div className="text-xs text-ink-500 mt-0.5">Milestone Affected</div>
          </div>
        </div>
      </div>

      {/* Affected Work Items */}
      <div className="card p-6 mb-6">
        <h3 className="text-sm font-semibold text-ink-900 mb-4">Affected Work Items</h3>
        <div className="space-y-2">
          {jiraItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-3 px-4 rounded-lg border border-ink-100 hover:border-ink-200 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xs font-mono font-semibold text-brand-600 bg-brand-50 px-2 py-1 rounded">
                  {item.id}
                </span>
                <span className="text-sm font-medium text-ink-800 truncate">{item.title}</span>
              </div>
              <ImpactBadge level={item.impact} />
            </div>
          ))}
          {milestoneItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-3 px-4 rounded-lg border border-ink-200 bg-ink-50/50"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xs font-mono font-semibold text-ink-700 bg-ink-200 px-2 py-1 rounded">
                  {item.id}
                </span>
                <span className="text-sm font-semibold text-ink-900 truncate">{item.title}</span>
                <Badge variant="human">Milestone</Badge>
              </div>
              <ImpactBadge level={item.impact} />
            </div>
          ))}
        </div>
      </div>

      {/* Affected Teams */}
      <div className="card p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-ink-500" />
          <h3 className="text-sm font-semibold text-ink-900">Affected Teams</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {AFFECTED_TEAMS.map((team) => (
            <div
              key={team.name}
              className="px-4 py-2 rounded-lg border border-ink-200 bg-white text-sm font-medium text-ink-700"
            >
              {team.name}
            </div>
          ))}
        </div>
      </div>

      {/* Dependency Chain */}
      <div className="card p-6 mb-6">
        <h3 className="text-sm font-semibold text-ink-900 mb-5">Dependency Chain</h3>
        <div className="flex flex-col items-center">
          {DEPENDENCY_CHAIN.map((node, i) => (
            <div key={i} className="w-full flex flex-col items-center">
              <ChainNode label={node.label} type={node.type} />
              {i < DEPENDENCY_CHAIN.length - 1 && <ChainArrow />}
            </div>
          ))}
        </div>
        <div className="mt-6 pt-5 border-t border-ink-100">
          <div className="text-xs font-semibold uppercase tracking-wider text-ink-400 mb-3">
            Additional Dependency
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="px-4 py-2.5 rounded-lg border border-ink-200 bg-white text-sm font-medium shadow-sm">
              {SECONDARY_DEPENDENCY.from}
            </div>
            <ArrowRight className="w-4 h-4 text-ink-300" />
            <div className="px-4 py-2.5 rounded-lg border border-ink-200 bg-white text-sm font-medium shadow-sm">
              {SECONDARY_DEPENDENCY.to}
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Risk */}
      <div className="rounded-xl border border-orange-200 bg-orange-50/50 p-5 mb-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-orange-700 mb-1">
              Potential Delivery Risk
            </div>
            <p className="text-sm text-ink-700 leading-relaxed">{DELIVERY_RISK}</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onExplain}
        className="group inline-flex items-center gap-2 px-6 py-3.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
      >
        <Sparkles className="w-4 h-4" />
        EXPLAIN IMPACT
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}
