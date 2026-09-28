export type ChangeCategory =
  | 'Authentication/Security'
  | 'AI/ML'
  | 'Data'
  | 'UI/UX'
  | 'Integration/API'
  | 'Compliance/Privacy'
  | 'Infrastructure/DevOps'
  | 'Payment/Financial'
  | 'Reporting/Analytics'
  | 'Localization/Language'
  | 'General';

export type Complexity = 'Low' | 'Medium' | 'High';
import type { ImpactLevel } from '@/data/mockData';
export type { ImpactLevel };
export type Confidence = 'High' | 'Medium' | 'Low' | 'Preliminary';
export type Priority = 'P0' | 'P1' | 'P2';

export interface AffectedTeam {
  name: string;
  whyAffected: string;
  newWork: string;
  effortDays: number;
  parallelizable: boolean;
  dependsOn: string | null;
  impact: ImpactLevel;
}

export interface ImpactTask {
  id: string;
  title: string;
  team: string;
  priority: Priority;
  effortDays: number;
  dependsOn: string[];
  parallel: boolean;
  criticalPath: boolean;
  status: 'New' | 'Modified' | 'Review';
}

export interface RiskItem {
  label: string;
  severity: ImpactLevel;
}

export interface AnalysisResult {
  category: ChangeCategory;
  complexity: Complexity;
  impactLevel: ImpactLevel;
  confidence: Confidence;
  whyItMatters: string;
  teams: AffectedTeam[];
  tasks: ImpactTask[];
  totalEffortLow: number;
  totalEffortHigh: number;
  scheduleDaysLow: number;
  scheduleDaysHigh: number;
  criticalPathImpact: ImpactLevel;
  risks: RiskItem[];
  assumptions: string[];
  missingInfo: string[];
  recommendedActions: { id: number; label: string }[];
  recommendedNextStep: string;
  whyThisMatters: string;
  dependencyChain: { label: string; type: string }[];
  deliveryTimeline: {
    phase: string;
    days: number;
    type: 'existing' | 'additional' | 'parallel' | 'critical';
  }[];
}

interface CategoryRule {
  category: ChangeCategory;
  keywords: string[];
  teams: string[];
  complexity: Complexity;
  baseEffortLow: number;
  baseEffortHigh: number;
  whyTemplate: string;
  tasks: { title: string; team: string; effort: number; priority: Priority; dependsOn: string[]; parallel: boolean; status: 'New' | 'Modified' | 'Review' }[];
  risks: { label: string; severity: ImpactLevel }[];
  assumptions: string[];
  recommendedActions: string[];
  recommendedNextStep: string;
  whyThisMatters: string;
}

