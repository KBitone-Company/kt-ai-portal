# 국방지능화플랫폼 PoC 최종 산출물

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 프로젝트명 | 국방지능화플랫폼 (K-Defense Intelligence Platform) |
| 한글명 | 국방지능화플랫폼 |
| 목적 | 국방지능화플랫폼 PoC |
| 기반 기술 | Backstage, Keycloak, OpenSearch, OpenMetadata, React/TypeScript, Docker Compose |
| 프론트엔드 | http://localhost:3000 |
| 백엔드 API | http://localhost:7007 |
| 인증 | Keycloak http://localhost:8080 (Realm: `kt-ai`, Client: `backstage`) |
| 검색 | OpenSearch http://localhost:9200 |
| 카탈로그 | OpenMetadata http://localhost:8585 |
| 실행 방법 | `cd kt-ai-portal/backstage-portal && ./scripts/start-dev.sh` |

## 2. 구현 완료 기능

| 구분 | 기능 | 상태 | 설명 |
|------|------|------|------|
| 포털 | Portal Dashboard | 완료 | 메인 대시보드 (사용자 정보, 검색, 현황, 공지, 바로가기) |
| 인증 | Keycloak OIDC | 완료 | `admin01` 사용자 OIDC 로그인 검증 완료 |
| 검색 | Integrated Search | 완료 | OpenSearch `portal-catalog` proxy 연동, 필터/상세 UI |
| 카탈로그 | OpenMetadata | 완료 | UI/API 접근 검증 완료 |
| 프로젝트 | Project Workspace | 완료 | mock data 기반 PoC 화면 |
| 반출관리 | Export Approval | 완료 | mock data 기반 PoC 화면 |
| 크레딧 | Credit Manager | 완료 | mock data 기반 PoC 화면 |
| 보안증빙 | K-RMF Evidence | 완료 | mock data 기반 PoC 화면 |
| 관리자 | Admin Console | 1차 화면 | 사용자/권한/정책/감사로그/메뉴 mock UI |
| 사용자 관리 | Admin Console > 사용자 등록/승인/외부 사용자 | 상세 화면 | 등록 상세, 승인 workflow, 외부 사용자 관리, 상태 이력 |

## 3. 주요 화면 목록

| 화면 | URL | 목적 | 캡처 파일 |
|------|-----|------|-----------|
| Portal Dashboard | `/` | 메인 포털 현황 | `docs/assets/final/01-portal-dashboard.png` |
| Integrated Search | `/integrated-search` | 데이터/모델 통합 검색 | `docs/assets/final/02-integrated-search.png` |
| Project Workspace | `/project-workspace` | 프로젝트/워크스페이스 관리 | `docs/assets/final/03-project-workspace.png` |
| Export Approval | `/export-approval` | 반출/반입 승인 관리 | `docs/assets/final/04-export-approval.png` |
| Credit Manager | `/credit-manager` | 프로젝트 크레딧 관리 | `docs/assets/final/05-credit-manager.png` |
| K-RMF Evidence | `/krmf-evidence` | K-RMF 증빙 관리 | `docs/assets/final/06-krmf-evidence.png` |
| OpenMetadata UI | `http://localhost:8585` | 데이터/AI 모델 카탈로그 | `docs/assets/final/07-openmetadata.png` |
| OpenSearch Dashboards | `http://localhost:5601` | 검색·시각화 | `docs/assets/final/08-opensearch-dashboards.png` |
| Backstage Sign-In | `/` (로그아웃 상태) | Guest/Keycloak 로그인 선택 | `docs/assets/final/09-backstage-signin.png` |
| Keycloak Login | `http://localhost:8080/realms/kt-ai/...` | OIDC 인증 로그인 | `docs/assets/final/09-keycloak-login.png` |
| Admin Console | `/admin-console` | 사용자/권한/정책/감사로그/메뉴 관리 | 미캡처 |
| 사용자 관리 설계 | `docs/USER_MANAGEMENT_DESIGN.md` | 사용자/Keycloak/DB 연동 설계 | - |

## 4. 데모 시나리오

### 시나리오 1. 포털 로그인 및 메인 현황 확인

1. 브라우저에서 `http://localhost:3000` 접속
2. Backstage Sign-In 페이지에서 `Keycloak` 선택
3. Keycloak 로그인 페이지에서 `admin01 / <password>` 입력
4. Portal Dashboard로 복귀
5. Hero 영역에서 사용자 정보(`Admin Kim`, `admin01@kt.ai`) 확인
6. 요약 카드(데이터셋 128, AI 모델 24, 진행 프로젝트 12 등) 확인
7. 공지사항, 신규 자산, 내 프로젝트, 반출 대기, 크레딧, K-RMF, 시스템 상태 확인

### 시나리오 2. 통합검색

