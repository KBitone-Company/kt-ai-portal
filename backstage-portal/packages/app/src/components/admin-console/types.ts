export type AdminUserType = '내부' | '외부' | '수행사';

export type RegistrationStatus =
  | '신청'
  | '본인확인완료'
  | '검토중'
  | '승인'
  | '반려'
  | '보완요청';

export type IdentityVerificationStatus =
  | '미확인'
  | '확인중'
  | '확인완료'
  | '확인실패'
  | '재확인필요';

export type AccountStatus = '활성' | '잠금' | '비활성' | '만료예정';

export type AuditEventType =
  | '로그인'
  | '로그아웃'
  | '로그인 실패'
  | '비밀번호 변경'
  | '사용자 정보 수정'
  | '권한 변경'
  | '반출 승인'
  | '검색 조회'
  | '관리자 정책 변경';

export type AuditResult = '성공' | '실패' | '차단';

export type RiskLevel = '낮음' | '보통' | '높음' | '심각';

export type StatusHistoryEvent =
  | '사용자 등록 신청'
  | '본인확인 완료'
  | '검토 시작'
  | '승인'
  | '반려'
  | '보완요청'
  | '계정 생성'
  | '계정 잠금'
  | '계정 해제'
  | '역할 변경'
  | '접속 기간 변경'
  | '접근 서비스 변경';

export type DataAccessLevel = '공개' | '내부' | '비밀';

export type AccessibleService =
  | 'Portal Dashboard'
  | 'Integrated Search'
  | 'Project Workspace'
  | 'Export Approval'
  | 'Credit Manager'
  | 'K-RMF Evidence'
  | 'Admin Console'
  | 'OpenMetadata'
  | 'OpenSearch Dashboards';

export interface AdminSummary {
  pendingRegistrations: number;
  pendingApprovals: number;
  externalUsers: number;
  activeUsers: number;
  lockedAccounts: number;
  permissionGroups: number;
  loginPolicies: number;
  recentSecurityEvents: number;
}

export interface UserRegistration {
  id: string;
  name: string;
  organization: string;
  email: string;
  phone?: string;
  userType: AdminUserType;
  reason: string;
  identityVerified: boolean;
  identityStatus: IdentityVerificationStatus;
  status: RegistrationStatus;
  appliedAt: string;
  // 상세 확장 필드
  department?: string;
  position?: string;
  identityMethod?: string;
  identityVerifiedAt?: string;
  identityResult?: string;
  verifier?: string;
  businessPurpose?: string;
  requestedRole?: string;
  requestedServices?: string[];
  accessStartDate?: string;
  accessEndDate?: string;
  securityOathSubmitted?: boolean;
  privacyAgreed?: boolean;
  externalSecurityConfirmed?: boolean;
  reviewComment?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  accountId: string;
  email: string;
  organization: string;
  department?: string;
  role: string;
  userGroup?: string;
  userType: AdminUserType;
  accountStatus: AccountStatus;
  lastLoginAt: string;
  accessibleServices: AccessibleService[];
  accessibleMenus?: string[];
  dataAccessLevel?: DataAccessLevel;
  projectAccess?: string;
  canApproveExport?: boolean;
  canManageCredit?: boolean;
  canAuditKrmf?: boolean;
  locked: boolean;
}

export interface ExternalUser {
  id: string;
  name: string;
  email: string;
  organization: string;
  company: string;
  accountStatus: AccountStatus;
  accessStart: string;
  accessEnd: string;
  role: string;
  accessibleServices: AccessibleService[];
  lastLoginAt?: string;
  expiryWarning?: boolean;
}

export interface UserStatusHistory {
  id: string;
  timestamp: string;
  actor: string;
  userId: string;
  event: StatusHistoryEvent;
  previousStatus?: string;
  newStatus?: string;
  reason?: string;
  ip?: string;
}

export interface AdminRole {
  id: string;
  name: string;
  description: string;
  target: string;
  accessibleMenus: string[];
  dataAccessLevel: string;
  projectPermission: string;
  approvalAuthority: string[];
  userCount: number;
}

export interface LoginPolicy {
  id: string;
  name: string;
  target: string;
  allowedPeriod: string;
  maxFailedAttempts: number;
  allowDuplicateLogin: boolean;
  unlockMethod: string;
  enabled: boolean;
}

export interface PasswordPolicy {
  id: string;
  name: string;
  minLength: number;
  complexity: string;
  changeCycleDays: number;
  expiredLockAction: string;
  gracePeriodDays: number;
  reuseLimit: number;
  target: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  eventType: AuditEventType;
  target: string;
  ip: string;
  result: AuditResult;
  riskLevel: RiskLevel;
  detail: string;
}

export interface MenuItem {
  id: string;
  name: string;
  parent: string;
  path: string;
  connectedFeature: string;
  displayOrder: number;
  enabled: boolean;
  accessRoles: string[];
  menuType: '메뉴' | '기능' | '외부링크';
}

export interface RequirementCoverage {
  area: string;
  screenImplemented: string;
  logicImplemented: string;
  coverage: string;
  followUp: string;
}

export interface AdminConsoleData {
  summary: AdminSummary;
  registrations: UserRegistration[];
  users: AdminUser[];
  externalUsers: ExternalUser[];
  statusHistories: UserStatusHistory[];
  roles: AdminRole[];
  loginPolicies: LoginPolicy[];
  passwordPolicies: PasswordPolicy[];
  auditLogs: AuditLog[];
  menuItems: MenuItem[];
  requirementCoverage: RequirementCoverage[];
}
