import { PROJECT } from '@/data/mockData';
import { Badge } from '@/components/Badge';
import { AlertTriangle, ArrowRight, FolderKanban, FileText } from 'lucide-react';

interface OverviewProps {
  onAnalyze: () => void;
}

export function Overview({ onAnalyze }: OverviewProps) {
  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-ink-500 mb-3">
          <FolderKanban className="w-4 h-4" />
          <span>Project Overview</span>
        </div>
        <h1 className="text-3xl font-bold text-ink-900 tracking-tight mb-2">
          Project Change Impact Intelligence
        </h1>
        <p className="text-lg text-ink-500">
          Understand downstream project impact before a change becomes a delivery risk.
        </p>
      </div>

      {/* Project Card */}
      <div className="card p-6 mb-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-400 mb-1">
              Active Project
            </div>
            <h2 className="text-xl font-bold text-ink-900">{PROJECT.name}</h2>
          </div>
          <Badge variant="on-track">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {PROJECT.status}
          </Badge>
        </div>

        <div className="border-t border-ink-100 pt-5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-ink-100 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4 text-ink-500" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold uppercase tracking-wider text-ink-400 mb-1">
                Current Requirement
              </div>
              <p className="text-base text-ink-800 leading-relaxed">
                {PROJECT.originalRequirement}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Change Alert */}
      <div className="rounded-xl border border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="change">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                REQUIREMENT CHANGE DETECTED
              </Badge>
            </div>
            <p className="text-base font-medium text-ink-800 leading-relaxed">
              {PROJECT.newRequirement}
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onAnalyze}
        className="group inline-flex items-center gap-2 px-6 py-3.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
      >
        ANALYZE IMPACT
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}