1. Portal Dashboard 상단 검색창에 `정비` 입력 후 Enter
2. `/integrated-search?q=정비`로 이동
3. 데이터셋/AI 모델 검색 결과 확인
4. 검색 대상 유형, 보안등급, 소스 시스템, 태그 필터 적용
5. 검색 결과 선택 시 상세 패널 확인

### 시나리오 3. 프로젝트 관리

1. Portal Dashboard 또는 사이드바에서 `Project Workspace` 이동
2. 프로젝트 목록 및 상태 확인
3. 프로젝트 선택 시 상세 정보 확인
4. `프로젝트 생성 신청` 탭에서 신규 신청 UI 확인

### 시나리오 4. 반출/반입 관리

1. `Export Approval` 이동
2. 반출/반입 신청 목록 및 상태 확인
3. 신청 항목 선택 시 상세/감사로그 확인
4. `신청 등록` 탭에서 신규 반출/반입 신청 UI 확인

### 시나리오 5. 크레딧 관리

1. `Credit Manager` 이동
2. 전체 잔여/사용/충전 크레딧 요약 확인
3. 프로젝트별 크레딧 현황 확인
4. 사용 이력/충전 이력 및 경고 패널 확인

### 시나리오 6. K-RMF 증빙관리

1. `K-RMF Evidence` 이동
2. 통제항목 목록 및 적용 여부 확인
3. 증빙자료/미흡사항/이력 확인
4. 타 수행사 제출자료 및 통합진척률 확인

## 5. 현재 PoC 한계사항

- 업무 기능(Project Workspace, Export Approval, Credit Manager, K-RMF Evidence)은 mock data 기반
- 실제 DB/API 연동 없음
- 실제 파일 업로드/다운로드 없음
- 실제 반출 승인 워크플로우 없음
- 실제 크레딧 차감/자원 제어 없음
- K-RMF 실제 평가 시스템 연동 없음
- OpenMetadata와 포털 데이터 자동 동기화 미구현
- 권한 기반 검색 결과 필터링 미구현
- 임베딩 기반 유사도 검색 미구현
- 정식 Backstage Plugin 구조가 아니라 PoC 컴포넌트 방식으로 구현
- TypeScript 기존 테스트 오류 일부 존재 (`App.test.tsx`)

## 6. 운영 전환 시 고려사항

- PostgreSQL 등 운영 DB 연동
- Keycloak 운영 Realm 분리 및 실제 사용자/그룹 동기화
- HTTPS/TLS 적용
- Secret 관리 체계 도입 (Vault, Kubernetes Secret 등)
- Docker Compose에서 Kubernetes 전환 검토
- OpenSearch 보안 플러그인 활성화 및 다중 노드 구성
- OpenMetadata 운영 DB/검색엔진 구성
- 로그/감사/모니터링 체계 구축
- 접근권한/역할 기반 메뉴 제어
- 검색 결과 권한 필터링
- 파일 저장소/문서 저장소 연동
- CI/CD 파이프라인 구성
- 백업/복구 정책 수립
- 성능/부하 테스트
- 보안 취약점 점검

## 7. 후속 개발 과제

| 우선순위 | 과제 | 설명 |
|----------|------|------|
| 1 | 실제 DB/API 연동 | mock data를 실제 업무 DB/API로 대체 |
| 2 | 권한 기반 메뉴 제어 | Keycloak role/group claim 연동 |
| 3 | OpenMetadata 동기화 | 데이터셋/AI 모델 카탈로그 연동 |
| 4 | OpenSearch 색인 확장 | 업무 플러그인 데이터 검색 |
| 5 | 파일 반출 저장소 연동 | 실제 반출/다운로드 통제 |
| 6 | 크레딧 사용량 수집 | AI/클라우드 자원 사용량 연동 |
| 7 | K-RMF 산출물 패키징 | 평가 대응 문서 자동화 |
| 8 | 정식 Backstage Plugin 전환 | PoC 컴포넌트 구조 개선 |
| 9 | TypeScript 오류 정리 | `App.test.tsx` 등 기존 오류 해결 |
| 10 | 운영 배포 구조 설계 | Kubernetes/CI/CD/보안 구성 |

## 8. 보안 주의사항

- 실제 secret 값은 문서와 Git에 기록하지 않는다.
- `.env`는 `.gitignore`에 포함하여 Git에 포함하지 않는다.
- 현재 PoC 중 노출된 Keycloak Client Secret은 필요 시 Keycloak Admin Console에서 재생성한다.
- 운영 환경에서는 `admin/<password>`, `admin01/<password>` 등 기본/테스트 계정 사용 금지
- 운영 환경에서는 반드시 HTTPS 적용
- 운영 환경에서는 Keycloak, OpenSearch, OpenMetadata 접근 제어 필요
- OpenSearch proxy는 개발용으로 `dangerously-allow-unauthenticated`를 허용하고 있으므로 운영 전환 시 인증 기반 접근 제어 필요
