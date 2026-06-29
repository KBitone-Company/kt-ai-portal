# TODO

## 완료 단계

- [x] 1단계: Backstage 기본 포털 구축 완료
  - [x] 프로젝트 기본 구조 생성
  - [x] 초기 문서 작성 (WBS, ARCHITECTURE, CHANGE_SUMMARY, TODO)
  - [x] Backstage 앱 생성
  - [x] Backstage 로컬 실행 및 접속 확인
  - [x] README.md 실행 방법 작성

- [x] 2단계: Keycloak 인증/권한 연동 준비 완료
  - [x] `infra/keycloak/docker-compose.yml` 작성
  - [x] Keycloak Docker 실행
  - [x] `kt-ai` Realm, `backstage` Client 설계 및 생성
  - [x] 테스트 사용자/그룹/역할 정의 및 생성
  - [x] `docs/KEYCLOAK_SETUP.md` 작성

- [x] 3단계: Backstage와 Keycloak OIDC 연동 완료
  - [x] Backstage OIDC Provider 설정 (`app-config.yaml`)
  - [x] Keycloak Client Secret 환경변수 분리
  - [x] `AUTH_SESSION_SECRET` 설정
  - [x] Backstage 로그인 UI에서 Keycloak OIDC 선택 가능
  - [x] Keycloak 로그인 성공 후 Backstage로 복귀 확인
  - [x] Backstage identity에 Keycloak 사용자 정보 반영 확인
  - [x] `docs/KEYCLOAK_INTEGRATION.md` 작성

- [x] 4단계: OpenSearch 검색엔진 연동 완료
  - [x] `infra/opensearch/docker-compose.yml` 작성
  - [x] 개발용 단일 노드 OpenSearch 실행
  - [x] OpenSearch Dashboards 실행
  - [x] `portal-catalog` 인덱스 생성
  - [x] 샘플 메타데이터 8건 이상 적재
  - [x] 검색 테스트 스크립트 작성 및 실행
  - [x] `docs/SEARCH_DESIGN.md` 작성

- [x] 5단계: OpenMetadata 카탈로그 연동 완료
  - [x] `infra/openmetadata` 실행 방법 정리
  - [x] OpenMetadata 공식 Docker Compose 기반 실행
  - [x] UI/API 접근 검증
  - [x] 데이터셋/테이블/AI 모델/파이프라인 메타데이터 개념 문서화
  - [x] OpenMetadata API 연계 후보 정리
  - [x] `docs/OPENMETADATA_DESIGN.md` 작성

- [x] 6단계: 자체 플러그인 1차 - 프로젝트/워크스페이스 관리 완료
  - [x] `project-workspace` 기능 생성
  - [x] 메뉴 `Project Workspace` 추가
  - [x] 프로젝트 목록 화면 구현
  - [x] 프로젝트 상세 화면 구현
  - [x] 프로젝트 생성 신청 화면 구현
  - [x] 승인/반려 상태 UI 구현
  - [x] 참여자/역할 UI 구현
  - [x] 리소스 할당량 UI 구현
  - [x] mock data 기반 PoC 구현
  - [x] API/DB 연동 확장 구조 문서화
  - [x] `docs/PLUGIN_PROJECT_WORKSPACE.md` 작성

- [x] 7단계: 자체 플러그인 2차 - 반출/반입 관리 완료
  - [x] `export-approval` 기능 생성
  - [x] 반출/반입 신청 목록 화면 구현
  - [x] 반출/반입 신청 상세 화면 구현
  - [x] 반출/반입 신청 등록 화면 구현
  - [x] 반출 대상 유형 UI 구현
  - [x] 승인 상태 UI 구현
  - [x] 보안등급/공개여부/사용권한 UI 구현
  - [x] 다운로드 가능 여부 표시
  - [x] 감사로그 mock data 표시
  - [x] mock data 기반 PoC 구현
  - [x] API/DB/파일저장소 연동 확장 구조 문서화
  - [x] `docs/PLUGIN_EXPORT_APPROVAL.md` 작성

- [x] 8단계: 자체 플러그인 3차 - 크레딧 관리 완료
  - [x] `credit-manager` 기능 생성
  - [x] 프로젝트별 크레딧 현황 UI
  - [x] 총 부여/사용/잔여 크레딧 요약 카드
  - [x] 충전 이력 표시
  - [x] 사용 이력 표시
  - [x] 예상 사용 가능 기간 표시
  - [x] 자원별 단가 설정
  - [x] 크레딧 부족 시 자원 비활성화 상태 표시
  - [x] 알림/경고 패널 표시
  - [x] mock data 기반 PoC 구현
  - [x] API/DB/큐브 사용량 연동 확장 구조 문서화
  - [x] `docs/PLUGIN_CREDIT_MANAGER.md` 작성

