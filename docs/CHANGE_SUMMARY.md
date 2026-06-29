# CHANGE SUMMARY

## 14단계: 사용자 등록/승인 및 외부 사용자 관리 화면 상세화

### 작성일시

2026-06-29

### 작업 단계

14단계 사용자 등록/승인 및 외부 사용자 관리 화면 상세화

### 작업 목표

- 사용자 등록 신청 상세 화면 구현
- 본인확인 상태 표시 및 승인/반려/보완요청/재신청 mock workflow 구현
- 외부 사용자 계정 관리 화면 추가
- 사용자 소속/역할/접속 가능 서비스 설정 UI 구현
- 사용자 상태 변경 이력 표시
- Keycloak/DB 연동 설계 문서 작성

### 생성 파일

- `packages/app/src/components/admin-console/UserRegistrationDetail.tsx`
- `packages/app/src/components/admin-console/UserApprovalWorkflow.tsx`
- `packages/app/src/components/admin-console/ExternalUserManagementPanel.tsx`
- `packages/app/src/components/admin-console/UserAccessServicePanel.tsx`
- `packages/app/src/components/admin-console/UserStatusHistoryPanel.tsx`
- `packages/app/src/components/admin-console/UserIdentityVerificationChip.tsx`
- `packages/app/src/components/admin-console/UserApprovalStatusChip.tsx`
- `packages/app/src/components/admin-console/UserAccountStatusChip.tsx`
- `docs/USER_MANAGEMENT_DESIGN.md`

### 변경 파일

- `packages/app/src/components/admin-console/types.ts`
- `packages/app/src/components/admin-console/mockAdminData.ts`
- `packages/app/src/components/admin-console/AdminConsolePage.tsx`
- `packages/app/src/components/admin-console/UserRegistrationPanel.tsx`
- `packages/app/src/components/admin-console/UserManagementPanel.tsx`
- `docs/REQUIREMENT_SCREEN_COVERAGE.md`
- `docs/WBS.md`
- `docs/ARCHITECTURE.md`
- `docs/CHANGE_SUMMARY.md`
- `docs/TODO.md`
- `docs/TECH_DEBT.md`
- `docs/FINAL_DELIVERABLES.md`
- `docs/DEMO_SCRIPT.md`
- `notes/DECISIONS.md`
- `README.md`
- `backstage-portal/README.md`

### 구현 내용

- `UserRegistrationDetail`을 통해 신청자 기본정보/본인확인/신청정보/보안확인/승인처리 표시
- `UserIdentityVerificationChip`, `UserApprovalStatusChip`, `UserAccountStatusChip` 추가
- `UserApprovalWorkflow`에서 상태에 따른 검토 시작/승인/반려/보완요청/재신청 버튼 제공
- `ExternalUserManagementPanel`에서 외부/수행사 사용자 목록 및 등록/수정/연장/잠금 버튼 제공
- `UserAccessServicePanel`에서 사용자 소속/부서/그룹/역할/유형/데이터등급/프로젝트접근/권한/서비스 설정 UI 제공
- `UserStatusHistoryPanel`에서 사용자별 상태 변경 이력 표시
- `AdminConsolePage` 탭에 `외부 사용자 관리` 추가 및 등록/이력 상태 관리
- `docs/USER_MANAGEMENT_DESIGN.md` 작성

### 검증 결과

- Backstage `http://localhost:3000` 접속 가능
- Keycloak OIDC 로그인 가능
- Home 화면에 `국방지능화플랫폼` 표시
- Admin Console 접근 가능
- 사용자 등록 신청 상세/승인 workflow 상태 변경 정상
- 외부 사용자 관리 탭 정상 표시
- 사용자 관리 > 접속 가능 서비스 설정 UI 정상
- 기존 메뉴(Integrated Search, Project Workspace, Export Approval, Credit Manager, K-RMF Evidence) 정상 접근
- `yarn tsc --noEmit`에서 신규 코드 타입 오류 없음 (기존 `App.test.tsx` 오류 제외)

### 발생 오류 및 조치

- MUI v4 `findDOMNode is deprecated` warning 유지 (기능에 영향 없음)
- `App.test.tsx` TypeScript 오류 유지 (기존 오류)

### 미완료/보류 사항

- 실제 Keycloak/DB 연동은 15~18단계 및 운영 확장 단계에서 진행

### 다음 단계 작업

- 15단계: 권한/역할/메뉴 관리 화면 상세화

## 13단계: 국방지능화플랫폼 타이틀 변경 및 관리자 기능 화면 1차 보강

### 작성일시

2026-06-29

### 작업 단계

13단계 국방지능화플랫폼 타이틀 변경 및 관리자 기능 화면 1차 보강

### 작업 목표

- 포털 공식 명칭을 `국방지능화플랫폼 (K-Defense Intelligence Platform)`으로 변경
- 요구사항 PDF의 관리자 기능을 1차 화면으로 추가
- 실제 DB/API/Keycloak 관리 로직은 구현하지 않고 mock data 기반 UI 확보

### 생성 파일

- `packages/app/src/components/admin-console/index.ts`
- `packages/app/src/components/admin-console/types.ts`
- `packages/app/src/components/admin-console/mockAdminData.ts`
- `packages/app/src/components/admin-console/AdminConsolePage.tsx`
- `packages/app/src/components/admin-console/AdminSummaryCards.tsx`
- `packages/app/src/components/admin-console/UserRegistrationPanel.tsx`
- `packages/app/src/components/admin-console/UserManagementPanel.tsx`
- `packages/app/src/components/admin-console/RolePermissionPanel.tsx`
- `packages/app/src/components/admin-console/LoginPolicyPanel.tsx`
- `packages/app/src/components/admin-console/PasswordPolicyPanel.tsx`
- `packages/app/src/components/admin-console/AuditLogPanel.tsx`
- `packages/app/src/components/admin-console/MenuManagementPanel.tsx`
- `packages/app/src/components/admin-console/AdminRequirementCoveragePanel.tsx`
- `docs/REQUIREMENT_SCREEN_COVERAGE.md`

### 변경 파일

- `backstage-portal/app-config.yaml`
- `packages/app/src/App.tsx`
- `packages/app/src/components/portal-dashboard/DashboardHero.tsx`
- `packages/app/src/components/portal-dashboard/mockDashboardData.ts`
- `packages/app/src/components/portal-dashboard/QuickLinkCards.tsx`
- `README.md`
- `backstage-portal/README.md`
- `docs/FINAL_DELIVERABLES.md`
- `docs/DEMO_SCRIPT.md`
- `docs/PORTAL_DASHBOARD.md`
- `docs/ARCHITECTURE.md`
- `docs/CHANGE_SUMMARY.md`
- `docs/WBS.md`
- `docs/TODO.md`
- `docs/TECH_DEBT.md`
- `notes/DECISIONS.md`

### 구현 내용

- `app-config.yaml`의 `app.title`, `organization.name`, `mcpActions.name/description`을 `국방지능화플랫폼`으로 변경
- Portal Dashboard Hero의 제목/부제를 `국방지능화플랫폼 / K-Defense Intelligence Platform`으로 변경
- `Admin Console` 메뉴를 사이드바에 추가하고 `/admin-console` 라우팅 등록
- Admin Console 화면 구성
  - 요약 카드 8개
  - 사용자 등록 신청/사용자 관리/권한 역할/로그인 정책/비밀번호 정책/감사 로그/메뉴 관리/요구사항 현황 패널
