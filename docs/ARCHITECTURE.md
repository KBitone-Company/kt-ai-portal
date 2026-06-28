# ARCHITECTURE - KT AI/Data Platform Portal

## 개요

본 문서는 KT AI/Data Platform Portal PoC의 전체 아키텍처를 정의합니다.

## PoC 범위

- 포털 프레임워크: Backstage
- 인증/권한: Keycloak (OIDC)
- 데이터/AI 카탈로그: OpenMetadata
- 검색엔진: OpenSearch
- 업무 특화 기능: Backstage 자체 플러그인

## 전체 구성도

```text
[User]
  ↓ HTTP
[Backstage Portal]
  ↓ OIDC (3단계 완료)
[Keycloak]
  Realm: kt-ai
  Client: backstage
  ↓ Catalog API
[OpenSearch] ←──→ [OpenMetadata]
```

```text
┌─────────────────────────────────────────────────────────────┐
│                    User (macOS + VS Code)                   │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTP
┌─────────────────────────▼───────────────────────────────────┐
│              Backstage Portal (backstage-portal)            │
│  ┌──────────────┬──────────────┬─────────────────────────┐  │
│  │ project-     │ export-      │ credit-   │ krmf-       │  │
│  │ workspace    │ approval     │ manager   │ evidence    │  │
│  └──────────────┴──────────────┴───────────┴─────────────┘  │
└──────────────┬──────────────────────┬───────────────────────┘
               │ OIDC (3단계 연동 완료) │ Search API
┌──────────────▼──────┐      ┌────────▼─────────┐
│      Keycloak       │      │    OpenSearch    │
│  Realm: kt-ai       │      │ Index: portal-   │
│  Client: backstage  │      │ catalog          │
└─────────────────────┘      └────────┬─────────┘
                                      │ Catalog API
                           ┌──────────▼──────────┐
                           │    OpenMetadata     │
│                          │ (Data/AI Catalog)   │
│                          └─────────────────────┘
```

## 레이어 구성

### 1. 포털 레이어 (Backstage)

- Backstage 프레임워크 기반
- 플러그인 아키텍처로 확장
- Keycloak OIDC 연동을 통한 SSO (3단계 완료)
- OpenSearch 기반 통합검색 UI
- OpenMetadata 카탈로그 연동 UI

### 2. 인증/권한 레이어 (Keycloak)

- `kt-ai` Realm
- `backstage` Client
- 그룹/역할 기반 권한 관리
- 개발용 관리자: admin/<password>
- OIDC 연동: 3단계에서 Backstage와 연동 완료
- 11.1단계에서 `.env` 기반 clientSecret/session secret 로딩을 `scripts/start-dev.sh`로 안정화

### 3. 검색 레이어 (OpenSearch)

- OpenSearch: `http://localhost:9200`
- OpenSearch Dashboards: `http://localhost:5601`
- 컨테이너명: `kt-opensearch`, `kt-opensearch-dashboards`
- 개발용 단일 노드
- `portal-catalog` 인덱스
- 메타데이터 타입: dataset, model, docker_image, pypi_package, document
- 10단계에서 Backstage backend proxy를 경유한 통합검색 UI 연동 완료

### 4. 카탈로그 레이어 (OpenMetadata)

- OpenMetadata Server: `http://localhost:8585`
- OpenMetadata Admin/Health: `http://localhost:8586`
- 데이터셋, 테이블, AI 모델, 파이프라인 메타데이터 관리
- Backstage와의 API 연동 후보 확보 (10단계에서 직접 연동)

## 자체 플러그인 목록

| 플러그인 | 목적 | 상태 |
|----------|------|------|
| project-workspace | 프로젝트/워크스페이스 관리 | PoC 완료 (mock data) |
| export-approval | 반출/반입 관리 | PoC 완료 (mock data) |
| credit-manager | 크레딧 관리 | PoC 완료 (mock data) |
| krmf-evidence | K-RMF 증빙관리 | PoC 완료 (mock data) |
| integrated-search | 통합검색/카탈로그 검색 | PoC 완료 (OpenSearch `portal-catalog` 연동) |
| portal-dashboard | 메인 포털 대시보드 | PoC 완료 (mock data) |

