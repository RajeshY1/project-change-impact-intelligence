import type { ImpactLevel } from '@/data/mockData';

type BadgeVariant = 'high' | 'medium-high' | 'medium' | 'low' | 'on-track' | 'change' | 'ai' | 'human';

const variantStyles: Record<BadgeVariant, string> = {
  high: 'bg-red-50 text-red-700 border-red-200',
  'medium-high': 'bg-orange-50 text-orange-700 border-orange-200',
  medium: 'bg-amber-50 text-amber-700 border-amber-200',
  low: 'bg-ink-50 text-ink-600 border-ink-200',
  'on-track': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  change: 'bg-brand-50 text-brand-700 border-brand-200',
  ai: 'bg-violet-50 text-violet-700 border-violet-200',
  human: 'bg-teal-50 text-teal-700 border-teal-200',
};

export function ImpactBadge({ level }: { level: ImpactLevel }) {
  const variant: BadgeVariant =
    level === 'HIGH' ? 'high' : level === 'MEDIUM/HIGH' ? 'medium-high' : level === 'LOW' ? 'low' : 'medium';
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold rounded-full border ${variantStyles[variant]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${variant === 'high' ? 'bg-red-500' : variant === 'medium-high' ? 'bg-orange-500' : variant === 'low' ? 'bg-ink-400' : 'bg-amber-500'}`} />
      {level}
    </span>
  );
}

export function Badge({
  children,
  variant = 'medium',
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold rounded-full border ${variantStyles[variant]}`}
    >
      {children}
    </span>
  );
}