- Portal Dashboard Quick Links에 `Admin Console` 바로가기 추가
- `docs/REQUIREMENT_SCREEN_COVERAGE.md` 작성 및 주요 문서 갱신

### 검증 결과

- Backstage `http://localhost:3000` 접속 가능
- Keycloak OIDC 로그인 가능
- Home 화면에 `국방지능화플랫폼` 표시
- 기존 메뉴(Integrated Search, Project Workspace, Export Approval, Credit Manager, K-RMF Evidence) 정상 접근
- 신규 메뉴 `Admin Console` 표시 및 `/admin-console` 접근 가능
- Admin Console 화면에 요약 카드 및 8개 패널 표시

### 발생 오류 및 조치

- 기존 `App.test.tsx` TypeScript 오류는 유지됨 (개발 서버 동작에 영향 없음)
- MUI v4 `findDOMNode is deprecated` warning 유지됨 (기능에 영향 없음)

### 미완료/보류 사항

- Admin Console의 사용자/권한/정책/메뉴 관리는 mock data 기반 화면이며 실제 DB/API/Keycloak 연동은 14~16단계에서 진행
- 서비스 카탈로그/제안 게시판은 17단계에서 추가 예정

### 다음 단계 작업

- 14단계: 사용자 등록/승인 및 외부 사용자 관리 화면 상세화

## 12단계: 최종 산출물 및 제안장표용 화면 정리

### 작성일시

2026-06-28

### 작업 단계

12단계 최종 산출물 및 제안장표용 화면 정리

### 작업 목표

- PoC 최종 산출물 목록 정리
- 제안장표/시연용 주요 화면 캡처 정리
- 데모 시나리오 및 발표 멘트 작성
- PoC 한계사항, 운영 전환 고려사항, 후속 개발 과제, 보안 주의사항 정리
- 기술 부채 문서화

### 생성 파일

- `docs/FINAL_DELIVERABLES.md`
- `docs/DEMO_SCRIPT.md`
- `docs/TECH_DEBT.md`
- `docs/assets/final/01-portal-dashboard.png`
- `docs/assets/final/02-integrated-search.png`
- `docs/assets/final/03-project-workspace.png`
- `docs/assets/final/04-export-approval.png`
- `docs/assets/final/05-credit-manager.png`
- `docs/assets/final/06-krmf-evidence.png`
- `docs/assets/final/07-openmetadata.png`
- `docs/assets/final/08-opensearch-dashboards.png`
- `docs/assets/final/09-backstage-signin.png`
- `docs/assets/final/09-keycloak-login.png`

### 변경 파일

- `docs/WBS.md`
- `docs/ARCHITECTURE.md`
- `docs/CHANGE_SUMMARY.md`
- `docs/TODO.md`
- `notes/DECISIONS.md`

### 문서화 내용

- 최종 산출물 목록 및 구현 완료 기능
- 주요 화면 목록과 캡처 파일 매핑
- 6개 데모 시나리오 및 발표 멘트 예시
- PoC 한계사항 10건
- 운영 전환 고려사항 13건
- 후속 개발 과제 10건
- 보안 주의사항
- 기술 부채 8개 영역

### 검증 결과

- Backstage `http://localhost:3000` 접속 가능
- `admin01` Keycloak OIDC 로그인 가능
- Portal Dashboard 표시 확인
- Project Workspace, Export Approval, Credit Manager, K-RMF Evidence, Integrated Search 정상 접근
- OpenSearch proxy 검색 가능
- OpenMetadata 응답 가능
- 주요 화면 캡처 10건 확보

### 미완료/보류 사항

- OpenMetadata UI 로그인은 초기 계정 설정 상태에 따라 달라질 수 있음
- 실제 기능 연동(DB/API)은 12단계 이후 후속 개발 과제로 분리

### 다음 단계 작업

- PoC 이후 후속 개발 및 운영 전환 설계
- 실제 DB/API 연동, 권한 제어, 보안 강화


## 11.1단계: Keycloak OIDC 런타임 환경변수 안정화

### 작성일시

2026-06-28

### 작업 단계

11.1단계 Keycloak OIDC 런타임 환경변수 안정화

### 작업 목표

- Backstage 실행 시 OIDC clientSecret과 session secret이 정상 로딩되도록 수정
- Keycloak `admin01` 사용자 OIDC 로그인 검증
- Portal Dashboard에 Keycloak 사용자 정보가 표시되는지 확인

### 원인 분석

- `yarn start`만으로는 `backstage-portal/.env`의 `AUTH_OIDC_CLIENT_SECRET`, `AUTH_SESSION_SECRET`이 런타임에 자동 로딩되지 않음
- 결과적으로 backend가 OIDC provider를 skip하고 OIDC 로그인 흐름이 진행되지 않음

### 변경 내용

- `backstage-portal/scripts/start-dev.sh` 추가
  - `.env` 파일 존재 확인
  - `.env`의 주석/빈 줄 제거 후 export (macOS 기본 bash 3.2 호환)
  - `AUTH_OIDC_CLIENT_SECRET`, `AUTH_SESSION_SECRET` 필수 여부 확인
  - `yarn start` 실행
- `backstage-portal/README.md` 실행 방법 보강
  - `.env` 준비 방법 안내
  - `./scripts/start-dev.sh` 사용 권장
- `docs/OIDC_RUNTIME_FIX.md` 신규 작성
  - 문제 증상, 원인, 해결 방법, 검증 절차 기록
- `docs/KEYCLOAK_INTEGRATION.md`에 11.1단계 내용 추가

### 생성/변경 파일

- `backstage-portal/scripts/start-dev.sh` (신규)
- `backstage-portal/README.md`
- `docs/OIDC_RUNTIME_FIX.md` (신규)
- `docs/KEYCLOAK_INTEGRATION.md`
- `docs/CHANGE_SUMMARY.md`
- `docs/TODO.md`
- `docs/ARCHITECTURE.md`
- `notes/DECISIONS.md`

### 검증 결과

- `./scripts/start-dev.sh`로 Backstage 재시작
- backend 로그에서 `Configuring auth provider: oidc` 확인 (skip 메시지 미출력)
- Keycloak 로그인 페이지로 정상 리다이렉트
- `admin01 / <password>` 로그인 성공
- Portal Dashboard에 `Admin Kim (user:default/admin01)`, `admin01@kt.ai` 표시 확인
- Home, Project Workspace, Export Approval, Credit Manager, K-RMF Evidence, Integrated Search 정상 접근
- OpenSearch proxy 검색 기능 유지

### 발생 오류 및 조치

- `start-dev.sh` 초기 버전에서 macOS 기본 bash 3.2에서 `source <(...)`가 동작하지 않아 `.env` 로딩 실패
  - `export $(grep -v '^#' .env | grep -v '^$' | xargs)` 방식으로 변경하여 해결

### 다음 단계 작업

- 12단계: 최종 산출물 및 제안장표용 화면 정리


## 11단계: 메인 포털 대시보드 및 홈 화면 재구성

### 작성일시

2026-06-28

### 작업 단계

11단계 메인 포털 대시보드 및 홈 화면 재구성

### 작업 목표