## Portal Dashboard 레이어

Portal Dashboard는 Backstage 포털의 최초 진입 화면(`/` 경로)으로, 기존 업무 기능들의 요약 정보를 mock data 기반으로 보여준다.

- 사용자가 로그인 후 처음 보는 화면
- 데이터셋, AI 모델, 프로젝트, 반출승인, 크레딧, K-RMF 증빙, 시스템 상태를 한눈에 표시
- 각 기능 페이지(Integrated Search, Project Workspace, Export Approval, Credit Manager, K-RMF Evidence)로 이동하는 허브 역할
- 외부 관리도구(OpenMetadata, OpenSearch Dashboards, Keycloak Admin) 바로가기 제공
- 제안장표 및 데모 시나리오에 적합한 카드형 시각적 구성
- 후속 단계에서는 각 플러그인/API와 실제 연동하여 실시간 요약 정보를 제공할 예정

```text
[User]
  ↓
[Backstage Portal]
  ↓ /
[Portal Dashboard]
  ↓        ↓        ↓         ↓          ↓
integrated  project  export   credit    krmf
-search   -workspace -approval -manager  -evidence
  ↓
OpenSearch / OpenMetadata / Keycloak
```

## 개발 환경

- OS: macOS
- IDE: VS Code
- Container: Docker Desktop
- Runtime: Node.js 24 (Yarn 4.13 via Backstage .yarnrc.yml)
- Backstage: 1.38 (최신 stable)
- Keycloak: 26.2.4 (Docker 개발 모드)

## 1단계 완료 상태

- Backstage 기본 포털이 `http://localhost:3000`에서 실행 중
- 좌측 메뉴 구조 확인 완료 (Home, Search, Catalog, Create, APIs, Catalog Graph, Docs, Notifications, Settings)
- `backstage-portal/plugins/` 폴터가 있어 향후 자체 플러그인 추가 가능

## 2단계 완료 상태

- Keycloak Docker 컨테이너 `kt-keycloak`이 `http://localhost:8080`에서 실행 중
- `kt-ai` Realm 생성 완료
- `backstage` Client 생성 완료 (Client authentication On)
- Realm roles 5개 생성 완료 (portal-admin, project-manager, developer, analyst, external-user)
- Groups 5개 생성 완료
- 테스트 사용자 5명 생성 및 역할/그룹 매핑 완료
- OpenID Configuration URL 확인: http://localhost:8080/realms/kt-ai/.well-known/openid-configuration
- OIDC 연동은 3단계에서 완료

## 3단계 완료 상태

- Backstage `app-config.yaml`에 OIDC Provider (`oidc`) 설정 완료
- Keycloak `kt-ai` Realm의 OpenID Configuration URL 연결 완료
- Client Secret 및 session secret을 환경변수로 분리 (`.env` / `.env.example`)
- Backstage 로그인 페이지에 `Guest`, `Keycloak` 로그인 버튼 노출
- Keycloak 로그인 성공 후 Backstage로 복귀 및 인증 토큰 발급 확인
- Backstage identity에 Keycloak 사용자 정보(user ID, display name, email) 반영 확인
- 상세 설정은 `docs/KEYCLOAK_INTEGRATION.md` 참조

## 4단계 완료 상태

- OpenSearch Docker 컨테이너 `kt-opensearch`가 `http://localhost:9200`에서 실행 중
- OpenSearch Dashboards `kt-opensearch-dashboards`가 `http://localhost:5601`에서 실행 중
- `portal-catalog` 인덱스 생성 완료
- 메타데이터 기반 키워드 검색 및 필터링 검증 완료
- 샘플 데이터 10건 적재 (dataset 4건, model 2건, docker_image 1건, pypi_package 1건, document 2건)
- 상세 설정은 `docs/SEARCH_DESIGN.md` 참조

## 5단계 완료 상태

