import { GitBranch, AlertTriangle, Lightbulb, FolderKanban, ShieldCheck, Wand2, BarChart3 } from 'lucide-react';

export type AppState = 'overview' | 'proposed' | 'impact' | 'explain' | 'recommendations';

interface SidebarProps {
  activeState: AppState;
  onNavigate: (state: AppState) => void;
  completedStates: Set<AppState>;
}

const navItems: {
  id: AppState;
  label: string;
  icon: React.ElementType;
  step: number;
}[] = [
  { id: 'overview', label: 'Projects', icon: FolderKanban, step: 1 },
  { id: 'proposed', label: 'Proposed Change', icon: Wand2, step: 2 },
  { id: 'impact', label: 'Impact Analysis', icon: GitBranch, step: 3 },
  { id: 'explain', label: 'Explain Impact', icon: AlertTriangle, step: 4 },
  { id: 'recommendations', label: 'Recommendations', icon: Lightbulb, step: 5 },
];

export function Sidebar({ activeState, onNavigate, completedStates }: SidebarProps) {
  return (
    <aside className="w-64 bg-ink-950 text-ink-200 flex flex-col h-screen sticky top-0 shrink-0">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-ink-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-brand-500 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-white leading-tight">Change Impact</div>
            <div className="text-xs text-ink-400 leading-tight">Intelligence</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-500">
          Workflow
        </div>
        {navItems.map((item) => {
          const isActive = activeState === item.id;
          const isCompleted = completedStates.has(item.id);
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group ${
                isActive
                  ? 'bg-brand-500/15 text-white border border-brand-500/30'
                  : 'text-ink-400 hover:text-white hover:bg-ink-800/50 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-brand-400' : 'text-ink-500 group-hover:text-ink-300'}`} />
              <span className="flex-1 text-left">{item.label}</span>
              {isCompleted && !isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              )}
              {isActive && (
                <span className="text-[11px] font-semibold text-brand-400">{item.step}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-ink-800">
        <div className="flex items-center gap-2 px-2 py-2 rounded-lg bg-ink-900/50">
          <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
          <p className="text-[11px] text-ink-400 leading-snug">
            Prototype • Mock project context • Human approval required
          </p>
        </div>
      </div>
    </aside>
  );
}