- Backstage Home 화면을 KT/국방 AI 데이터 플랫폼용 메인 포털 대시보드로 재구성
- 로그인 사용자 정보, 통합검색 바로가기, 주요 현황 요약, 신규 자산, 프로젝트/반출/크레딧/K-RMF/시스템 상태를 한눈에 제공
- 제안장표용 화면 캡처에 적합한 시각적 구성

### 생성/변경 파일

- `packages/app/src/components/portal-dashboard/index.ts`
- `packages/app/src/components/portal-dashboard/types.ts`
- `packages/app/src/components/portal-dashboard/mockDashboardData.ts`
- `packages/app/src/components/portal-dashboard/PortalDashboardPage.tsx`
- `packages/app/src/components/portal-dashboard/DashboardHero.tsx`
- `packages/app/src/components/portal-dashboard/DashboardSearchBox.tsx`
- `packages/app/src/components/portal-dashboard/SummaryMetricCards.tsx`
- `packages/app/src/components/portal-dashboard/NoticePanel.tsx`
- `packages/app/src/components/portal-dashboard/RecentAssetsPanel.tsx`
- `packages/app/src/components/portal-dashboard/MyProjectPanel.tsx`
- `packages/app/src/components/portal-dashboard/ExportPendingPanel.tsx`
- `packages/app/src/components/portal-dashboard/CreditSummaryPanel.tsx`
- `packages/app/src/components/portal-dashboard/KrmfProgressPanel.tsx`
- `packages/app/src/components/portal-dashboard/SystemStatusPanel.tsx`
- `packages/app/src/components/portal-dashboard/QuickLinkCards.tsx`
- `packages/app/src/components/integrated-search/IntegratedSearchPage.tsx` (URL `q` 파라미터 연동)
- `packages/app/src/App.tsx` (Home 경로를 `PortalDashboardPage`로 교체)
- `docs/PORTAL_DASHBOARD.md` (신규)
- `docs/WBS.md`
- `docs/ARCHITECTURE.md`
- `docs/TODO.md`
- `notes/DECISIONS.md`

### 구현 내용

- `portal-dashboard` PoC 컴포넌트 생성 (mock data 기반)
- Hero 영역: `K-Defense AI Data Portal`, `국방 AI 데이터 통합포털`, 설명, 사용자 정보, `PoC Running` 배지
- 통합검색 바로가기: `/integrated-search?q=...` 이동, `IntegratedSearchPage`에서 URL 파라미터 반영
- 주요 현황 요약 카드: 데이터셋/AI 모델/프로젝트/반출 대기/크레딧 부족/K-RMF 진행률/OpenSearch 자산/OpenMetadata 상태
- 공지사항, 신규 데이터셋/AI 모델, 내 프로젝트, 반출 승인 대기, 크레딧 요약, K-RMF 증빙 진행률, 시스템 상태 패널
- 주요 메뉴 바로가기: 내부 메뉴 + OpenMetadata/OpenSearch Dashboards/Keycloak Admin 외부 링크

### 화면 구성

- 상단: Hero + 통합검색
- 좌측(8/12): 요약 카드 → 공지사항 → 신규 자산 → 내 프로젝트/반출 대기 (2열)
- 우측(4/12): 크레딧 요약 → K-RMF 진행률 → 시스템 상태 → 바로가기

### 검증 결과

- `http://localhost:3000/` 접속 시 Portal Dashboard 표시
- 로그인 사용자 정보 표시 (guest 테스트 시 mock fallback)
- 통합검색 바로가기 동작 (`/integrated-search?q=정비`)
- Project Workspace, Export Approval, Credit Manager, K-RMF Evidence, Integrated Search 화면 정상 접근
- 기존 메뉴 및 라우팅 유지
- OpenSearch/OpenMetadata/Keycloak 설정 파일 미변경

### 발생 오류 및 조치

- `yarn tsc --noEmit` 시 기존 `App.test.tsx`의 `App.createRoot()` 타입 오류만 확인 (이전 단계부터 존재, 대시보드 코드는 영향 없음)

### 미완료/보류 사항

- Keycloak `admin01` 사용자 로그인 흐름은 설정되어 있으나, 현재 PoC 환경에서는 Guest 로그인으로 검증
- 실시간 시스템 상태, 실제 API 연동은 12단계 이후 후속 작업으로 분리

### 다음 단계 작업

- 12단계: 최종 산출물 및 제안장표용 화면 정리


## 10.2단계: 보안등급 오타 역전 (잘못 적용)

### 작성일시

2026-06-28

### 작업 단계

10.2단계 보안등급 오타 잘못 적용

### 작업 목표

- 보안등급 정상값 `내부`를 오타 `남부`로 잘못 치환
- 코드/문서/샘플 데이터/검색 UI의 보안등급을 `남부`로 통일하려 시도

### 잘못 적용된 내용

- 보안등급 정상값: `내부` → `남부`
- UI 표시값: `internal` → `남부`
- 검색 필터: `남부`
- OpenSearch 샘플 데이터 기준: `남부`
- `normalizeSecurityLevel`에서 `내부`를 과거 데이터 호환용으로 처리

### 복구 방법

- 10.3단계에서 전역 치환으로 `남부`를 `내부`로 재정정
- `_update_by_query`로 OpenSearch `portal-catalog` 데이터를 `내부`로 변환

## 10.3단계: 보안등급 오타 최종 재정정

> 10.2단계에서 오타와 정상값이 뒤바뀌어 적용되었던 문제를 복구한 최종 정정 단계입니다.

### 작성일시

2026-06-28

### 작업 단계

10.2단계 보안등급 오타 최종 정정

### 작업 목표

- 잘못 정규화된 보안등급 `남부`를 `내부`로 최종 정정
- 코드/문서/샘플 데이터/검색 UI의 보안등급을 `공개`, `내부`, `비밀`로 통일
- Integrated Search에서 `internal`을 `내부`로 표시
- 기존 메뉴 및 로그인 기능 회귀 확인

### 정정 내용

- 보안등급 오타: `남부` → `내부`
- UI 표시값: `internal` → `내부`
- 검색 필터: `내부`
- OpenSearch 샘플 데이터 기준: `공개`, `내부`, `비밀`
- `normalizeSecurityLevel`에서 `내부`는 과거 데이터 호환용으로만 허용

### 생성/변경 파일

- `packages/app/src/components/integrated-search/SearchApiClient.ts`
- `packages/app/src/components/integrated-search/SearchFilterPanel.tsx`
- `packages/app/src/components/project-workspace/ProjectRequestForm.tsx`
- `packages/app/src/components/project-workspace/mockProjects.ts`
- `packages/app/src/components/project-workspace/types.ts`
- `packages/app/src/components/export-approval/mockExportRequests.ts`
- `packages/app/src/components/export-approval/SecurityLevelChip.tsx`
- `packages/app/src/components/export-approval/ExportRequestForm.tsx`
- `packages/app/src/components/krmf-evidence/mockKrmfEvidence.ts`
- `infra/opensearch/scripts/02-seed-sample-data.sh`
- `infra/opensearch/scripts/03-search-test.sh`
- `docs/SEARCH_IMPLEMENTATION.md`
- `docs/SEARCH_DESIGN.md`
- `docs/CHANGE_SUMMARY.md`
- `docs/TODO.md`
- `notes/DECISIONS.md`
- `docs/PLUGIN_PROJECT_WORKSPACE.md`
- `docs/OPENMETADATA_DESIGN.md`