const CATEGORY_RULES: CategoryRule[] = [
  {
    category: 'Authentication/Security',
    keywords: ['auth', 'biometric', 'sso', 'single sign', 'login', 'password', 'mfa', '2fa', 'oauth', 'saml', 'security', 'fingerprint', 'face id', 'touch id', 'credential', 'session'],
    teams: ['Backend', 'Frontend/Mobile', 'Security', 'QA', 'Product'],
    complexity: 'High',
    baseEffortLow: 14,
    baseEffortHigh: 22,
    whyTemplate: 'Authentication changes touch the login flow, API security boundaries, and require security review before release.',
    tasks: [
      { title: 'Update authentication API endpoints', team: 'Backend', effort: 4, priority: 'P0', dependsOn: [], parallel: false, status: 'Modified' },
      { title: 'Implement new auth UI flow', team: 'Frontend/Mobile', effort: 5, priority: 'P0', dependsOn: ['T1'], parallel: false, status: 'Modified' },
      { title: 'Security review & threat modeling', team: 'Security', effort: 3, priority: 'P0', dependsOn: ['T1'], parallel: true, status: 'New' },
      { title: 'Update test coverage for auth scenarios', team: 'QA', effort: 3, priority: 'P1', dependsOn: ['T1', 'T2'], parallel: false, status: 'Modified' },
      { title: 'Update product requirements & rollout plan', team: 'Product', effort: 2, priority: 'P1', dependsOn: [], parallel: true, status: 'Modified' },
    ],
    risks: [
      { label: 'Security review may surface additional requirements', severity: 'HIGH' },
      { label: 'Backward compatibility with existing sessions', severity: 'MEDIUM/HIGH' },
      { label: 'User migration for existing credentials', severity: 'MEDIUM' },
    ],
    assumptions: [
      'New auth method is additive, not replacing existing login entirely',
      'Security team has capacity within the sprint',
      'No third-party identity provider integration needed',
    ],
    recommendedActions: [
      'Update authentication API requirements',
      'Update login UI implementation',
      'Schedule security review session',
      'Add auth-specific test scenarios',
      'Review V1 release timeline',
      'Notify affected team owners',
    ],
    recommendedNextStep: 'Review the authentication dependency chain and confirm whether the V1 milestone needs to move.',
    whyThisMatters: 'The change affects implementation, security, testing and release dependencies. Reviewing these dependencies early can reduce the chance of a late delivery surprise.',
  },
  {
    category: 'AI/ML',
    keywords: ['ai', 'ml', 'machine learning', 'model', 'inference', 'llm', 'gpt', 'prediction', 'recommendation', 'nlp', 'chatbot', 'embedding', 'training'],
    teams: ['Data/AI', 'Backend', 'Frontend/Mobile', 'QA', 'Product'],
    complexity: 'High',
    baseEffortLow: 18,
    baseEffortHigh: 30,
    whyTemplate: 'AI/ML features introduce model integration, data pipeline, and evaluation complexity that affects multiple layers of the product.',
    tasks: [
      { title: 'Design model integration architecture', team: 'Data/AI', effort: 5, priority: 'P0', dependsOn: [], parallel: false, status: 'New' },
      { title: 'Build inference API layer', team: 'Backend', effort: 4, priority: 'P0', dependsOn: ['T1'], parallel: false, status: 'New' },
      { title: 'Build AI feature UI components', team: 'Frontend/Mobile', effort: 5, priority: 'P0', dependsOn: ['T2'], parallel: false, status: 'New' },
      { title: 'Create evaluation & test plan', team: 'QA', effort: 3, priority: 'P1', dependsOn: ['T2', 'T3'], parallel: false, status: 'New' },
      { title: 'Define product metrics & success criteria', team: 'Product', effort: 2, priority: 'P1', dependsOn: [], parallel: true, status: 'New' },
    ],
    risks: [
      { label: 'Model latency may impact UX', severity: 'HIGH' },
      { label: 'Data quality and availability for training/inference', severity: 'HIGH' },
      { label: 'Cost of inference at scale', severity: 'MEDIUM/HIGH' },
    ],
    assumptions: [
      'A pre-trained model or API is available (no custom training from scratch)',
      'Inference infrastructure can be provisioned',
      'Latency budget is acceptable for the feature',
    ],
    recommendedActions: [
      'Define AI feature success metrics',
      'Prototype model integration',
      'Plan inference infrastructure',
      'Create evaluation test plan',
      'Review timeline with Data/AI team',
      'Notify affected team owners',
    ],
    recommendedNextStep: 'Validate model availability and inference latency before committing to a delivery date.',
    whyThisMatters: 'AI features carry uncertainty in model quality, latency, and cost. Validating feasibility early prevents late-stage scope reduction.',
  },
  {
    category: 'Data',
    keywords: ['data', 'database', 'schema', 'migration', 'etl', 'pipeline', 'warehouse', 'table', 'column', 'index', 'query', 'storage'],
    teams: ['Backend', 'Data/AI', 'QA', 'DevOps'],
    complexity: 'Medium',
    baseEffortLow: 10,
    baseEffortHigh: 18,
    whyTemplate: 'Data changes affect storage schemas, data pipelines, and may require migrations that impact existing functionality.',
    tasks: [
      { title: 'Design schema changes & migration plan', team: 'Backend', effort: 3, priority: 'P0', dependsOn: [], parallel: false, status: 'Modified' },
      { title: 'Update data access layer', team: 'Backend', effort: 3, priority: 'P0', dependsOn: ['T1'], parallel: false, status: 'Modified' },
      { title: 'Update ETL/pipeline if applicable', team: 'Data/AI', effort: 3, priority: 'P1', dependsOn: ['T1'], parallel: true, status: 'Modified' },
      { title: 'Migration testing & rollback plan', team: 'QA', effort: 2, priority: 'P1', dependsOn: ['T2'], parallel: false, status: 'New' },
      { title: 'Deploy migration with zero-downtime strategy', team: 'DevOps', effort: 2, priority: 'P1', dependsOn: ['T4'], parallel: false, status: 'New' },
    ],
    risks: [
      { label: 'Data migration may cause downtime', severity: 'MEDIUM/HIGH' },
      { label: 'Backward compatibility with existing queries', severity: 'MEDIUM' },
    ],
    assumptions: [
      'Migration can be done with backward-compatible schema changes',
      'Rollback strategy is feasible',
    ],
    recommendedActions: [
      'Review schema migration plan',
      'Update data access layer',
      'Create migration test plan',
      'Prepare rollback strategy',
      'Notify affected team owners',
    ],
    recommendedNextStep: 'Review the migration plan and confirm zero-downtime deployment is feasible.',
    whyThisMatters: 'Data migrations carry risk of data loss or downtime. A tested rollback strategy is essential before deployment.',
  },
  {
    category: 'UI/UX',
    keywords: ['ui', 'ux', 'design', 'interface', 'layout', 'theme', 'dark mode', 'redesign', 'navigation', 'accessibility', 'responsive', 'component', 'animation'],
    teams: ['Frontend/Mobile', 'Design', 'QA', 'Product'],
    complexity: 'Medium',
    baseEffortLow: 8,
    baseEffortHigh: 16,
    whyTemplate: 'UI/UX changes affect the user-facing experience, component library, and require design QA across all affected screens.',
    tasks: [
      { title: 'Create design specs & prototypes', team: 'Design', effort: 3, priority: 'P0', dependsOn: [], parallel: false, status: 'New' },
      { title: 'Implement UI component changes', team: 'Frontend/Mobile', effort: 5, priority: 'P0', dependsOn: ['T1'], parallel: false, status: 'Modified' },
      { title: 'Cross-screen visual QA', team: 'QA', effort: 2, priority: 'P1', dependsOn: ['T2'], parallel: false, status: 'New' },
      { title: 'Accessibility audit', team: 'Design', effort: 2, priority: 'P1', dependsOn: ['T2'], parallel: true, status: 'New' },
    ],
    risks: [
      { label: 'Design changes may cascade to other screens', severity: 'MEDIUM' },
      { label: 'Accessibility compliance requirements', severity: 'MEDIUM' },
    ],
    assumptions: [
      'Design system is established and components are reusable',
      'Changes do not require a full redesign',
    ],
    recommendedActions: [
      'Review design prototypes',
      'Update affected UI components',
      'Run accessibility audit',
      'Plan cross-screen QA',
      'Notify affected team owners',
    ],
    recommendedNextStep: 'Review design prototypes and confirm scope of affected screens before implementation.',
    whyThisMatters: 'UI changes can cascade across screens. Confirming scope early prevents late-stage visual regression.',
  },
  {
    category: 'Integration/API',
    keywords: ['api', 'integration', 'endpoint', 'rest', 'graphql', 'webhook', 'third-party', 'sdk', 'integration', 'service', 'microservice'],
    teams: ['Backend', 'Frontend/Mobile', 'QA', 'DevOps'],
    complexity: 'Medium',
    baseEffortLow: 10,
    baseEffortHigh: 18,
    whyTemplate: 'API/integration changes affect service contracts, may break existing consumers, and require contract testing.',
    tasks: [
      { title: 'Design API contract changes', team: 'Backend', effort: 3, priority: 'P0', dependsOn: [], parallel: false, status: 'Modified' },
      { title: 'Implement API endpoint changes', team: 'Backend', effort: 4, priority: 'P0', dependsOn: ['T1'], parallel: false, status: 'Modified' },
      { title: 'Update frontend API client', team: 'Frontend/Mobile', effort: 3, priority: 'P0', dependsOn: ['T2'], parallel: false, status: 'Modified' },
      { title: 'Contract & integration testing', team: 'QA', effort: 3, priority: 'P1', dependsOn: ['T2', 'T3'], parallel: false, status: 'New' },
      { title: 'Update deployment config', team: 'DevOps', effort: 1, priority: 'P2', dependsOn: ['T2'], parallel: true, status: 'Modified' },
    ],
    risks: [
      { label: 'Breaking changes for existing API consumers', severity: 'HIGH' },
      { label: 'Third-party service availability', severity: 'MEDIUM' },
    ],
    assumptions: [
      'API versioning strategy is in place',
      'Existing consumers can be coordinated for breaking changes',
    ],
    recommendedActions: [
      'Review API contract changes',
      'Update API implementation',
      'Update frontend API client',
      'Add contract tests',
      'Notify affected team owners',
    ],
    recommendedNextStep: 'Review API contract for breaking changes and coordinate with existing consumers.',
    whyThisMatters: 'Breaking API changes can affect downstream consumers. Contract testing and versioning reduce integration risk.',
  },
  {
    category: 'Compliance/Privacy',
    keywords: ['compliance', 'privacy', 'gdpr', 'ccpa', 'hipaa', 'pci', 'soc2', 'audit', 'consent', 'data protection', 'regulatory', 'legal'],
    teams: ['Legal/Compliance', 'Backend', 'Security', 'Product'],
    complexity: 'High',
    baseEffortLow: 12,
    baseEffortHigh: 20,
    whyTemplate: 'Compliance changes require legal review, data handling updates, and may affect user consent flows.',
    tasks: [
      { title: 'Legal & regulatory review', team: 'Legal/Compliance', effort: 4, priority: 'P0', dependsOn: [], parallel: false, status: 'New' },
      { title: 'Update data handling & consent flows', team: 'Backend', effort: 4, priority: 'P0', dependsOn: ['T1'], parallel: false, status: 'Modified' },
      { title: 'Security & data protection review', team: 'Security', effort: 3, priority: 'P0', dependsOn: ['T2'], parallel: false, status: 'New' },
      { title: 'Update product requirements for compliance', team: 'Product', effort: 2, priority: 'P1', dependsOn: ['T1'], parallel: true, status: 'Modified' },
    ],
    risks: [
      { label: 'Regulatory requirements may block release', severity: 'HIGH' },
      { label: 'Data residency requirements', severity: 'MEDIUM/HIGH' },
      { label: 'Legal review timeline uncertainty', severity: 'MEDIUM' },
    ],
    assumptions: [
      'Legal team has capacity for review within sprint',
      'Compliance requirements are clearly defined',
    ],
    recommendedActions: [
      'Schedule legal review',
      'Update data handling flows',
      'Conduct security review',
      'Update product requirements',
      'Notify affected team owners',
    ],
    recommendedNextStep: 'Schedule legal review early — compliance requirements may affect release eligibility.',
    whyThisMatters: 'Compliance issues can block a release entirely. Early legal review prevents late-stage blockers.',
  },
  {
    category: 'Infrastructure/DevOps',
    keywords: ['infrastructure', 'devops', 'deploy', 'deployment', 'ci/cd', 'pipeline', 'cloud', 'kubernetes', 'docker', 'container', 'scaling', 'monitoring', 'alerting'],
    teams: ['DevOps', 'Backend', 'QA'],
    complexity: 'Medium',
    baseEffortLow: 8,
    baseEffortHigh: 16,
    whyTemplate: 'Infrastructure changes affect deployment pipelines, monitoring, and may require capacity planning.',
    tasks: [
      { title: 'Design infrastructure changes', team: 'DevOps', effort: 3, priority: 'P0', dependsOn: [], parallel: false, status: 'New' },
      { title: 'Update CI/CD pipeline', team: 'DevOps', effort: 3, priority: 'P0', dependsOn: ['T1'], parallel: false, status: 'Modified' },
      { title: 'Update backend services for new infra', team: 'Backend', effort: 3, priority: 'P1', dependsOn: ['T1'], parallel: true, status: 'Modified' },
      { title: 'Test deployment & rollback', team: 'QA', effort: 2, priority: 'P1', dependsOn: ['T2', 'T3'], parallel: false, status: 'New' },
    ],
    risks: [
      { label: 'Deployment downtime during migration', severity: 'MEDIUM/HIGH' },
      { label: 'Capacity planning for new infrastructure', severity: 'MEDIUM' },
    ],
    assumptions: [
      'Infrastructure changes are backward compatible',
      'Rollback strategy exists',
    ],
    recommendedActions: [
      'Review infrastructure design',
      'Update CI/CD pipeline',
      'Test deployment strategy',
      'Prepare rollback plan',
      'Notify affected team owners',
    ],
    recommendedNextStep: 'Review infrastructure design and confirm rollback strategy before deployment.',
    whyThisMatters: 'Infrastructure changes can affect availability. A tested rollback strategy is critical.',
  },
  {
    category: 'Payment/Financial',
    keywords: ['payment', 'billing', 'stripe', 'checkout', 'subscription', 'invoice', 'transaction', 'refund', 'pricing', 'plan', 'tier', 'financial'],
    teams: ['Backend', 'Frontend/Mobile', 'QA', 'Product', 'Legal/Compliance'],
    complexity: 'High',
    baseEffortLow: 14,
    baseEffortHigh: 24,
    whyTemplate: 'Payment changes affect transaction flows, billing logic, and require financial compliance review.',
    tasks: [
      { title: 'Update payment processing logic', team: 'Backend', effort: 5, priority: 'P0', dependsOn: [], parallel: false, status: 'Modified' },
      { title: 'Update checkout/billing UI', team: 'Frontend/Mobile', effort: 4, priority: 'P0', dependsOn: ['T1'], parallel: false, status: 'Modified' },
      { title: 'Financial compliance review', team: 'Legal/Compliance', effort: 3, priority: 'P0', dependsOn: ['T1'], parallel: true, status: 'New' },
      { title: 'Payment flow end-to-end testing', team: 'QA', effort: 4, priority: 'P0', dependsOn: ['T1', 'T2'], parallel: false, status: 'Modified' },
      { title: 'Update pricing & product configuration', team: 'Product', effort: 2, priority: 'P1', dependsOn: [], parallel: true, status: 'Modified' },
    ],
    risks: [
      { label: 'Payment transaction errors affect revenue', severity: 'HIGH' },
      { label: 'PCI compliance requirements', severity: 'HIGH' },
      { label: 'Refund/chargeback flow changes', severity: 'MEDIUM/HIGH' },
    ],
    assumptions: [
      'Payment provider supports the new flow',
      'PCI compliance is maintained',
    ],
    recommendedActions: [
      'Review payment processing changes',
      'Update checkout UI',
      'Schedule compliance review',
      'Run end-to-end payment tests',
      'Review pricing configuration',
      'Notify affected team owners',
    ],
    recommendedNextStep: 'Review payment flow changes and confirm PCI compliance before release.',
    whyThisMatters: 'Payment errors directly affect revenue. Thorough testing and compliance review are essential before release.',
  },
  {
    category: 'Reporting/Analytics',
    keywords: ['report', 'reporting', 'analytics', 'dashboard', 'metrics', 'chart', 'kpi', 'visualization', 'export', 'pdf', 'data export'],
    teams: ['Backend', 'Frontend/Mobile', 'Data/AI', 'QA'],
    complexity: 'Medium',
    baseEffortLow: 8,
    baseEffortHigh: 14,
    whyTemplate: 'Reporting changes affect data aggregation, visualization, and may require backend query optimization.',
    tasks: [
      { title: 'Design report data model & queries', team: 'Backend', effort: 3, priority: 'P0', dependsOn: [], parallel: false, status: 'New' },
      { title: 'Build report visualization components', team: 'Frontend/Mobile', effort: 4, priority: 'P0', dependsOn: ['T1'], parallel: false, status: 'New' },
      { title: 'Data validation & aggregation logic', team: 'Data/AI', effort: 2, priority: 'P1', dependsOn: ['T1'], parallel: true, status: 'New' },
      { title: 'Report accuracy testing', team: 'QA', effort: 2, priority: 'P1', dependsOn: ['T2', 'T3'], parallel: false, status: 'New' },
    ],
    risks: [
      { label: 'Query performance with large datasets', severity: 'MEDIUM' },
      { label: 'Data accuracy across sources', severity: 'MEDIUM' },
    ],
    assumptions: [
      'Data sources are available and accessible',
      'Existing aggregation pipelines can be extended',
    ],
    recommendedActions: [
      'Review report data model',
      'Build visualization components',
      'Validate data aggregation',
      'Test report accuracy',
      'Notify affected team owners',
    ],
    recommendedNextStep: 'Review report requirements and validate data availability before implementation.',
    whyThisMatters: 'Report accuracy depends on data quality. Validating data sources early prevents incorrect reporting.',
  },
  {
    category: 'Localization/Language',
    keywords: ['localization', 'l10n', 'multilingual', 'language', 'translation', 'i18n', 'internationalization', 'locale', 'rtl'],
    teams: ['Frontend/Mobile', 'Backend', 'Design', 'QA'],
    complexity: 'Medium',
    baseEffortLow: 10,
    baseEffortHigh: 18,
    whyTemplate: 'Localization changes affect all user-facing strings, date/number formatting, and may require RTL layout support.',
    tasks: [
      { title: 'Set up i18n framework & string extraction', team: 'Frontend/Mobile', effort: 4, priority: 'P0', dependsOn: [], parallel: false, status: 'New' },
      { title: 'Update backend for locale-aware APIs', team: 'Backend', effort: 3, priority: 'P0', dependsOn: [], parallel: true, status: 'Modified' },
      { title: 'Design RTL & locale-specific layouts', team: 'Design', effort: 3, priority: 'P1', dependsOn: ['T1'], parallel: false, status: 'New' },
      { title: 'Localization testing across locales', team: 'QA', effort: 3, priority: 'P1', dependsOn: ['T1', 'T3'], parallel: false, status: 'New' },
    ],
    risks: [
      { label: 'RTL layout issues in existing components', severity: 'MEDIUM/HIGH' },
      { label: 'Translation quality and context', severity: 'MEDIUM' },
    ],
    assumptions: [
      'Translation resources are available',
      'Existing components can support RTL with modifications',
    ],
    recommendedActions: [
      'Set up i18n framework',
      'Extract all user-facing strings',
      'Design RTL-compatible layouts',
      'Plan localization testing',
      'Notify affected team owners',
    ],
    recommendedNextStep: 'Review scope of languages and confirm translation resources are available.',
    whyThisMatters: 'Localization touches every user-facing screen. Scoping early prevents widespread late-stage changes.',
  },
];

