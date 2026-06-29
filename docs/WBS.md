# WBS - 국방지능화플랫폼

## 개요

본 문서는 국방지능화플랫폼 PoC 개발을 위한 단계별 작업 분해 구조(WBS)를 정의합니다.

## 단계별 일정

| 단계 | 작업명 | 상태 | 비고 |
|------|--------|------|------|
| 1 | Backstage 기본 포털 구축 | 완료 | 프로젝트 구조 생성 및 Backstage 앱 실행 |
| 2 | Keycloak 인증/권한 연동 준비 | 완료 | Docker 기반 Keycloak 실행 및 Realm/Client/User/Role 생성 |
| 3 | Backstage와 Keycloak OIDC 연동 | 완료 | Backstage 로그인 공급자로 Keycloak 연동 |
| 4 | OpenSearch 검색엔진 연동 | 완료 | 검색엔진 구축 및 샘플 인덱스/데이터 구성 |
| 5 | OpenMetadata 카탈로그 연동 | 완료 | 데이터/AI 카탈로그 연동 설계 및 준비 |
| 6 | 자체 플러그인 1차 - 프로젝트/워크스페이스 관리 | 완료 | `project-workspace` PoC 화면 개발 |
| 7 | 자체 플러그인 2차 - 반출/반입 관리 | 완료 | `export-approval` PoC 화면 개발 |
| 8 | 자체 플러그인 3차 - 크레딧 관리 | 완료 | `credit-manager` PoC 화면 개발 |
| 9 | 자체 플러그인 4차 - K-RMF 증빙관리 | 완료 | `krmf-evidence` PoC 화면 개발 |
| 10 | 통합검색/카탈로그 검색 고도화 | 완료 | `integrated-search` PoC 화면 개발 및 OpenSearch `portal-catalog` 연동 |
| 11 | 메인 포털 대시보드 및 홈 화면 재구성 | 완료 | `portal-dashboard` PoC 컴포넌트 개발, Home 화면 교체, 문서 정리 |
| 11.1 | Keycloak OIDC 런타임 환경변수 안정화 | 완료 | `.env` 로딩 스크립트, admin01 OIDC 로그인 검증 |
| 12 | 최종 산출물 및 제안장표용 화면 정리 | 완료 | 최종 산출물 문서, 데모 시나리오, 기술부채 문서, 화면 캡처 |
| 13 | 국방지능화플랫폼 타이틀 변경 및 관리자 기능 화면 1차 보강 | 완료 | 포털 명칭 변경, Admin Console mock UI 추가, 요구사항 화면 대응 문서 |
| 14 | 사용자 등록/승인 및 외부 사용자 관리 화면 상세화 | 완료 | 사용자 등록 상세, 승인 workflow, 외부 사용자 관리, 상태 이력, 사용자 관리 설계 문서 |

## 11단계: 메인 포털 대시보드 및 홈 화면 재구성

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

## 12단계: 최종 산출물 및 제안장표용 화면 정리

- [x] 최종 산출물 목록 정리
- [x] 제안장표용 주요 화면 캡처 정리
- [x] 데모 시나리오 작성
- [x] 현재 PoC 한계사항 정리
- [x] 운영 전환 시 고려사항 정리
- [x] 후속 개발 과제 정리
- [x] 보안 주의사항 정리
- [x] TypeScript 기존 오류 정리 계획 수립
- [x] 정식 Backstage Plugin 전환 검토
- [x] `docs/FINAL_DELIVERABLES.md` 작성
- [x] `docs/DEMO_SCRIPT.md` 작성
- [x] `docs/TECH_DEBT.md` 작성

## 13단계: 국방지능화플랫폼 타이틀 변경 및 관리자 기능 화면 1차 보강

- [x] 포털 명칭 `국방지능화플랫폼`으로 변경
- [x] `Admin Console` 메뉴 및 `/admin-console` 라우팅 추가
- [x] Admin Console 요약 카드 및 8개 관리 패널 구현 (mock data)
- [x] Portal Dashboard Quick Links에 Admin Console 추가
- [x] `docs/REQUIREMENT_SCREEN_COVERAGE.md` 작성
- [x] WBS/ARCHITECTURE/CHANGE_SUMMARY/TODO/DECISIONS/README 갱신

## 14단계: 사용자 등록/승인 및 외부 사용자 관리 화면 상세화

- [x] 사용자 등록 신청 상세 화면 구현
- [x] 본인확인 상태 Chip 추가
- [x] 승인/반려/보완요청/재신청 mock workflow 구현
- [x] 외부 사용자 관리 패널 추가
- [x] 사용자 소속/역할/접속 가능 서비스 설정 UI 구현
- [x] 사용자 상태 변경 이력 패널 구현
- [x] `docs/USER_MANAGEMENT_DESIGN.md` 작성
- [x] Admin Console 탭에 외부 사용자 관리 추가
- [x] WBS/ARCHITECTURE/CHANGE_SUMMARY/TODO/DECISIONS/README 갱신

## 1단계: Backstage 기본 포털 구축