- OpenMetadata Docker 컨테이너 6개(`openmetadata_server`, `openmetadata_mysql`, `openmetadata_elasticsearch`, `openmetadata_ingestion`, `execute_migrate_all` 등)가 정상 실행 중
- OpenMetadata UI `http://localhost:8585` 접속 및 로그인 페이지 확인
- OpenMetadata API `/api/v1/system/version` 응답 확인 (버전 1.6.0)
- JWT 로그인(`POST /api/v1/users/login`) 및 `tables`, `mlmodels` API 호출 검증
- 기존 `kt-keycloak`(8080) 및 `kt-opensearch`(9200)와의 포트 충돌 회피를 위해 Elasticsearch/MySQL/Ingestion 호스트 포트 매핑 제거
- OpenMetadata 내장 Elasticsearch(`openmetadata_elasticsearch`)와 `kt-opensearch`를 분리 운영
- 상세 설정은 `docs/OPENMETADATA_DESIGN.md` 참조

## 6단계 완료 상태

- `project-workspace` PoC 컴포넌트 구현 완료
- Backstage 좌측 메뉴에 `Project Workspace` 항목 추가
- `/project-workspace` 경로에서 프로젝트 목록, 상세, 생성 신청 화면 확인
- mock data 기반 5건 이상의 샘플 프로젝트 표시
- 상태 Badge(Chip), 참여자/역할, 리소스 할당량 UI 구현
- Keycloak OIDC 로그인 유지 (admin01 사용자 로그인 상태에서 메뉴 접근 확인)
- 상세 설정은 `docs/PLUGIN_PROJECT_WORKSPACE.md` 참조

## 7단계 완료 상태

- `export-approval` PoC 컴포넌트 구현 완료
- Backstage 좌측 메뉴에 `Export Approval` 항목 추가 (`Home`, `Project Workspace`와 함께 유지)
- `/export-approval` 경로에서 반출/반입 신청 목록, 상세, 등록 화면 확인
- mock data 기반 8건 이상의 샘플 반출/반입 신청 데이터 표시
- 반출/반입 구분, 대상 유형 Chip, 승인 상태 Chip, 보안등급/공개여부/사용권한 UI 구현
- 첨부자료 목록, 감사로그 표시
- `Project Workspace` 화면 및 Keycloak OIDC 로그인 유지
- 상세 설정은 `docs/PLUGIN_EXPORT_APPROVAL.md` 참조

## 8단계 완료 상태

- `credit-manager` PoC 컴포넌트 구현 완료
- Backstage 좌측 메뉴에 `Credit Manager` 항목 추가 (`Home`, `Project Workspace`, `Export Approval`과 함께 유지)
- `/credit-manager` 경로에서 프로젝트별 크레딧 현황, 요약 카드, 충전/사용 이력, 자원별 단가, 자원 사용 가능 상태, 알림 패널 확인
- mock data 기반 5건 이상의 샘플 프로젝트 크레딧 데이터 표시
- 크레딧 상태(정상/주의/부족/소진/중지)에 따른 자원 제한/허용 UI 구현
- `Project Workspace`, `Export Approval` 화면 및 Keycloak OIDC 로그인 유지
- 상세 설정은 `docs/PLUGIN_CREDIT_MANAGER.md` 참조

## 9단계 완료 상태

- `krmf-evidence` PoC 컴포넌트 구현 완료
- Backstage 좌측 메뉴에 `K-RMF Evidence` 항목 추가 (`Home`, `Project Workspace`, `Export Approval`, `Credit Manager`와 함께 유지)
- `/krmf-evidence` 경로에서 통합진척률 대시보드, 통제항목 관리, 증빙자료 관리, 보안 미흡사항 조치관리, 타 수행사 제출자료 관리 화면 확인
- mock data 기반 10개 이상의 K-RMF 통제항목 및 관련 증빙/미흡/수행사 자료 데이터 표시
- `Project Workspace`, `Export Approval`, `Credit Manager` 화면 및 Keycloak OIDC 로그인 유지
- 상세 설정은 `docs/PLUGIN_KRMF_EVIDENCE.md` 참조

## 10단계 완료 상태

