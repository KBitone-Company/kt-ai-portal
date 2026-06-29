export type AdminUserType = '내부' | '외부' | '수행사';

export type RegistrationStatus =
  | '신청'
  | '본인확인완료'
  | '검토중'
  | '승인'
  | '반려';

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
  userType: AdminUserType;
  reason: string;
  identityVerified: boolean;
  status: RegistrationStatus;
  appliedAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  accountId: string;
  email: string;
  organization: string;
  role: string;
  userType: AdminUserType;
  accountStatus: AccountStatus;
  lastLoginAt: string;
  accessibleServices: string[];
  locked: boolean;
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
  roles: AdminRole[];
  loginPolicies: LoginPolicy[];
  passwordPolicies: PasswordPolicy[];
  auditLogs: AuditLog[];
  menuItems: MenuItem[];
  requirementCoverage: RequirementCoverage[];
}