- [x] 9단계: 자체 플러그인 4차 - K-RMF 증빙관리 완료
  - [x] `krmf-evidence` 기능 생성
  - [x] K-RMF 통제항목 목록 화면 구현
  - [x] 통제항목 적용 여부/담당자/점검 상태 UI
  - [x] 통제항목 상세 및 증빙/이력 UI
  - [x] 증빙자료 목록/상태 UI
  - [x] 보안 미흡사항 조치관리 UI
  - [x] 타 수행사 제출자료 관리 UI
  - [x] 통합진척률 대시보드
  - [x] mock data 기반 PoC 구현
  - [x] API/DB/파일저장소 연동 확장 구조 문서화
  - [x] `docs/PLUGIN_KRMF_EVIDENCE.md` 작성

- [x] 10단계: 통합검색 플러그인 또는 화면 개발
  - [x] `integrated-search` 기능 생성
  - [x] 메뉴 `Integrated Search` 추가
  - [x] OpenSearch `portal-catalog` 검색 연동
  - [x] 검색어 입력 UI 구현
  - [x] 검색 대상 유형 필터 UI 구현
  - [x] 보안등급 필터 UI 구현
  - [x] 소스 시스템 필터 UI 구현
  - [x] 태그 필터 UI 구현
  - [x] 검색 결과 목록 구현
  - [x] 검색 결과 상세 패널 구현
  - [x] OpenSearch 연결 실패 시 mock fallback 처리
  - [x] 임베딩 기반 유사도 검색 설계 문서화
  - [x] 권한 기반 검색 결과 필터링 설계 문서화
  - [x] `docs/SEARCH_IMPLEMENTATION.md` 작성

## 10.1단계: 검색/보안등급 정규화 안정화 완료

- [x] 보안등급 오타 `남부` → `내부` 정정
- [x] Integrated Search 보안등급 표시 정규화
  - `SearchFilterPanel` 보안등급 옵션: `전체`, `공개`, `내부`, `비밀`
  - `SearchApiClient` `securityLevelToKorean` 라벨: `internal` → `내부`
  - `normalizeSecurityLevel`: 문자열 기준 정규화, 과거 오타 `남부`는 호환용으로 `internal` 처리
- [x] 문서 내 보안등급 기준 정리
  - `docs/SEARCH_IMPLEMENTATION.md`
  - `docs/CHANGE_SUMMARY.md`
  - `docs/OPENMETADATA_DESIGN.md`
- [x] OpenSearch `portal-catalog` 실제 데이터 확인 (`공개`, `내부`, `비밀`)
- [x] 검색/필터 및 기존 메뉴 회귀 확인

## 10.2단계: 보안등급 오타 최종 정정 완료

- [x] 보안등급 오타 `내부` → `내부` 최종 정정
- [x] Integrated Search 보안등급 표시값 `내부` 확인
  - `SearchFilterPanel` 보안등급 옵션: `전체`, `공개`, `내부`, `비밀`
  - `SearchApiClient` `securityLevelToKorean` 라벨: `internal` → `내부`
  - `normalizeSecurityLevel`: 문자열 기준 정규화, 과거 오타 `남부`는 호환용으로 `internal` 처리
- [x] 문서/코드/샘플 데이터 보안등급 기준 통일
  - `docs/SEARCH_IMPLEMENTATION.md`
  - `docs/SEARCH_DESIGN.md`
  - `docs/PLUGIN_PROJECT_WORKSPACE.md`
  - `docs/OPENMETADATA_DESIGN.md`
  - `docs/CHANGE_SUMMARY.md`
  - `notes/DECISIONS.md`
- [x] OpenSearch `portal-catalog` 샘플 데이터 및 실제 데이터 `내부`로 업데이트 확인
- [x] 검색/필터 및 기존 메뉴 회귀 확인

## 11단계: 메인 포털 대시보드 및 홈 화면 재구성 완료

- [x] `portal-dashboard` 기능 생성
- [x] Home 화면을 메인 포털 대시보드로 교체
- [x] 로그인 사용자 정보 표시
- [x] 통합검색 바로가기 구현
- [x] 주요 현황 요약 카드 구현
- [x] 공지사항 패널 구현
- [x] 신규 데이터셋/AI 모델 패널 구현
- [x] 내 프로젝트 현황 패널 구현
- [x] 반출 승인 대기 패널 구현
- [x] 크레딧 현황 패널 구현
- [x] K-RMF 증빙 진행률 패널 구현
- [x] 시스템 상태 패널 구현
- [x] 주요 메뉴 바로가기 구현
- [x] `docs/PORTAL_DASHBOARD.md` 작성