- `integrated-search` PoC 컴포넌트 구현 완료
- Backstage 좌측 메뉴에 `Integrated Search` 항목 추가
- `/integrated-search` 경로에서 OpenSearch `portal-catalog` 인덱스 키워드/필터 검색 화면 확인
- Backstage backend proxy(`/api/proxy/search`)를 경유하여 OpenSearch `portal-catalog/_search` 조회
- 검색어 `multi_match` 및 `bool filter`(유형, 보안등급, 소스 시스템, 태그) 적용
- OpenSearch 연결 실패 시 `mockSearchResults` fallback 처리
- `Project Workspace`, `Export Approval`, `Credit Manager`, `K-RMF Evidence` 화면 및 Keycloak OIDC 로그인 유지
- 상세 설정은 `docs/SEARCH_IMPLEMENTATION.md` 참조

## PoC 이후 확장 방향

- Kubernetes 기반 배포
- 데이터베이스(PostgreSQL) 연동
- 실제 Keycloak 운영 Realm 분리
- OpenSearch 클러스터 구성
- OpenMetadata 완전 연동
- CI/CD 파이프라인 구축

## 11단계 완료 상태

- `portal-dashboard` PoC 컴포넌트 구현 완료
- `/` 경로를 Portal Dashboard로 교체
- Hero, 통합검색 바로가기, 주요 현황 요약, 공지사항, 신규 자산, 내 프로젝트, 반출 대기, 크레딧, K-RMF, 시스템 상태, 바로가기 구성
- 제안장표 및 데모 시나리오에 적합한 카드형 시각적 레이아웃 적용
- 기존 메뉴 및 Keycloak OIDC 로그인 유지
- 상세 설정은 `docs/PORTAL_DASHBOARD.md` 참조

## 11.1단계 완료 상태

- `backstage-portal/scripts/start-dev.sh` 추가
- `.env` 기반 `AUTH_OIDC_CLIENT_SECRET`, `AUTH_SESSION_SECRET` 로딩 안정화
- macOS 기본 bash 3.2 호환성 확보
- `admin01` Keycloak OIDC 로그인 검증 완료
- Portal Dashboard에 Keycloak 사용자 정보(`Admin Kim`, `admin01@kt.ai`) 표시 확인
- 상세 설정은 `docs/OIDC_RUNTIME_FIX.md` 참조

## 12단계 완료 상태

- `docs/FINAL_DELIVERABLES.md` 작성
- `docs/DEMO_SCRIPT.md` 작성
- `docs/TECH_DEBT.md` 작성
- 주요 화면 캡처 10건을 `docs/assets/final/`에 정리
  - Portal Dashboard, Integrated Search, Project Workspace, Export Approval, Credit Manager, K-RMF Evidence, OpenMetadata, OpenSearch Dashboards, Backstage Sign-In, Keycloak Login
- PoC 한계사항, 운영 전환 고려사항, 후속 개발 과제, 보안 주의사항 정리

## 최종 PoC 구성 요약

```text
[User]
  ↓ HTTP
[Backstage Portal :3000]
  ├─ Portal Dashboard (/)
  ├─ Integrated Search (/integrated-search)
  ├─ Project Workspace (/project-workspace)
  ├─ Export Approval (/export-approval)
  ├─ Credit Manager (/credit-manager)
  └─ K-RMF Evidence (/krmf-evidence)
  ↓ OIDC
[Keycloak :8080 / Realm kt-ai / Client backstage]
  ↓ Search API
[OpenSearch :9200 / portal-catalog]
  ↓ Catalog API
[OpenMetadata :8585]
```

### 사용자 접근 흐름

1. 사용자가 Backstage(`http://localhost:3000`) 접속
2. Keycloak OIDC로 인증 (`admin01` 등)
3. Portal Dashboard에서 전체 현황 요약 확인
4. 통합검색 또는 사이드바 메뉴로 각 기능 이동
5. OpenSearch/OpenMetadata/Keycloak Admin 등 외부 도구 링크 사용 가능

### 운영 전환 구조 후보

```text
[Internet]
  ↓ HTTPS/WAF
[Ingress Controller]
  ├─ / → Backstage Pod
  ├─ /api/proxy/search → OpenSearch
  └─ /auth → Keycloak
[Kubernetes Cluster]
  ├─ Backstage (frontend + backend)
  ├─ Keycloak
  ├─ OpenSearch Cluster
  ├─ OpenMetadata
  └─ PostgreSQL
```
