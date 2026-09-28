export type ImpactLevel = 'HIGH' | 'MEDIUM/HIGH' | 'MEDIUM' | 'LOW';

export type WorkItemType = 'JIRA' | 'MILESTONE';

export interface WorkItem {
  id: string;
  title: string;
  owner: string;
  dependencies: string[];
  impact: ImpactLevel;
  reason: string;
  type: WorkItemType;
}

export interface Team {
  name: string;
  affectedItems: string[];
}

export interface RecommendedAction {
  id: number;
  label: string;
}

export const PROJECT = {
  name: 'Mobile Banking V1',
  status: 'ON TRACK' as const,
  originalRequirement: 'Users can log in using email and password.',
  newRequirement: 'Biometric authentication is now required for V1.',
};

export const WORK_ITEMS: WorkItem[] = [
  {
    id: 'JIRA-101',
    title: 'Mobile Login UI',
    owner: 'Mobile Team',
    dependencies: ['Authentication Requirement'],
    impact: 'HIGH',
    reason:
      'The mobile login experience must change to support biometric authentication.',
    type: 'JIRA',
  },
  {
    id: 'JIRA-102',
    title: 'Authentication API',
    owner: 'Backend Team',
    dependencies: ['Authentication Requirement'],
    impact: 'HIGH',
    reason:
      'The authentication flow must support the new authentication method.',
    type: 'JIRA',
  },
  {
    id: 'JIRA-103',
    title: 'Security Review',
    owner: 'Security Team',
    dependencies: ['Authentication API'],
    impact: 'HIGH',
    reason:
      'Biometric authentication introduces additional security and privacy considerations requiring security review.',
    type: 'JIRA',
  },
  {
    id: 'JIRA-104',
    title: 'Login Testing',
    owner: 'QA Team',
    dependencies: ['Mobile Login UI', 'Authentication API'],
    impact: 'HIGH',
    reason:
      'QA must add biometric authentication scenarios and update login test coverage.',
    type: 'JIRA',
  },
  {
    id: 'M-01',
    title: 'V1 Release',
    owner: 'Product Manager',
    dependencies: ['JIRA-101', 'JIRA-102', 'JIRA-103', 'JIRA-104'],
    impact: 'MEDIUM/HIGH',
    reason:
      'Multiple dependent work items are affected, creating potential schedule pressure for the V1 milestone.',
    type: 'MILESTONE',
  },
];

export const AFFECTED_TEAMS: Team[] = [
  { name: 'Mobile', affectedItems: ['JIRA-101'] },
  { name: 'Backend', affectedItems: ['JIRA-102'] },
  { name: 'Security', affectedItems: ['JIRA-103'] },
  { name: 'QA', affectedItems: ['JIRA-104'] },
  { name: 'Product', affectedItems: ['M-01'] },
];

export const DELIVERY_RISK =
  'The requirement change affects implementation, security, testing and release dependencies and may create schedule pressure for the V1 release.';

export const DEPENDENCY_CHAIN = [
  { label: 'Requirement Change', type: 'change' as const },
  { label: 'Authentication API', type: 'work' as const },
  { label: 'Security Review', type: 'work' as const },
  { label: 'Login Testing', type: 'work' as const },
  { label: 'V1 Release', type: 'milestone' as const },
];

export const SECONDARY_DEPENDENCY = {
  from: 'Mobile Login UI',
  to: 'Login Testing',
};

export const TRACEABILITY = [
  { label: 'Requirement Change', type: 'change' as const },
  { label: 'Affected Work', type: 'work' as const },
  { label: 'Affected Owners', type: 'owner' as const },
  { label: 'Affected Milestone', type: 'milestone' as const },
  { label: 'Potential Delivery Risk', type: 'risk' as const },
];

export const RECOMMENDED_ACTIONS: RecommendedAction[] = [
  { id: 1, label: 'Update Authentication API requirements' },
  { id: 2, label: 'Update mobile login implementation' },
  { id: 3, label: 'Add biometric security review' },
  { id: 4, label: 'Add biometric test scenarios' },
  { id: 5, label: 'Review V1 release timeline' },
  { id: 6, label: 'Notify affected owners' },
];

export const RECOMMENDED_NEXT_STEP =
  'Review the authentication dependency chain and confirm whether the V1 milestone needs to move.';

export const WHY_THIS_MATTERS =
  'The change affects implementation, security, testing and release dependencies. Reviewing these dependencies early can reduce the chance of a late delivery surprise.';