### 검증 결과

- `/integrated-search` 접속 및 검색 결과 정상 표시
- `정비`, `고장예측` 키워드 검색 정상
- `dataset` 유형 필터 정상
- `내부` 보안등급 필터 정상 동작
- `군수` 태그 필터 정상
- 화면에 `남부`라는 단어 미표시 확인
- OpenSearch `portal-catalog` 데이터 `내부`로 업데이트 확인
- 기존 메뉴(`Home`, `Project Workspace`, `Export Approval`, `Credit Manager`, `K-RMF Evidence`) 정상 동작

### 다음 단계 작업

- 11단계: 메인 포털 대시보드 및 최종 산출물 정리


## 10단계: 통합검색/카탈로그 검색 고도화

### 작성일시

2026-06-28

### 작업 단계

10단계 통합검색/카탈로그 검색 고도화

### 작업 목표

- Backstage 자체 플러그인 형태의 `integrated-search` 기능 PoC 개발
- OpenSearch `portal-catalog` 인덱스를 검색할 수 있는 통합검색 화면 구현
- 키워드 입력 및 검색 대상 유형/보안등급/소스 시스템/태그 필터 구현
- 검색 결과 목록 및 상세 패널 구현
- OpenSearch 연결 실패 시 mock fallback 처리

### 생성/변경 파일

- `packages/app/src/App.tsx`
- `packages/app/src/components/integrated-search/index.ts`
- `packages/app/src/components/integrated-search/types.ts`
- `packages/app/src/components/integrated-search/IntegratedSearchPage.tsx`
- `packages/app/src/components/integrated-search/SearchBox.tsx`
- `packages/app/src/components/integrated-search/SearchFilterPanel.tsx`
- `packages/app/src/components/integrated-search/SearchResultList.tsx`
- `packages/app/src/components/integrated-search/SearchResultDetail.tsx`
- `packages/app/src/components/integrated-search/SearchTypeChip.tsx`
- `packages/app/src/components/integrated-search/SearchApiClient.ts`
- `packages/app/src/components/integrated-search/mockSearchResults.ts`
- `packages/app/src/components/credit-manager/mockCredits.ts`
- `app-config.yaml`
- `docs/SEARCH_IMPLEMENTATION.md`
- `docs/ARCHITECTURE.md`
- `docs/WBS.md`
- `docs/TODO.md`
- `docs/CHANGE_SUMMARY.md`
- `notes/DECISIONS.md`
- `docs/assets/integrated-search.png`

### 구현 내용

- `packages/app/src/components/integrated-search/`에 PoC 컴포넌트 구현
- Backstage backend proxy(`/api/proxy/search`)를 통해 OpenSearch `portal-catalog` 검색 연동
- `multi_match` 쿼리로 `name`, `description`, `tags` 검색
- `bool filter`로 `type`, `securityLevel`, `sourceSystem`, `tags` 필터 적용
- 검색 결과 10건 표시 및 상세 패널 구현
- OpenSearch 연결 실패 시 `mockSearchResults` fallback 표시
- `App.tsx`에 `Integrated Search` 메뉴 및 `/integrated-search` 라우팅 추가
- `app-config.yaml`에 OpenSearch 프록시 엔드포인트 추가
- `credit-manager/mockCredits.ts` 누락 import 추가로 TypeScript 오류 일부 해결

### OpenSearch 연동 방식

- Backstage backend proxy 사용
- 프론트엔드는 `/api/proxy/search/portal-catalog/_search`가 아닌 `backend.baseUrl`을 조합한 `http://localhost:7007/api/proxy/search/portal-catalog/_search`로 직접 호출
- 개발 환경에서 `credentials: dangerously-allow-unauthenticated` 적용

### 실행 방법

Backstage가 실행 중이면 자동 핫 리로드됩니다.

```bash
cd kt-ai-portal/backstage-portal
yarn start
```

### 검증 방법

1. `http://localhost:3000` 접속
2. Keycloak 로그인 또는 Guest 로그인
3. 좌측 메뉴 `Integrated Search` 클릭
4. 검색어 `정비` 입력 후 Enter → 결과 2건 표시
5. 검색어 `고장예측` 입력 → 결과 표시
6. 유형 필터 `dataset` 적용 → 결과 1건 표시
7. 보안등급 필터 `내부` 적용 → 결과 필터링
8. 태그 필터 `군수` 적용 → 결과 필터링
9. 검색 결과 클릭 시 상세 패널 표시
10. 기존 메뉴(`Project Workspace`, `Export Approval`, `Credit Manager`, `K-RMF Evidence`) 정상 동작 확인

### 확인 결과

- Backstage `http://localhost:3000` 정상 접속
- Keycloak `admin01` 사용자 로그인 상태 유지
- `Integrated Search` 메뉴 노출 및 `/integrated-search` 이동 확인
- `정비` 검색 시 결과 2건 표시
- `dataset` 유형 필터 적용 시 결과 1건 표시
- 검색 결과 상세 패널 정상 표시
- `Project Workspace`, `Export Approval`, `Credit Manager`, `K-RMF Evidence` 화면 정상 동작
- OpenSearch `http://localhost:9200` 응답 200 유지
- OpenMetadata `http://localhost:8585/api/v1/system/version` 응답 200 유지

### 발생 오류 및 조치

- MUI v4 `findDOMNode is deprecated` 경고 발생
  - 기능에 영향 없음. 운영 확장 시 MUI/Backstage UI 최신 버전 마이그레이션 검토
- 처음에는 `/api/proxy/search`를 상대 경로로 호출 시 webpack-dev-server 404 응답
  - `backend.baseUrl`(`http://localhost:7007`)을 조합한 절대 URL로 변경하여 해결
- Backstage backend proxy가 인증을 요구하여 401 응답
  - 개발 환경에서 `credentials: dangerously-allow-unauthenticated` 적용하여 해결

### 미완료/보류 사항

- OpenMetadata 실시간 연동
- 자체 플러그인 데이터 색인(Project Workspace, Export Approval, Credit Manager, K-RMF Evidence)
- 권한 기반 검색 결과 필터링
- 임베딩 기반 유사도 검색
- 검색 감사로그 및 통계
- 운영 환경 proxy 인증 설정

### 다음 단계 작업

- 11단계: 포털 메인 대시보드 및 최종 산출물 정리

## 10.1단계: 검색/보안등급 정규화 안정화

### 작성일시

2026-06-28

### 작업 단계

10.1단계 검색/보안등급 정규화 안정화

### 작업 목표

- 보안등급 오타 `남부`를 `내부`로 정정
- 검색 코드/문서/샘플 데이터 기준을 `공개`, `내부`, `비밀`로 통일
- Integrated Search 화면에서 `internal`을 `내부`로 표시
- 기존 메뉴 및 로그인 기능 회귀 확인

### 정정 대상

- `packages/app/src/components/integrated-search/SearchApiClient.ts`
- `packages/app/src/components/integrated-search/SearchFilterPanel.tsx`
- `docs/SEARCH_IMPLEMENTATION.md`
- `docs/CHANGE_SUMMARY.md`
- `docs/OPENMETADATA_DESIGN.md`
- `notes/DECISIONS.md`