const VAGUE_KEYWORDS = ['add ai', 'improve', 'enhance', 'better', 'upgrade', 'fix', 'something', 'stuff', 'things', 'make it', 'do something'];

function detectCategory(input: string): { rule: CategoryRule; matched: boolean } {
  const lower = input.toLowerCase();
  for (const rule of CATEGORY_RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return { rule, matched: true };
    }
  }
  return { rule: CATEGORY_RULES[0], matched: false };
}

function isVague(input: string): boolean {
  const lower = input.toLowerCase().trim();
  if (lower.length < 15) return true;
  return VAGUE_KEYWORDS.some((kw) => lower.includes(kw)) && lower.length < 40;
}

function computeCriticalPath(tasks: { effort: number; dependsOn: string[]; parallel: boolean }[]): string[] {
  const memo = new Map<string, number>();
  const taskMap = new Map<string, number>();
  tasks.forEach((_, i) => taskMap.set(`T${i + 1}`, i));

  function longest(id: string): number {
    if (memo.has(id)) return memo.get(id)!;
    const idx = taskMap.get(id)!;
    const task = tasks[idx];
    if (task.dependsOn.length === 0) {
      memo.set(id, task.effort);
      return task.effort;
    }
    const max = Math.max(...task.dependsOn.map((d) => longest(d))) + task.effort;
    memo.set(id, max);
    return max;
  }

  let best = 0;
  let bestId = '';
  tasks.forEach((_, i) => {
    const id = `T${i + 1}`;
    const len = longest(id);
    if (len > best) {
      best = len;
      bestId = id;
    }
  });

  const path: string[] = [];
  let current = bestId;
  while (current) {
    path.unshift(current);
    const idx = taskMap.get(current)!;
    const deps = tasks[idx].dependsOn;
    if (deps.length === 0) break;
    let bestDep = deps[0];
    let bestLen = 0;
    deps.forEach((d) => {
      const len = longest(d);
      if (len > bestLen) {
        bestLen = len;
        bestDep = d;
      }
    });
    current = bestDep;
  }
  return path;
}

