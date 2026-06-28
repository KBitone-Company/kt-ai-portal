export type ProjectStatus =
  | 'requested'
  | 'pending_approval'
  | 'approved'
  | 'rejected'
  | 'running'
  | 'paused'
  | 'closed';

export type ProjectRole =
  | 'PM'
  | 'Developer'
  | 'Analyst'
  | 'DataManager'
  | 'SecurityReviewer'
  | 'ExternalUser';

export type WorkspaceStatus =
  | 'provisioning'
  | 'active'
  | 'suspended'
  | 'terminating'
  | 'terminated';

export type SecurityLevel = '공개' | '내부' | '비밀';

export interface ResourceQuota {
  cpuCores: number;
  gpuCount: number;
  memoryGiB: number;
  storageGiB: number;
  networkMbps: number;
  usesCredit: boolean;
}

export interface ProjectMember {
  userId: string;
  name: string;
  organization: string;
  role: ProjectRole;
}

export interface ApprovalHistory {
  action: 'requested' | 'approved' | 'rejected' | 'paused' | 'closed';
  actor: string;
  comment: string;
  timestamp: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  purpose: string;
  status: ProjectStatus;
  securityLevel: SecurityLevel;
  ownerOrganization: string;
  pm: ProjectMember;
  members: ProjectMember[];
  startDate: string;
  endDate: string;
  workspaceStatus: WorkspaceStatus;
  quota: ResourceQuota;
  datasets: string[];
  models: string[];
  activityLog: string[];
  approvalHistory: ApprovalHistory[];
}