- [x] 프로젝트 기본 폴터 구조 생성
- [x] WBS/ARCHITECTURE/CHANGE_SUMMARY/TODO 문서 초안 작성
- [x] Backstage 기본 앱 생성 (`backstage-portal`)
- [x] 로컬 실행 및 브라우저 접속 확인 (`http://localhost:3000`)
- [x] 좌측 메뉴 구조 확인
- [x] 자체 플러그인 추가 가능 구조 확인 (`backstage-portal/plugins/`)
- [x] `README.md` 실행 방법 작성

## 2단계: Keycloak 인증/권한 연동 준비

- [x] `infra/keycloak/docker-compose.yml` 작성
- [x] Keycloak 개발용 관리자 계정 설정 (admin/<password>)
- [x] `kt-ai` Realm 생성
- [x] `backstage` Client 생성
- [x] 테스트 사용자 생성 (admin01, pm01, developer01, analyst01, external01)
- [x] 그룹/역할 설계 및 생성 (portal-admin, project-manager, developer, analyst, external-user)
- [x] `docs/KEYCLOAK_SETUP.md` 작성

## 3단계: Backstage와 Keycloak OIDC 연동

- [x] Backstage `app-config.yaml`에 OIDC Provider 설정 추가
- [x] Keycloak `kt-ai` Realm OpenID Configuration URL 연결
- [x] Client Secret 환경변수 분리 및 `.env.example` 작성
- [x] `AUTH_SESSION_SECRET` 설정
- [x] Backstage 로그인 UI에서 Keycloak OIDC 선택 가능하도록 설정
- [x] Keycloak 로그인 성공 후 Backstage로 복귀 확인
- [x] 사용자 email, name Claim 확인
- [ ] 사용자 role, groups Claim 확인 (Keycloak client mapper 추가 후)
- [ ] 그룹/역할 기반 메뉴 제어 설계
- [x] `docs/KEYCLOAK_INTEGRATION.md` 작성

## 4단계: OpenSearch 검색엔진 연동

- [x] `infra/opensearch/docker-compose.yml` 작성
- [x] 개발용 단일 노드 OpenSearch 실행
- [x] OpenSearch Dashboards 실행
- [x] 테스트 인덱스 `portal-catalog` 생성
- [x] 검색 대상 메타데이터 구조 설계
- [x] 샘플 데이터 8건 이상 적재
- [x] 검색 테스트 스크립트 작성 및 실행
- [x] `docs/SEARCH_DESIGN.md` 작성

## 5단계: OpenMetadata 카탈로그 연동

- [x] `infra/openmetadata` 실행 방법 정리
- [x] 공식 Docker Compose 기반 실행
- [x] UI/API 접근 검증
- [x] 데이터셋/테이블/AI 모델/파이프라인 메타데이터 개념 문서화
- [x] Backstage 연동 설계
- [x] OpenMetadata API 연계 후보 정리
- [x] `docs/OPENMETADATA_DESIGN.md` 작성

## 6단계: 자체 플러그인 1차 - 프로젝트/워크스페이스 관리

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

## 7단계: 자체 플러그인 2차 - 반출/반입 관리

- [x] `export-approval` 기능 생성
- [x] 메뉴 `Export Approval` 추가
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

## 8단계: 자체 플러그인 3차 - 크레딧 관리

- [x] `credit-manager` 기능 생성
- [x] 메뉴 `Credit Manager` 추가
- [x] 프로젝트별 크레딧 현황 UI 구현
- [x] 총 부여/사용/잔여 크레딧 요약 카드 구현
- [x] 충전 이력 표시
- [x] 사용 이력 표시
- [x] 예상 사용 가능 기간 표시
- [x] 자원별 단가 설정 UI 구현
- [x] 크레딧 부족 시 자원 비활성화 상태 표시
- [x] 알림/경고 패널 표시
- [x] mock data 기반 PoC 구현
- [x] API/DB/큐브 사용량 연동 확장 구조 문서화
- [x] `docs/PLUGIN_CREDIT_MANAGER.md` 작성

## 9단계: 자체 플러그인 4차 - K-RMF 증빙관리

- [x] `krmf-evidence` 기능 생성
- [x] 메뉴 `K-RMF Evidence` 추가
- [x] K-RMF 통제항목 목록/적용여부/담당자 UI
- [x] 증빙자료 목록/점검상태 UI
- [x] 보안 미흡사항 조치관리 UI
- [x] 타 수행사 제출자료 관리 UI
- [x] 통합진척률 대시보드
- [x] `docs/PLUGIN_KRMF_EVIDENCE.md` 작성

## 10단계: 통합검색/카탈로그 검색 고도화

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

## 11단계: 통합검증 및 제안장표용 화면 정리

- [ ] 전체 구성요소 통합 실행
- [ ] 주요 시나리오 검증
- [ ] 제안장표용 화면 캡처/데모 스크립트 작성
- [ ] 최종 산출물 정리
- [ ] `docs/FINAL_DELIVERABLES.md` 작성 (선택)
