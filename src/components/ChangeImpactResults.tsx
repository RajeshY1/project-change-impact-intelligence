import { useState } from 'react';
import type { AnalysisResult, ImpactLevel } from '@/data/changeAnalysis';
import { ImpactBadge, Badge } from '@/components/Badge';
import {
  ArrowRight,
  ArrowDown,
  Users,
  Calendar,
  Clock,
  GitBranch,
  AlertTriangle,
  AlertCircle,
  Lightbulb,
  Info,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  Layers,
  Zap,
  TrendingUp,
  CircleDot,
  FileText,
} from 'lucide-react';

interface ChangeImpactResultsProps {
  result: AnalysisResult;
  changeInput: string;
  onContinue: () => void;
}

function ConfidenceBadge({ confidence }: { confidence: string }) {
  const styles: Record<string, string> = {
    High: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Medium: 'bg-amber-50 text-amber-700 border-amber-200',
    Low: 'bg-orange-50 text-orange-700 border-orange-200',
    Preliminary: 'bg-red-50 text-red-700 border-red-200',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold rounded-full border ${styles[confidence] ?? styles.Medium}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${
        confidence === 'High' ? 'bg-emerald-500' :
        confidence === 'Medium' ? 'bg-amber-500' :
        confidence === 'Preliminary' ? 'bg-red-500' : 'bg-orange-500'
      }`} />
      {confidence}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const styles: Record<string, string> = {
    P0: 'bg-red-50 text-red-700 border-red-200',
    P1: 'bg-amber-50 text-amber-700 border-amber-200',
    P2: 'bg-ink-50 text-ink-600 border-ink-200',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded border ${styles[priority] ?? styles.P2}`}>
      {priority}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    New: 'bg-brand-50 text-brand-700 border-brand-200',
    Modified: 'bg-amber-50 text-amber-700 border-amber-200',
    Review: 'bg-violet-50 text-violet-700 border-violet-200',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded border ${styles[status] ?? styles.New}`}>
      {status}
    </span>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  sublabel,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sublabel?: string;
  accent?: 'brand' | 'amber' | 'red' | 'emerald';
}) {
  const iconBg = {
    brand: 'bg-brand-50 text-brand-500',
    amber: 'bg-amber-50 text-amber-600',
    red: 'bg-red-50 text-red-500',
    emerald: 'bg-emerald-50 text-emerald-600',
  };
  return (
    <div className="card p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${iconBg[accent ?? 'brand']}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="text-xs font-semibold uppercase tracking-wider text-ink-400">
          {label}
        </div>
      </div>
      <div className="text-2xl font-bold text-ink-900">{value}</div>
      {sublabel && <div className="text-xs text-ink-500 mt-1">{sublabel}</div>}
    </div>
  );
}

function ChainNode({ label, type }: { label: string; type: string }) {
  const styles: Record<string, string> = {
    change: 'bg-brand-50 text-brand-700 border-brand-200',
    category: 'bg-violet-50 text-violet-700 border-violet-200',
    work: 'bg-white text-ink-800 border-ink-200',
    owner: 'bg-teal-50 text-teal-700 border-teal-200',
    milestone: 'bg-ink-900 text-white border-ink-900',
    risk: 'bg-orange-50 text-orange-700 border-orange-200',
  };
  return (
    <div className={`px-4 py-2.5 rounded-lg border text-sm font-medium text-center min-w-[200px] shadow-sm ${styles[type] ?? styles.work}`}>
      {label}
    </div>
  );
}

export function ChangeImpactResults({ result, changeInput, onContinue }: ChangeImpactResultsProps) {
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());

  const toggleTask = (id: string) => {
    setExpandedTasks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const maxTimelineDays = Math.max(...result.deliveryTimeline.map((t) => t.days));

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-ink-500 mb-3">
          <GitBranch className="w-4 h-4" />
          <span>Change Impact Assessment</span>
        </div>
        <h1 className="text-3xl font-bold text-ink-900 tracking-tight mb-2">
          Change Impact Assessment
        </h1>
        <div className="flex items-start gap-3 mt-4 p-4 rounded-lg bg-ink-50 border border-ink-100">
          <FileText className="w-4 h-4 text-ink-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-400 mb-0.5">
              Analyzed Change
            </div>
            <p className="text-sm text-ink-700 leading-relaxed">{changeInput}</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SummaryCard
          icon={Users}
          label="Affected Teams"
          value={`${result.teams.length}`}
          sublabel="teams involved"
          accent="brand"
        />
        <SummaryCard
          icon={Clock}
          label="Additional Effort"
          value={`${result.totalEffortLow}–${result.totalEffortHigh}`}
          sublabel="person-days"
          accent="amber"
        />
        <SummaryCard
          icon={Calendar}
          label="Schedule Impact"
          value={`${result.scheduleDaysLow}–${result.scheduleDaysHigh}`}
          sublabel="calendar days"
          accent="red"
        />
        <SummaryCard
          icon={Zap}
          label="Critical Path"
          value={result.criticalPathImpact}
          sublabel="impact level"
          accent={result.criticalPathImpact === 'HIGH' ? 'red' : 'amber'}
        />
      </div>

      {/* Change Summary */}
      <div className="card p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-4 h-4 text-ink-500" />
          <h3 className="text-sm font-semibold text-ink-900">Change Summary</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-400 mb-1">Change Type</div>
            <div className="text-sm font-medium text-ink-800">{result.category}</div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-400 mb-1">Complexity</div>
            <div className="text-sm font-medium text-ink-800">{result.complexity}</div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-400 mb-1">Impact Level</div>
            <ImpactBadge level={result.impactLevel as ImpactLevel} />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-400 mb-1">Confidence</div>
            <ConfidenceBadge confidence={result.confidence} />
          </div>
          <div className="md:col-span-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-400 mb-1">Why This Change Matters</div>
            <p className="text-sm text-ink-700 leading-relaxed">{result.whyItMatters}</p>
          </div>
        </div>
      </div>

      {/* Affected Teams Table */}
      <div className="card p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-ink-500" />
          <h3 className="text-sm font-semibold text-ink-900">Affected Teams</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-100">
                <th className="text-left py-2.5 px-3 font-semibold text-ink-600 text-xs uppercase tracking-wider">Team</th>
                <th className="text-left py-2.5 px-3 font-semibold text-ink-600 text-xs uppercase tracking-wider">Why Affected</th>
                <th className="text-left py-2.5 px-3 font-semibold text-ink-600 text-xs uppercase tracking-wider">New/Modified Work</th>
                <th className="text-center py-2.5 px-3 font-semibold text-ink-600 text-xs uppercase tracking-wider">Effort</th>
                <th className="text-center py-2.5 px-3 font-semibold text-ink-600 text-xs uppercase tracking-wider">Parallel</th>
                <th className="text-left py-2.5 px-3 font-semibold text-ink-600 text-xs uppercase tracking-wider">Depends On</th>
                <th className="text-center py-2.5 px-3 font-semibold text-ink-600 text-xs uppercase tracking-wider">Impact</th>
              </tr>
            </thead>
            <tbody>
              {result.teams.map((team) => (
                <tr key={team.name} className="border-b border-ink-50 hover:bg-ink-50/30 transition-colors">
                  <td className="py-3 px-3 font-medium text-ink-800 whitespace-nowrap">{team.name}</td>
                  <td className="py-3 px-3 text-ink-600 text-xs leading-relaxed max-w-[200px]">{team.whyAffected}</td>
                  <td className="py-3 px-3 text-ink-600 text-xs leading-relaxed max-w-[200px]">{team.newWork}</td>
                  <td className="py-3 px-3 text-center font-medium text-ink-800 whitespace-nowrap">{team.effortDays}d</td>
                  <td className="py-3 px-3 text-center">
                    {team.parallelizable ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" />
                    ) : (
                      <CircleDot className="w-4 h-4 text-ink-300 mx-auto" />
                    )}
                  </td>
                  <td className="py-3 px-3 text-xs text-ink-500 whitespace-nowrap">{team.dependsOn ?? '—'}</td>
                  <td className="py-3 px-3 text-center">
                    <ImpactBadge level={team.impact as ImpactLevel} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Impacted Tasks */}
      <div className="card p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-4 h-4 text-ink-500" />
          <h3 className="text-sm font-semibold text-ink-900">Impacted Tasks</h3>
          <span className="text-xs text-ink-400">({result.tasks.length} tasks)</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-100">
                <th className="text-left py-2.5 px-3 font-semibold text-ink-600 text-xs uppercase tracking-wider w-8"></th>
                <th className="text-left py-2.5 px-3 font-semibold text-ink-600 text-xs uppercase tracking-wider">Task</th>
                <th className="text-left py-2.5 px-3 font-semibold text-ink-600 text-xs uppercase tracking-wider">Team</th>
                <th className="text-center py-2.5 px-3 font-semibold text-ink-600 text-xs uppercase tracking-wider">Priority</th>
                <th className="text-center py-2.5 px-3 font-semibold text-ink-600 text-xs uppercase tracking-wider">Effort</th>
                <th className="text-left py-2.5 px-3 font-semibold text-ink-600 text-xs uppercase tracking-wider">Depends On</th>
                <th className="text-center py-2.5 px-3 font-semibold text-ink-600 text-xs uppercase tracking-wider">Parallel</th>
                <th className="text-center py-2.5 px-3 font-semibold text-ink-600 text-xs uppercase tracking-wider">Critical</th>
                <th className="text-center py-2.5 px-3 font-semibold text-ink-600 text-xs uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {result.tasks.map((task) => {
                const expanded = expandedTasks.has(task.id);
                return (
                  <>
                    <tr
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`border-b border-ink-50 cursor-pointer transition-colors ${task.criticalPath ? 'bg-orange-50/20' : 'hover:bg-ink-50/30'}`}
                    >
                      <td className="py-3 px-3">
                        {expanded ? (
                          <ChevronDown className="w-4 h-4 text-ink-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-ink-400" />
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-semibold text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded">{task.id}</span>
                          <span className="font-medium text-ink-800">{task.title}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-ink-600 whitespace-nowrap">{task.team}</td>
                      <td className="py-3 px-3 text-center"><PriorityBadge priority={task.priority} /></td>
                      <td className="py-3 px-3 text-center font-medium text-ink-800 whitespace-nowrap">{task.effortDays}d</td>
                      <td className="py-3 px-3 text-xs text-ink-500 whitespace-nowrap">{task.dependsOn.length > 0 ? task.dependsOn.join(', ') : '—'}</td>
                      <td className="py-3 px-3 text-center">
                        {task.parallel ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" />
                        ) : (
                          <CircleDot className="w-4 h-4 text-ink-300 mx-auto" />
                        )}
                      </td>
                      <td className="py-3 px-3 text-center">
                        {task.criticalPath ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">
                            <Zap className="w-3 h-3" />
                            Critical
                          </span>
                        ) : (
                          <span className="text-xs text-ink-300">—</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center"><StatusBadge status={task.status} /></td>
                    </tr>
                    {expanded && (
                      <tr key={`${task.id}-detail`} className="bg-ink-50/30">
                        <td></td>
                        <td colSpan={8} className="py-3 px-3">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                            <div>
                              <span className="font-semibold text-ink-500">Task ID:</span>{' '}
                              <span className="text-ink-800">{task.id}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-ink-500">Effort:</span>{' '}
                              <span className="text-ink-800">{task.effortDays} person-days</span>
                            </div>
                            <div>
                              <span className="font-semibold text-ink-500">Dependencies:</span>{' '}
                              <span className="text-ink-800">{task.dependsOn.length > 0 ? task.dependsOn.join(', ') : 'None'}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-ink-500">Critical Path:</span>{' '}
                              <span className="text-ink-800">{task.criticalPath ? 'Yes — on critical path' : 'No'}</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dependency + Critical Path */}
      <div className="card p-6 mb-6">
        <div className="flex items-center gap-2 mb-5">
          <GitBranch className="w-4 h-4 text-ink-500" />
          <h3 className="text-sm font-semibold text-ink-900">Dependency & Critical Path</h3>
        </div>
        <div className="flex flex-col items-center mb-6">
          {result.dependencyChain.map((node, i) => (
            <div key={i} className="w-full flex flex-col items-center">
              <ChainNode label={node.label} type={node.type} />
              {i < result.dependencyChain.length - 1 && (
                <div className="py-1.5">
                  <ArrowDown className="w-4 h-4 text-ink-300" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="pt-5 border-t border-ink-100">
          <div className="text-xs font-semibold uppercase tracking-wider text-ink-400 mb-3">
            Critical Path Tasks
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {result.tasks.filter((t) => t.criticalPath).map((task, i, arr) => (
              <div key={task.id} className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-lg border border-orange-200 bg-orange-50 text-sm font-medium text-orange-700">
                  {task.id} — {task.title}
                </span>
                {i < arr.length - 1 && <ArrowRight className="w-4 h-4 text-ink-300" />}
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-lg bg-ink-50 border border-ink-100">
            <p className="text-xs text-ink-500 leading-relaxed">
              Schedule impact is not a simple sum of person-days. It accounts for sequential dependencies, parallelizable work, and integration. Total effort: {result.totalEffortLow}–{result.totalEffortHigh} person-days. Estimated schedule impact: {result.scheduleDaysLow}–{result.scheduleDaysHigh} calendar days.
            </p>
          </div>
        </div>
      </div>

      {/* Delivery Timeline */}
      <div className="card p-6 mb-6">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-4 h-4 text-ink-500" />
          <h3 className="text-sm font-semibold text-ink-900">Delivery Impact</h3>
        </div>
        <div className="space-y-3">
          {result.deliveryTimeline.map((item, i) => {
            const widthPct = Math.max(8, (item.days / maxTimelineDays) * 100);
            const barColor = {
              existing: 'bg-ink-300',
              additional: 'bg-brand-400',
              parallel: 'bg-emerald-400',
              critical: 'bg-orange-400',
            };
            return (
              <div key={i} className="flex items-center gap-3">
                <div className="w-40 text-xs text-ink-600 shrink-0">{item.phase}</div>
                <div className="flex-1 h-7 bg-ink-50 rounded-md overflow-hidden relative">
                  <div
                    className={`h-full rounded-md transition-all duration-500 ${barColor[item.type]}`}
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
                <div className="w-16 text-xs font-medium text-ink-700 text-right shrink-0">{item.days}d</div>
              </div>
            );
          })}
        </div>
        <div className="mt-5 pt-4 border-t border-ink-100 space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold text-ink-800">
              Estimated schedule impact: {result.scheduleDaysLow}–{result.scheduleDaysHigh} calendar days
            </span>
          </div>
          <p className="text-xs text-ink-500 leading-relaxed">
            AI-generated estimate based on identified tasks, dependencies and assumptions. This is not a guaranteed delay — actual impact depends on team capacity, parallelization, and integration outcomes.
          </p>
        </div>
      </div>

      {/* Risks + Assumptions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Risks */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            <h3 className="text-sm font-semibold text-ink-900">Key Risks</h3>
          </div>
          <div className="space-y-2">
            {result.risks.map((risk, i) => (
              <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-orange-50/30 border border-orange-100">
                <AlertTriangle className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-ink-700 leading-snug">{risk.label}</p>
                  <ImpactBadge level={risk.severity as ImpactLevel} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assumptions */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-4 h-4 text-ink-500" />
            <h3 className="text-sm font-semibold text-ink-900">Assumptions</h3>
          </div>
          <div className="space-y-2">
            {result.assumptions.map((assumption, i) => (
              <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-ink-50 border border-ink-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-ink-400 shrink-0 mt-0.5" />
                <p className="text-sm text-ink-600 leading-snug">{assumption}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Missing Info + Confidence */}
      {result.missingInfo.length > 0 && (
        <div className="card p-6 mb-6 border-red-100">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <h3 className="text-sm font-semibold text-ink-900">Missing Information</h3>
          </div>
          <div className="space-y-2 mb-4">
            {result.missingInfo.map((info, i) => (
              <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-red-50/30 border border-red-100">
                <CircleDot className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-ink-600 leading-snug">{info}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-ink-100">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-400">Analysis Confidence</span>
            <ConfidenceBadge confidence={result.confidence} />
          </div>
        </div>
      )}

      {/* Human-in-the-loop Flow */}
      <div className="card p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-4 h-4 text-teal-500" />
          <h3 className="text-sm font-semibold text-ink-900">Human-in-the-Loop</h3>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {['AI Analysis', 'Impact Assessment', 'Recommendation', 'HUMAN APPROVAL'].map((step, i, arr) => (
            <div key={step} className="flex items-center gap-2">
              <span
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                  i === arr.length - 1
                    ? 'bg-teal-50 text-teal-700 border-teal-200'
                    : 'bg-violet-50 text-violet-700 border-violet-200'
                }`}
              >
                {step}
              </span>
              {i < arr.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-ink-300" />}
            </div>
          ))}
        </div>
        <p className="text-xs text-ink-500 mt-3 leading-relaxed">
          The AI analyzes, explains, estimates and recommends. It does not automatically modify project requirements, tasks or schedules. The PM remains in control.
        </p>
      </div>

      {/* CTA */}
      <button
        onClick={onContinue}
        className="group inline-flex items-center gap-2 px-6 py-3.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
      >
        <Lightbulb className="w-4 h-4" />
        VIEW RECOMMENDATIONS
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}