## 11.1단계: Keycloak OIDC 런타임 환경변수 안정화 완료

- [x] Keycloak OIDC clientSecret 런타임 로딩 안정화
- [x] `scripts/start-dev.sh` 추가
- [x] `.env` 로딩 방식 문서화
- [x] `admin01` OIDC 로그인 검증
- [x] Portal Dashboard 사용자 정보 표시 검증
- [x] 기존 메뉴 회귀 확인

## 다음 단계

## 12단계: 최종 산출물 및 제안장표용 화면 정리 완료

- [x] 제안장표용 주요 화면 캡처
- [x] 데모 시나리오 작성
- [x] 최종 산출물 목록 정리
- [x] 현재 PoC 한계사항 정리
- [x] 운영 전환 시 고려사항 정리
- [x] TypeScript 기존 오류 정리 계획 수립
- [x] 정식 Backstage Plugin 전환 검토
- [x] `docs/FINAL_DELIVERABLES.md` 작성
- [x] `docs/DEMO_SCRIPT.md` 작성
- [x] `docs/TECH_DEBT.md` 작성

## 13단계: 국방지능화플랫폼 타이틀 변경 및 관리자 기능 화면 1차 보강

- [x] 포털 명칭 `국방지능화플랫폼`으로 변경
  - [x] `app-config.yaml` title / organization / mcpActions 반영
  - [x] Portal Dashboard Hero 영역 반영
  - [x] README.md 및 주요 문서 제목/개요 반영
- [x] Admin Console 메뉴 및 라우팅 추가 (`/admin-console`)
- [x] Admin Console 화면 구성
  - [x] 요약 카드 (등록 신청 대기, 승인 대기, 외부 사용자, 활성 사용자, 잠금 계정, 권한 그룹, 로그인 정책, 보안 이벤트)
  - [x] 사용자 등록 신청 패널
  - [x] 사용자 관리 패널
  - [x] 권한/역할 관리 패널
  - [x] 로그인 정책 관리 패널
  - [x] 비밀번호 정책 관리 패널
  - [x] 이력/감사 로그 패널
  - [x] 메뉴 관리 패널
  - [x] 요구사항 대응 현황 패널
- [x] Portal Dashboard Quick Links에 Admin Console 추가
- [x] `docs/REQUIREMENT_SCREEN_COVERAGE.md` 작성
- [x] WBS/ARCHITECTURE/CHANGE_SUMMARY/TODO/DECISIONS/README 갱신

## 14단계: 사용자 등록/승인 및 외부 사용자 관리 화면 상세화

- [ ] 사용자 등록 신청 상세 화면
- [ ] 본인확인 상태 표시
- [ ] 사용자 승인/반려 mock workflow
- [ ] 외부 사용자 계정 등록/수정 화면
- [ ] 사용자 소속/역할/접속 가능 서비스 설정 화면
- [ ] 사용자 상태 변경 이력 표시
- [ ] Keycloak 연동 설계 문서 작성

## PoC 이후 후속 작업

### 단기 안정화

- [ ] `App.test.tsx` TypeScript 오류 수정
- [ ] MUI v4 findDOMNode warning 정리
- [ ] Keycloak role/group claim 연동 및 권한 기반 메뉴 제어

### 실제 연동

- [ ] Project Workspace 실제 DB/API 연동
- [ ] Export Approval 실제 DB/API 및 승인 워크플로우 연동
- [ ] Credit Manager 실제 자원 사용량 연동
- [ ] K-RMF Evidence 실제 평가 시스템 연동
- [ ] OpenMetadata ↔ 포털 데이터 동기화
- [ ] OpenSearch 업무 데이터 색인 파이프라인 구축

### 운영 전환

- [ ] PostgreSQL 등 운영 DB 연동
- [ ] HTTPS/TLS 적용
- [ ] Secret 관리 체계 도입
- [ ] Kubernetes 배포 구조 설계
- [ ] CI/CD 파이프라인 구축
- [ ] 로그/감사/모니터링 체계 구축

### 제안/시연 자료화

- [ ] 제안장표용 PPT/문서 작성
- [ ] 주요 시나리오 E2E 테스트 자동화
- [ ] 시연 동영상 녹화