### 구현/정정 내용

- `SearchApiClient.ts`의 `securityLevelToKorean` 라벨을 `internal: '내부'`로 정정
- `normalizeSecurityLevel`을 문자열 기준으로 정리하고, 과거 오타 `남부`는 `internal`로 호환 처리
- `SearchFilterPanel.tsx` 보안등급 옵션을 `전체`, `공개`, `내부`, `비밀`로 정정
- `docs/SEARCH_IMPLEMENTATION.md`의 Query 예시, 보안등급 정규화 문구, 후속 확장 문구 정정
- `docs/CHANGE_SUMMARY.md` 10단계 검증 방법의 보안등급 필터 문구 정정
- `docs/TODO.md`, `notes/DECISIONS.md`에 10.1단계 완료 기록 추가

### OpenSearch 데이터 상태

- `portal-catalog` 인덱스의 `securityLevel` 값은 `공개`, `내부`, `비밀`로 이미 정리되어 있음
- 재적재가 필요한 경우 `infra/opensearch/scripts/01-create-index.sh`, `02-seed-sample-data.sh`, `03-search-test.sh`를 수동 실행

### 검증 결과

- `/integrated-search` 접속 및 검색 결과 정상 표시
- `정비`, `고장예측` 키워드 검색 정상
- `dataset` 유형 필터 정상
- `내부` 보안등급 필터 정상 동작
- `군수` 태그 필터 정상
- 화면에 `남부`라는 단어 미표시 확인
- 기존 메뉴(`Home`, `Project Workspace`, `Export Approval`, `Credit Manager`, `K-RMF Evidence`) 정상 동작

### 다음 단계 작업

- 11단계: 메인 포털 대시보드 및 최종 산출물 정리

## 9단계: 자체 플러그인 4차 - K-RMF 증빙관리

### 작성일시

2026-06-28

### 작업 단계

9단계 자체 플러그인 4차 - K-RMF 증빙관리

### 작업 목표

- Backstage 자체 플러그인 형태의 `krmf-evidence` 기능 PoC 개발
- mock data 기반으로 K-RMF 통제항목, 증빙자료, 보안 미흡사항, 타 수행사 제출자료, 통합진척률 대시보드 구현
- Backstage 좌측 메뉴에 `K-RMF Evidence` 추가
- 기존 `Project Workspace`, `Export Approval`, `Credit Manager`, Keycloak OIDC 로그인, OpenSearch/OpenMetadata 구성 유지

### 생성/변경 파일

- `packages/app/src/App.tsx`
- `packages/app/src/components/krmf-evidence/index.ts`
- `packages/app/src/components/krmf-evidence/types.ts`
- `packages/app/src/components/krmf-evidence/mockKrmfEvidence.ts`
- `packages/app/src/components/krmf-evidence/KrmfEvidencePage.tsx`
- `packages/app/src/components/krmf-evidence/KrmfDashboard.tsx`
- `packages/app/src/components/krmf-evidence/ProgressSummaryCards.tsx`
- `packages/app/src/components/krmf-evidence/ControlItemList.tsx`
- `packages/app/src/components/krmf-evidence/ControlItemDetail.tsx`
- `packages/app/src/components/krmf-evidence/ControlStatusChip.tsx`
- `packages/app/src/components/krmf-evidence/EvidenceList.tsx`
- `packages/app/src/components/krmf-evidence/EvidenceStatusChip.tsx`
- `packages/app/src/components/krmf-evidence/RiskIssueList.tsx`
- `packages/app/src/components/krmf-evidence/IssueStatusChip.tsx`
- `packages/app/src/components/krmf-evidence/RiskSeverityChip.tsx`
- `packages/app/src/components/krmf-evidence/ExternalSubmissionList.tsx`
- `docs/PLUGIN_KRMF_EVIDENCE.md`
- `docs/ARCHITECTURE.md`
- `docs/WBS.md`
- `docs/TODO.md`
- `docs/CHANGE_SUMMARY.md`
- `docs/assets/krmf-evidence.png`

### 구현 내용

- `packages/app/src/components/krmf-evidence/`에 PoC 컴포넌트 구현
- 11건의 K-RMF 통제항목 mock data 작성(접근통제, 계정관리, 로그관리, 암호화, 네트워크 보안, 취약점 관리, 데이터 보호, 백업/복구, 변경관리, 보안감사)
- 통합진척률 대시보드(요약 카드 8개, 영역별 진척률, 최근 미흡사항) 구현
- 통제항목 목록 및 상세(적용 여부, 담당자, 점검 상태, 증빙/이력, 관련 프로젝트/반출 이력) 구현
- 증빙자료 목록(상태/유형/검색 필터) 구현
- 보안 미흡사항 조치관리(위험도/조치 상태/검색 필터) 구현
- 타 수행사 제출자료 관리(검토 상태/검색 필터, 보완요청 여부) 구현
- `App.tsx`에 `K-RMF Evidence` 메뉴 및 `/krmf-evidence` 라우팅 추가

### 실행 방법

Backstage가 실행 중이면 자동 핫 리로드됩니다.

```bash
cd kt-ai-portal/backstage-portal
yarn start
```

### 검증 방법

1. `http://localhost:3000` 접속
2. Keycloak 로그인 또는 Guest 로그인
3. 좌측 메뉴 `K-RMF Evidence` 클릭
4. 대시보드 요약 카드 및 영역별 진척률 확인
5. `통제항목`, `증빙자료`, `미흡사항`, `타 수행사 자료` 탭 확인
6. `Project Workspace`, `Export Approval`, `Credit Manager` 메뉴 및 기존 화면이 정상 동작하는지 확인

### 확인 결과

- Backstage `http://localhost:3000` 정상 접속
- Keycloak `admin01` 사용자 로그인 상태 유지
- `K-RMF Evidence` 메뉴 노출 및 `/krmf-evidence` 이동 확인
- 대시보드 요약 카드 8개 및 영역별 진척률 정상 표시
- 통제항목 11건 목록 및 상세 정보 표시
- 증빙자료 5건, 보안 미흡사항 4건, 타 수행사 제출자료 5건 표시
- `Project Workspace`, `Export Approval`, `Credit Manager` 화면 정상 동작
- OpenSearch `http://localhost:9200` 응답 200 유지
- OpenMetadata `http://localhost:8585/api/v1/system/version` 응답 200 유지

### 발생 오류 및 조치

- MUI v4 `findDOMNode is deprecated` 경고 발생
  - 기능에 영향 없음. 운영 확장 시 MUI/Backstage UI 최신 버전 마이그레이션 검토

### 미완료/보류 사항

- 실제 DB/API 연동
- 파일 업로드/다운로드 및 파일 저장소 연계
- Project Workspace, Export Approval과의 실제 데이터 연동
- 감사 시스템 및 이력 자동 수집
- Keycloak 사용자/그룹 기반 권한 제어
- 정식 Backstage Plugin 구조 전환

### 다음 단계 작업

- 10단계: 통합검색 플러그인 또는 화면 개발

## 8단계: 자체 플러그인 3차 - 크레딧 관리

### 작성일시

2026-06-28

### 작업 단계

8단계 자체 플러그인 3차 - 크레딧 관리

### 사전 정정 사항