export function analyzeChange(input: string): AnalysisResult {
  const { rule, matched } = detectCategory(input);
  const vague = isVague(input);

  let confidence: Confidence;
  let missingInfo: string[] = [];
  if (vague || !matched) {
    confidence = 'Preliminary';
    missingInfo = [
      'Specific scope of the change is unclear',
      'Affected product areas need clarification',
      'Timeline constraints are not specified',
    ];
  } else if (rule.complexity === 'High') {
    confidence = 'Medium';
    missingInfo = [
      'Exact scope of affected components',
      'Team availability within the sprint',
    ];
  } else {
    confidence = 'High';
    missingInfo = [];
  }

  const tasks: ImpactTask[] = rule.tasks.map((t, i) => ({
    id: `T${i + 1}`,
    title: t.title,
    team: t.team,
    priority: t.priority,
    effortDays: t.effort,
    dependsOn: t.dependsOn,
    parallel: t.parallel,
    criticalPath: false,
    status: t.status,
  }));

  const criticalPathIds = computeCriticalPath(rule.tasks);
  tasks.forEach((t) => {
    t.criticalPath = criticalPathIds.includes(t.id);
  });

  const teams: AffectedTeam[] = [];
  const teamMap = new Map<string, AffectedTeam>();
  tasks.forEach((t) => {
    if (!teamMap.has(t.team)) {
      teamMap.set(t.team, {
        name: t.team,
        whyAffected: '',
        newWork: '',
        effortDays: 0,
        parallelizable: true,
        dependsOn: null,
        impact: 'MEDIUM' as ImpactLevel,
      });
    }
    const team = teamMap.get(t.team)!;
    team.effortDays += t.effortDays;
    team.newWork = team.newWork
      ? `${team.newWork}, ${t.title}`
      : t.title;
    if (!t.parallel) team.parallelizable = false;
    if (t.dependsOn.length > 0) team.dependsOn = t.dependsOn[0];
    if (t.priority === 'P0') team.impact = 'HIGH';
    else if (t.priority === 'P1' && team.impact === 'MEDIUM') team.impact = 'MEDIUM/HIGH';
  });

  rule.teams.forEach((teamName) => {
    if (teamMap.has(teamName)) {
      const team = teamMap.get(teamName)!;
      team.whyAffected = `${rule.category} changes require ${teamName.toLowerCase()} involvement for ${team.newWork.split(',')[0].toLowerCase()}.`;
    }
  });

  teams.push(...Array.from(teamMap.values()));

  const totalEffortLow = tasks.reduce((s, t) => s + t.effortDays, 0);
  const totalEffortHigh = Math.round(totalEffortLow * 1.4);

  const criticalPathLength = criticalPathIds.reduce((sum, id) => {
    const task = tasks.find((t) => t.id === id)!;
    return sum + task.effortDays;
  }, 0);

  const parallelTasks = tasks.filter((t) => t.parallel && !criticalPathIds.includes(t.id));
  const parallelEffort = parallelTasks.reduce((s, t) => s + t.effortDays, 0);
  const overlapReduction = Math.round(parallelEffort * 0.5);

  const scheduleDaysLow = Math.max(criticalPathLength, Math.ceil((totalEffortLow - overlapReduction) / 2));
  const scheduleDaysHigh = Math.max(criticalPathLength + 2, Math.ceil((totalEffortHigh - overlapReduction) / 2));

  let criticalPathImpact: ImpactLevel;
  if (scheduleDaysHigh >= 10) criticalPathImpact = 'HIGH';
  else if (scheduleDaysHigh >= 6) criticalPathImpact = 'MEDIUM/HIGH';
  else criticalPathImpact = 'MEDIUM';

  let impactLevel: ImpactLevel;
  if (rule.complexity === 'High' && scheduleDaysHigh >= 8) impactLevel = 'HIGH';
  else if (rule.complexity === 'High') impactLevel = 'MEDIUM/HIGH';
  else if (scheduleDaysHigh >= 6) impactLevel = 'MEDIUM/HIGH';
  else impactLevel = 'MEDIUM';

  if (vague) {
    impactLevel = 'LOW';
    criticalPathImpact = 'LOW';
  }

  const recommendedActions = rule.recommendedActions.map((label, id) => ({ id: id + 1, label }));

  const dependencyChain = [
    { label: 'Proposed Change', type: 'change' },
    { label: rule.category, type: 'category' },
    { label: 'Affected Components', type: 'work' },
    { label: 'Team Assignments', type: 'owner' },
    { label: 'Task Dependencies', type: 'work' },
    { label: 'Critical Path', type: 'milestone' },
    { label: 'Schedule Impact', type: 'risk' },
  ];

  const deliveryTimeline = [
    { phase: 'Existing sprint work', days: 10, type: 'existing' as const },
    { phase: `${rule.category} implementation`, days: scheduleDaysLow, type: 'additional' as const },
    { phase: 'Parallel work', days: Math.round(parallelEffort * 0.5), type: 'parallel' as const },
    { phase: 'Critical path tasks', days: criticalPathLength, type: 'critical' as const },
    { phase: 'Integration & testing', days: Math.max(2, Math.round(scheduleDaysLow * 0.3)), type: 'additional' as const },
  ];

  return {
    category: rule.category,
    complexity: rule.complexity,
    impactLevel,
    confidence,
    whyItMatters: rule.whyTemplate,
    teams,
    tasks,
    totalEffortLow,
    totalEffortHigh,
    scheduleDaysLow,
    scheduleDaysHigh,
    criticalPathImpact,
    risks: vague
      ? [{ label: 'Change scope is unclear — assessment is preliminary', severity: 'HIGH' }, ...rule.risks]
      : rule.risks,
    assumptions: rule.assumptions,
    missingInfo,
    recommendedActions,
    recommendedNextStep: rule.recommendedNextStep,
    whyThisMatters: rule.whyThisMatters,
    dependencyChain,
    deliveryTimeline,
  };
}

export const EXAMPLE_CHIPS = [
  'Add SSO authentication for enterprise customers',
  'Introduce biometric authentication for V1',
  'Add multilingual support before launch',
];
