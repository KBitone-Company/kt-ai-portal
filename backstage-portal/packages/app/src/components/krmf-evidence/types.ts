export type ControlCheckStatus =
  | 'not_checked'
  | 'preparing'
  | 'checking'
  | 'compliant'
  | 'non_compliant'
  | 'remediating'
  | 'completed';

export type EvidenceStatus =
  | 'not_submitted'
  | 'submitted'
  | 'reviewing'
  | 'revision_requested'
  | 'approved'
  | 'rejected';

export type RiskSeverity = 'low' | 'medium' | 'high' | 'critical';

export type IssueStatus =
  | 'registered'
  | 'in_progress'
  | 'resolved'
  | 'reviewing'
  | 'closed'
  | 'deferred';

export type ControlArea =
  | 'access_control'
  | 'account_management'
  | 'log_management'
  | 'encryption'
  | 'network_security'
  | 'vulnerability_management'
  | 'data_protection'
  | 'backup_recovery'
  | 'change_management'
  | 'security_audit';

export type EvidenceType =
  | 'policy_document'
  | 'config_capture'
  | 'log_file'
  | 'scan_report'
  | 'approval_history'
  | 'training_material'
  | 'architecture_doc'
  | 'operational_procedure';

export interface Evidence {
  id: string;
  controlItemId: string;
  name: string;
  type: EvidenceType;
  submitter: string;
  submittedAt: string;
  reviewer?: string;
  status: EvidenceStatus;
  filename: string;
  version: string;
  note?: string;
}

export interface RiskIssue {
  id: string;
  controlItemId: string;
  title: string;
  severity: RiskSeverity;
  foundAt: string;
  owner: string;
  dueDate: string;
  status: IssueStatus;
  actionContent?: string;
  residualRisk?: string;
}

export interface ExternalSubmission {
  id: string;
  vendorName: string;
  evidenceName: string;
  controlItemId: string;
  submittedAt: string;
  status: EvidenceStatus;
  reviewer?: string;
  reviewResult?: string;
  revisionRequested: boolean;
  note?: string;
}

export interface ControlItem {
  id: string;
  area: ControlArea;
  name: string;
  description: string;
  applied: boolean;
  owner: string;
  ownerOrg: string;
  importance: 'low' | 'medium' | 'high';
  checkStatus: ControlCheckStatus;
  evidenceCount: number;
  issueCount: number;
  lastCheckedAt?: string;
  purpose: string;
  targetSystems: string[];
  relatedProjects: string[];
  implementationStatus: string;
  relatedExportRequestIds?: string[];
  auditLog: string[];
}