- 7단계 및 이전 단계에서 보안등급을 `공개`, `내부`, `비밀` 3개로 통일
- 정정 대상:
  - `packages/app/src/components/export-approval/*`
  - `packages/app/src/components/project-workspace/*`
  - `docs/PLUGIN_PROJECT_WORKSPACE.md`
  - `docs/OPENMETADATA_DESIGN.md`
  - `notes/DECISIONS.md`
- 보안등급을 `공개`, `내부`, `비밀` 3개로 통일

### 작업 목표

- Backstage 자체 플러그인 형태의 `credit-manager` 기능 PoC 개발
- mock data 기반으로 프로젝트별 크레딧 현황, 요약 카드, 충전/사용 이력, 자원별 단가, 자원 제한 상태, 알림 패널 구현
- Backstage 좌측 메뉴에 `Credit Manager` 추가
- 기존 `Project Workspace`, `Export Approval`, Keycloak OIDC 로그인, OpenSearch/OpenMetadata 구성 유지

### 생성/변경 파일

- `packages/app/src/App.tsx`
- `packages/app/src/components/credit-manager/index.ts`
- `packages/app/src/components/credit-manager/types.ts`
- `packages/app/src/components/credit-manager/mockCredits.ts`
- `packages/app/src/components/credit-manager/CreditManagerPage.tsx`
- `packages/app/src/components/credit-manager/ProjectCreditSummary.tsx`
- `packages/app/src/components/credit-manager/CreditBalanceCards.tsx`
- `packages/app/src/components/credit-manager/CreditChargeHistory.tsx`
- `packages/app/src/components/credit-manager/CreditUsageHistory.tsx`
- `packages/app/src/components/credit-manager/ResourcePriceTable.tsx`
- `packages/app/src/components/credit-manager/ResourceAvailabilityPanel.tsx`
- `packages/app/src/components/credit-manager/CreditAlertPanel.tsx`
- `packages/app/src/components/credit-manager/CreditStatusChip.tsx`
- `packages/app/src/components/export-approval/SecurityLevelChip.tsx`
- `packages/app/src/components/export-approval/ExportRequestForm.tsx`
- `packages/app/src/components/export-approval/mockExportRequests.ts`
- `packages/app/src/components/project-workspace/types.ts`
- `packages/app/src/components/project-workspace/mockProjects.ts`
- `packages/app/src/components/project-workspace/ProjectRequestForm.tsx`
- `docs/PLUGIN_CREDIT_MANAGER.md`
- `docs/PLUGIN_PROJECT_WORKSPACE.md`
- `docs/OPENMETADATA_DESIGN.md`
- `docs/ARCHITECTURE.md`
- `docs/WBS.md`
- `docs/TODO.md`
- `notes/DECISIONS.md`
- `docs/assets/credit-manager.png`

### 구현 내용

- `packages/app/src/components/credit-manager/`에 PoC 컴포넌트 구현
- 5건 이상의 mock 프로젝트 크레딧 데이터 작성
- 요약 카드(총 부여/사용/잔여/평균 사용률/부족 프로젝트 수/이번 달 예상 사용량) 구현
- 프로젝트별 크레딧 현황 테이블, 충전 이력, 사용 이력, 자원별 단가표 구현
- 선택된 프로젝트의 크레딧 상태에 따른 자원 사용 가능/제한 패널 구현
- 알림/경고 패널 구현
- `App.tsx`에 `Credit Manager` 메뉴 및 `/credit-manager` 라우팅 추가
- 보안등급을 `공개`, `내부`, `비밀` 3개로 통일

### 실행 방법

Backstage가 실행 중이면 자동 핫 리로드됩니다.

```bash
cd kt-ai-portal/backstage-portal
yarn start
```

### 검증 방법

1. `http://localhost:3000` 접속
2. Keycloak 로그인 또는 Guest 로그인
3. 좌측 메뉴 `Credit Manager` 클릭
4. 요약 카드, 알림 패널, 프로젝트별 현황, 자원 사용 가능 상태, 충전/사용 이력, 단가표 확인
5. `Project Workspace`, `Export Approval` 메뉴 및 기존 화면이 정상 동작하는지 확인

### 확인 결과

- Backstage `http://localhost:3000` 정상 접속
- Keycloak `admin01` 사용자 로그인 상태 유지
- `Credit Manager` 메뉴 노출 및 `/credit-manager` 이동 확인
- 요약 카드 6개 정상 표시
- 프로젝트별 크레딧 현황 5건 표시
- 자원 사용 가능 상태(정상/주의/부족/소진/중지) 표시
- 충전 이력, 사용 이력, 자원별 단가표 표시
- 알림/경고 패널 표시
- `Project Workspace`, `Export Approval` 화면 정상 동작
- OpenSearch `http://localhost:9200` 응답 200 유지
- OpenMetadata `http://localhost:8585/api/v1/system/version` 응답 200 유지

### 발생 오류 및 조치

- MUI v4 `findDOMNode is deprecated` 경고 발생
  - 기능에 영향 없음. 운영 확장 시 MUI/Backstage UI 최신 버전 마이그레이션 검토
- `validateDOMNesting` 경고: `ResourceAvailabilityPanel`에서 `Chip`이 `<p>` 납부에 위치
  - `Typography component="div"`로 변경하여 해결

### 미완료/보류 사항

- 실제 DB/API 연동
- 실제 과금/결제 처리
- Keycloak 사용자/그룹 연동
- OpenMetadata/OpenSearch 연계
- AI 학습 작업/Notebook/Inference API 사용량 수집
- 클라우드 모니터링 시스템 연계
- 크레딧 부족 시 실제 자원 제한
- 정식 Backstage Plugin 구조 전환

### 다음 단계 작업

- 9단계: 자체 플러그인 4차 - K-RMF 증빙관리

## 7단계: 자체 플러그인 2차 - 반출/반입 관리

### 작성일시

2026-06-28

### 작업 단계

7단계 자체 플러그인 2차 - 반출/반입 관리

### 작업 목표

- Backstage 자체 플러그인 형태의 `export-approval` 기능 PoC 개발
- mock data 기반으로 반출/반입 신청 목록, 상세, 등록 화면 구현
- 반출 대상 유형, 승인 상태, 보안등급/공개여부/사용권한, 다운로드 여부, 감사로그 UI 구현
- Backstage 좌측 메뉴에 `Export Approval` 추가
- 기존 `Project Workspace`, Keycloak OIDC 로그인, OpenSearch/OpenMetadata 구성 유지

### 생성/변경 파일

- `packages/app/src/App.tsx`
- `packages/app/src/components/export-approval/index.ts`
- `packages/app/src/components/export-approval/types.ts`
- `packages/app/src/components/export-approval/mockExportRequests.ts`
- `packages/app/src/components/export-approval/ExportApprovalPage.tsx`
- `packages/app/src/components/export-approval/ExportRequestList.tsx`
- `packages/app/src/components/export-approval/ExportRequestDetail.tsx`
- `packages/app/src/components/export-approval/ExportRequestForm.tsx`
- `packages/app/src/components/export-approval/ExportStatusChip.tsx`
- `packages/app/src/components/export-approval/ExportTargetTypeChip.tsx`
- `packages/app/src/components/export-approval/SecurityLevelChip.tsx`
- `packages/app/src/components/export-approval/AuditLogPanel.tsx`
- `docs/PLUGIN_EXPORT_APPROVAL.md`
- `docs/ARCHITECTURE.md`
- `docs/WBS.md`
- `docs/TODO.md`
- `notes/DECISIONS.md`
- `docs/assets/export-approval-list.png`
- `docs/assets/export-approval-form.png`

### 구현 내용

- `packages/app/src/components/export-approval/`에 PoC 컴포넌트 구현
- 8건 이상의 mock 반출/반입 신청 데이터 작성
- 반출/반입 구분, 대상 유형 Chip, 상태 Chip, 보안 Chip 구현
- 신청 목록 테이블, 상세 패널, 등록 폼, 감사로그 패널 구현
- `App.tsx`에 `Export Approval` 메뉴 및 `/export-approval` 라우팅 추가
- `Home`, `Project Workspace` 메뉴 및 라우팅 유지

### 실행 방법

Backstage가 실행 중이면 자동 핫 리로드됩니다.

```bash
cd kt-ai-portal/backstage-portal
yarn start
```

### 검증 방법

1. `http://localhost:3000` 접속
2. Keycloak 로그인 또는 Guest 로그인
3. 좌측 메뉴 `Export Approval` 클릭
4. 반출/반입 신청 목록 및 상세 정보 확인
5. `신청 등록` 탭에서 폼 및 mock 저장 버튼 확인
6. `Project Workspace` 메뉴 및 기존 화면이 정상 동작하는지 확인

### 확인 결과

- Backstage `http://localhost:3000` 정상 접속
- Keycloak `admin01` 사용자 로그인 상태 유지
- `Export Approval` 메뉴 노출 및 `/export-approval` 이동 확인
- 반출/반입 신청 목록 8건 표시
- 신청 상세 정보(신청 사유, 보안설정, 첨부자료, 감사로그) 표시
- 신청 등록 UI 표시
- `Project Workspace` 화면 `/project-workspace` 정상 동작
- OpenSearch `http://localhost:9200` 응답 200 유지
- OpenMetadata `http://localhost:8585/api/v1/system/version` 응답 200 유지

### 발생 오류 및 조치

- MUI v4 Tabs의 `findDOMNode is deprecated` 경고 발생
  - 기능에는 영향 없음. 운영 확장 시 MUI/Backstage UI 최신 버전 마이그레이션 검토

### 미완료/보류 사항

- 실제 DB/API 연동
- 실제 파일 업로드/다운로드 기능
- Keycloak 사용자/그룹과 신청자/승인자 연동
- OpenMetadata 자산 연동
- OpenSearch 검색 연계
- K-RMF 증빙관리 연계
- 정식 Backstage Plugin 구조 전환

### 다음 단계 작업

- 8단계: 자체 플러그인 3차 - 크레딧 관리

## 6단계: 자체 플러그인 1차 - 프로젝트/워크스페이스 관리

### 작성일시

2026-06-28

### 작업 단계

6단계 자체 플러그인 1차 - 프로젝트/워크스페이스 관리

### 작업 목표

- Backstage 자체 플러그인 형태의 `project-workspace` 기능 PoC 개발
- mock data 기반으로 프로젝트 목록, 상세, 생성 신청, 상태, 참여자/역할, 리소스 할당량 화면 구현
- Backstage 좌측 메뉴에 `Project Workspace` 추가
- 기존 Keycloak OIDC 로그인 및 OpenSearch/OpenMetadata 구성 유지

### 생성/변경 파일

- `packages/app/src/App.tsx`
- `packages/app/src/components/project-workspace/index.ts`
- `packages/app/src/components/project-workspace/types.ts`
- `packages/app/src/components/project-workspace/mockProjects.ts`
- `packages/app/src/components/project-workspace/ProjectWorkspacePage.tsx`
- `packages/app/src/components/project-workspace/ProjectList.tsx`
- `packages/app/src/components/project-workspace/ProjectDetail.tsx`
- `packages/app/src/components/project-workspace/ProjectRequestForm.tsx`
- `packages/app/src/components/project-workspace/ProjectStatusChip.tsx`
- `packages/app/src/components/project-workspace/ResourceQuotaCard.tsx`
- `docs/PLUGIN_PROJECT_WORKSPACE.md`
- `docs/ARCHITECTURE.md`
- `docs/WBS.md`
- `docs/TODO.md`
- `notes/DECISIONS.md`
- `docs/assets/project-workspace-list.png`
- `docs/assets/project-workspace-request.png`

### 구현 내용

- `packages/app/src/components/project-workspace/`에 PoC 컴포넌트 구현
- 5건 이상의 mock 프로젝트 데이터 작성
- 프로젝트 목록 테이블, 상세 패널, 생성 신청 폼, 상태 Chip, 리소스 할당량 카드 구현
- `App.tsx`에 `SidebarPage`/`Content` 레이아웃 및 `Project Workspace` 메뉴 추가
- `/project-workspace` 라우팅 연결

### 실행 방법

Backstage가 실행 중이면 자동 핫 리로드됩니다.

```bash
cd kt-ai-portal/backstage-portal
yarn start
```

### 검증 방법

1. `http://localhost:3000` 접속
2. Keycloak 로그인 또는 Guest 로그인
3. 좌측 메뉴 `Project Workspace` 클릭
4. 프로젝트 목록 및 상세 정보 확인
5. `프로젝트 생성 신청` 탭에서 폼 및 mock 저장 버튼 확인

### 확인 결과

- Backstage `http://localhost:3000` 정상 접속
- Keycloak `admin01` 사용자 로그인 상태 유지 (Home 화면에서 사용자 정보 확인)
- `Project Workspace` 메뉴 노출 및 `/project-workspace` 이동 확인
- 프로젝트 목록 5건 표시
- 프로젝트 상세 정보(참여자, 리소스, 데이터셋, 모델, 승인 이력) 표시
- 프로젝트 생성 신청 UI 표시
- OpenSearch `http://localhost:9200` 응답 확인 (200)
- OpenMetadata `http://localhost:8585` 접속 확인 (이전 단계 유지)

### 발생 오류 및 조치

- MUI v4 Tabs의 `findDOMNode is deprecated` 경고 발생
  - 기능에는 영향 없음. 운영 확장 시 MUI/Backstage UI 최신 버전 마이그레이션 검토
- `SidebarPage`/`Content` 미사용으로 인해 Playwright 테스트 시 Sidebar drawer가 콘텐츠를 가림
  - `SidebarPage` + `Content`로 레이아웃 변경하여 해결

### 미완료/보류 사항

- 실제 DB/API 연동
- Keycloak 사용자/그룹과 프로젝트 멤버 연동
- OpenMetadata 데이터셋/모델 연동
- 크레딧 관리, 반출관리, K-RMF 증빙관리 플러그인과의 연계
- 정식 Backstage Plugin 구조 전환

### 다음 단계 작업

- 7단계: 자체 플러그인 2차 - 반출/반입 관리

## 5단계: OpenMetadata 카탈로그 연동

### 작성일시

2026-06-28

### 작업 단계

5단계 OpenMetadata 카탈로그 연동

### 작업 목표

- OpenMetadata 1.6.0을 Docker Compose 기반으로 로컬 개발환경에서 실행
- UI(`http://localhost:8585`) 및 API(`/api/v1`) 접근 검증
- 데이터/AI 카탈로그 개념 및 Backstage 연동 후보 문서화
- Backstage와의 직접 연동은 10단계로 이관

### 생성/변경 파일

- `infra/openmetadata/docker-compose.yml`
- `infra/openmetadata/README.md`
- `docs/OPENMETADATA_DESIGN.md`
- `docs/ARCHITECTURE.md`
- `docs/WBS.md`
- `docs/TODO.md`
- `notes/DECISIONS.md`
- `docs/assets/openmetadata-ui.png`

### 구현 내용

- OpenMetadata 1.6.0 공식 Docker Compose(quickstart) 기반 실행
- 기존 `kt-keycloak`(8080) 및 `kt-opensearch`(9200)와의 포트 충돌 회피를 위해 Elasticsearch/MySQL/Ingestion 호스트 포트 매핑 제거
- OpenMetadata UI `http://localhost:8585` 접속 확인
- `/api/v1/system/version` API 응답 확인 (버전 1.6.0)
- JWT 로그인(`POST /api/v1/users/login`) 및 `tables`, `mlmodels` API 호출 검증
- 데이터셋/테이블/AI 모델/파이프라인 메타데이터 개념 정리
- Backstage 연동 후보 정리: REST API 직접 호출, OpenMetadata → OpenSearch 싱크, UI 임베드, OIDC SSO
- `docs/OPENMETADATA_DESIGN.md` 작성

### 실행 방법

```bash
cd infra/openmetadata
docker compose up -d
```

### 검증 방법

1. `curl http://localhost:8586/healthcheck`로 healthcheck 확인
2. `curl http://localhost:8585/api/v1/system/version`로 버전 확인
3. `POST /api/v1/users/login`으로 JWT 발급
4. `GET /api/v1/tables?limit=0`, `GET /api/v1/mlmodels?limit=0` API 호출 확인
5. 브라우저에서 `http://localhost:8585` 접속 확인

### 확인 결과

- `openmetadata_server` 등 6개 컨테이너 정상 기동
- UI `http://localhost:8585` 로그인 페이지 정상 표시
- `/api/v1/system/version` 정상 응답 (OpenMetadata 1.6.0)
- JWT 로그인 성공 및 `tables`, `mlmodels` API 200 응답
- 기존 서비스와의 포트 충돌 없음

### 발생 오류 및 조치

- 공식 quickstart의 호스트 포트(3306, 9200, 8080)가 기존 `kt-keycloak`/`kt-opensearch`와 충돌
  - 조치: Elasticsearch/MySQL/Ingestion의 호스트 포트 매핑을 제거하고 낮쪽 Docker 네트워크에서만 통신

### 미완료/보류 사항

- OpenMetadata 서비스 등록 및 실제 데이터 소스 연결 → 10단계 이후
- OpenMetadata → OpenSearch 메타데이터 싱크 → 10단계
- Backstage 통합검색 UI 및 OpenMetadata 상세 연결 → 10단계
- OpenMetadata SSO(Keycloak OIDC) 연동 → 운영 확장 단계

### 다음 단계 작업

- 6단계: 자체 플러그인 1차 - 프로젝트/워크스페이스 관리

## 4단계: OpenSearch 검색엔진 연동

### 작성일시

2026-06-28

### 작업 단계

4단계 OpenSearch 검색엔진 연동

### 작업 목표

- OpenSearch를 Docker Compose 기반으로 로컬 개발환경에서 단독 실행
- 포털 통합검색에 사용할 `portal-catalog` 인덱스 생성
- 샘플 메타데이터 적재 및 검색 테스트
- Backstage와의 직접 연동은 10단계로 이관

### 생성/변경 파일

- `infra/opensearch/docker-compose.yml`
- `infra/opensearch/README.md`
- `infra/opensearch/scripts/01-create-index.sh`
- `infra/opensearch/scripts/02-seed-sample-data.sh`
- `infra/opensearch/scripts/03-search-test.sh`
- `infra/opensearch/scripts/run-all.sh`
- `docs/SEARCH_DESIGN.md`
- `docs/ARCHITECTURE.md`
- `docs/WBS.md`
- `docs/TODO.md`
- `notes/DECISIONS.md`

### 구현 내용

- OpenSearch 2.19.1 + OpenSearch Dashboards 2.19.1 개발용 단일 노드 구성
- 보안 플러그인 비활성화 및 개발용 초기 관리자 비밀번호 설정
- `portal-catalog` 인덱스 생성 (명시적 mapping)
- 샘플 데이터 10건 적재 (dataset 4건, model 2건, docker_image 1건, pypi_package 1건, document 2건)
- 키워드 검색 및 유형/보안등급/태그 필터 검색 테스트 스크립트 작성
- `run-all.sh` 오케스트레이션 스크립트 작성
- `docs/SEARCH_DESIGN.md` 작성

### 실행 방법

```bash
cd infra/opensearch
docker compose up -d
./scripts/run-all.sh
```

### 검증 방법

1. `curl http://localhost:9200`로 OpenSearch 응답 확인
2. `http://localhost:5601`로 OpenSearch Dashboards 접속 확인
3. `./scripts/01-create-index.sh`로 `portal-catalog` 인덱스 생성
4. `./scripts/02-seed-sample-data.sh`로 샘플 데이터 적재
5. `./scripts/03-search-test.sh`로 6가지 검색 케이스 실행

### 확인 결과

- `kt-opensearch`, `kt-opensearch-dashboards` 컨테이너 정상 실행
- `curl http://localhost:9200` 정상 응답 (OpenSearch 2.19.1)
- OpenSearch Dashboards `http://localhost:5601` 접속 가능
- `portal-catalog` 인덱스 생성 성공
- 샘플 데이터 10건 적재 성공
- 검색 테스트 6개 케이스 모두 정상 수행
  - 전체 검색: 10건
  - `정비` 키워드 검색: 2건
  - `고장예측` 키워드 검색: 2건
  - `type=dataset` 필터: 4건
  - `securityLevel=내부` 필터: 5건
  - `tags=군수` 필터: 7건

### 발생 오류 및 조치

- 최초 실행 시 `OPENSEARCH_INITIAL_ADMIN_PASSWORD` 미설정으로 OpenSearch가 종료됨
  - 조치: `docker-compose.yml`에 `OPENSEARCH_INITIAL_ADMIN_PASSWORD` 추가
- `plugins.security.disabled=true`와 `DISABLE_SECURITY_PLUGIN=true`를 동시에 설정 시 중복 설정 오류 발생
  - 조치: `DISABLE_SECURITY_PLUGIN=true`만 유지

### 미완료/보류 사항

- Backstage 검색 UI 개발 → 10단계
- OpenSearch와 Backstage 직접 연동 → 10단계
- 임베딩 기반 유사도 검색 → 10단계 이후 고도화
- OpenMetadata 연동 → 5단계

### 다음 단계 작업

- 5단계: OpenMetadata 카탈로그 연동
  - `infra/openmetadata` 실행 방법 정리
  - OpenMetadata 공식 Docker Compose 기반 실행
  - 데이터셋/테이블/AI 모델/파이프라인 메타데이터 개념 문서화
  - OpenMetadata API 연계 후보 정리
  - `docs/OPENMETADATA_DESIGN.md` 작성
