# DECISIONS

## 1단계 결정사항

### Node.js 버전

- 현재 시스템에 Node.js 24가 설치되어 있음.
- Backstage 1.38 템플릿의 engines 필드는 `22 || 24`로 명시되어 있어 24를 지원.
- 추가 다운그레이드 불필요.

### 패키지 매니저

- 시스템에 Yarn이 설치되어 있지 않았음.
- Backstage는 Yarn 1.x (Classic)을 권장하지만, 생성된 템플릿은 Yarn 4.13.0을 사용.
- Node.js 내장 Corepack을 활성화하여 Yarn 4.13.0을 사용.

### Backstage 설치 방식

- 공식 CLI인 `npx @backstage/create-app@latest` 사용.
- `--path backstage-portal` 옵션으로 지정된 폴터에 생성.
- `--skip-install` 후 별도 `yarn install`로 의존성 설치.

### 디렉토리 구조

- 프로젝트 루트: `kt-ai-portal/`
- Backstage 앱: `kt-ai-portal/backstage-portal/`
- 인프라: `kt-ai-portal/infra/{keycloak,opensearch,openmetadata}/`
- 문서: `kt-ai-portal/docs/`
- 기록: `kt-ai-portal/notes/`

### 실행 방법

- `yarn start` 명령으로 프론트엔드(3000)와 백엔드(7007)를 동시에 실행.
- 개발용 기본 인증은 Guest로 설정되어 있음.

## 2단계 결정사항

### Keycloak 이미지

- `quay.io/keycloak/keycloak:26.2.4` 사용.
- 개발 모드(`start-dev`)로 실행.

### 관리자 계정

- 개발용으로 `admin/<password>` 사용.
- 운영 시 별도 관리자 계정 및 외부 DB 사용 필요.

### 포트

- Host 8080 / Container 8080 사용.
- 기존 `flask-app` 컨테이너가 8080을 사용 중이어서 중지 조치.

### Realm/Client

- Realm: `kt-ai`
- Client: `backstage`
- Client authentication: On (3단계에서 secret 사용)

### 사용자/역할/그룹

- Realm roles 5개, Groups 5개 동일한 이름으로 설계.
- 테스트 사용자 5명 생성 후 역할/그룹 매핑.

### 설정 방식

- 관리자 콘솔 UI로 기본 생성 수행.
- 반복적인 사용자/역할/그룹 생성은 Keycloak Admin REST API(`admin-cli`)로 자동화.
- 3단계 Backstage 연동 시 `groups`, `roles` Claim 사용 예정.

## 3단계 결정사항

### OIDC Provider 선택

- Backstage 공식 `@backstage/plugin-auth-backend-module-oidc-provider` 사용.
- Keycloak의 OpenID Connect 엔드포인트(`/.well-known/openid-configuration`)를 그대로 사용.

### Frontend API

- Backstage 1.38의 기본 `frontend-defaults`/`@backstage/plugin-auth` API에서는 OIDC 로그인 버튼을 바로 구성하기 어려움.
- PoC에서는 `@backstage/app-defaults`의 legacy `createApp` + `SignInPage` 방식을 채택하여 Keycloak 버튼을 빠르게 노출.

### 인증 흐름

- Frontend `OAuth2.create` API factory로 OIDC 세션 관리.
- `environment: 'development'`로 `auth.providers.oidc.development` 설정과 매핑.
- `defaultScopes`: `openid`, `profile`, `email`.

### 세션/보안

- OIDC PKCE/state 쿠키를 위해 `auth.session.secret` 설정이 필수.
- 환경변수 `AUTH_SESSION_SECRET`으로 분리.
- Client secret은 `AUTH_OIDC_CLIENT_SECRET`으로 분리.
- `.env` 파일은 `.gitignore`에 포함하여 커밋하지 않음.

### 사용자 식별

- `emailLocalPartMatchingUserEntityName` resolver 사용.
- `kt.ai` 도메인 제한 및 catalog에 사용자가 없어도 로그인 허용 (`dangerouslyAllowSignInWithoutUserInCatalog: true`).

### 권한

- 3단계에서는 인증(Authentication)까지만 검증.
- 그룹/역할 기반 권한(Authorization)은 Keycloak client mapper 추가 및 Backstage permission 정책 설계 후 확장.

## 4단계 결정사항

### OpenSearch 버전

- `opensearchproject/opensearch:2.19.1` 및 `opensearchproject/opensearch-dashboards:2.19.1` 사용.
- 2.x 안정 버전 중 최신 버전을 선택.

### 배포 모드

- 개발용 단일 노드(`discovery.type=single-node`)로 구성.
- 볼륨을 통해 데이터 지속성 확보.

### 보안 플러그인

- 개발 편의를 위해 보안 플러그인 비활성화(`DISABLE_SECURITY_PLUGIN=true`).
- OpenSearch 2.12 이상에서 초기 관리자 비밀번호가 필요하여 `OPENSEARCH_INITIAL_ADMIN_PASSWORD` 설정.
- 운영환경에서는 보안 플러그인, TLS, 인증, 계정관리 필수.

### 인덱스 설계

- 인덱스명: `portal-catalog`
- 명시적 mapping으로 `name`은 `text + keyword`, 필터 필드는 `keyword`, 날짜는 `date`로 구성.
- `description`은 풀텍스트 검색 대상으로 `text` 타입 사용.

### 데이터 초기화

- Shell 스크립트(`01-create-index.sh`, `02-seed-sample-data.sh`, `03-search-test.sh`)로 인덱스 생성, 샘플 적재, 검증 수행.
- `run-all.sh`로 전체 절차를 한 번에 실행.

### Backstage 연동 범위

- 4단계에서는 Backstage와 OpenSearch를 직접 연동하지 않음.
- Backstage 통합검색 UI 및 OpenMetadata 연동은 5단계, 10단계에서 진행.

## 5단계 결정사항

### OpenMetadata 버전

- OpenMetadata **1.6.0** 공식 Docker Compose(quickstart) 사용.
- 최신 안정 버전이며, 공식 문서 및 커뮤니티 자료가 풍부함.

### 배포 모드

- Docker Compose 기반 개발용 올인원 실행.
- MySQL, Elasticsearch, OpenMetadata Server, Airflow Ingestion을 단일 Compose로 구성.

### 포트 충돌 회피

- 기존 PoC 서비스와 충돌하는 포트를 회피하기 위해 Elasticsearch(`9200`), MySQL(`3306`), Ingestion(`8080`)의 호스트 포트 매핑 제거.
- OpenMetadata Server UI/API 포트(`8585`)와 Admin/Health 포트(`8586`)만 호스트에 노출.
- OpenMetadata 내장 Elasticsearch(`openmetadata_elasticsearch`)와 `kt-opensearch`를 분리 운영.

### 인증

- PoC에서는 OpenMetadata 기본 로컬 계정(`admin@open-metadata.org`/`admin`) 사용.
- Keycloak SSO 연동은 OIDC provider 등록으로 가능하며, 운영 확장 단계에서 검토.

### Backstage 연동 범위

- 5단계에서는 OpenMetadata API 연계 후보 확보 및 실행 검증에 집중.
- Backstage와의 직접 연동(REST API 호출, OpenSearch 싱크, UI 임베드 등)은 10단계에서 구현.

## 6단계 결정사항

### 플러그인 구현 방식

- 정식 Backstage Plugin(`plugins/project-workspace`) 대신 **PoC 컴포넌트 방식**(`packages/app/src/components/project-workspace/`)을 선택.
- 이유: 현재 Backstage 앱이 `createApp` legacy 방식으로 단순화되어 있어, 정식 플러그인 등록 시 기존 OIDC 로그인 흐름을 해칠 위험이 있음.
- 후속 안정화 단계에서 정식 플러그인 구조로 전환 검토.

### 데이터 연동 범위

- 6단계에서는 **mock data 기반**으로만 화면을 구현.
- 실제 DB/API 연동, Keycloak 그룹 연동, OpenMetadata 연동 등은 7~10단계 및 운영 확장 단계에서 진행.

### 레이아웃

- Backstage `SidebarPage` + `Content`를 사용하여 Sidebar와 메인 콘텐츠 영역을 분리.
- 이를 통해 Sidebar drawer가 콘텐츠를 가리는 문제를 방지하고 기존 Backstage 레이아웃 패턴을 따름.

### 인증

- 기존 Keycloak OIDC 로그인 연동을 유지.
- `Project Workspace` 메뉴는 로그인한 사용자에게 노출되며, 현재 단계에서는 별도 권한 제어 없음.
- 향후 Backstage permission 정책과 Keycloak 역할/그룹을 연계하여 메뉴 접근 제어 검토.

## 7단계 결정사항

### 플러그인 구현 방식

- 6단계와 동일하게 **PoC 컴포넌트 방식**(`packages/app/src/components/export-approval/`)으로 구현.
- 정식 Backstage Plugin 전환은 후속 안정화 단계에서 검토.
- `Project Workspace` 화면과 동일한 패턴을 재사용하여 개발 일관성과 안정성 확보.

### 데이터/파일 연동 범위

- 7단계에서는 **mock data 기반**으로만 화면을 구현.
- 실제 파일 업로드/다운로드, DB/API 연동, 반출 서버 연계는 8~10단계 및 운영 확장 단계에서 진행.

### 보안등급 기준

- `공개`, `내부`, `비밀` 3단계로 통일하여 Project Workspace 및 OpenSearch 샘플 데이터와 일관성 유지.

### 메뉴/라우팅

- `Home`, `Project Workspace`에 이어 `Export Approval` 메뉴를 추가.
- 기존 메뉴와 라우팅을 유지하며 최소한의 `App.tsx` 수정만 수행.

## 8단계 결정사항

### 보안등급 정정

- 7단계 및 이전 단계에서 보안등급을 `공개`, `내부`, `비밀` 3개로 통일.
- 보안등급은 `공개`, `내부`, `비밀` 3개로 통일하여 Project Workspace, Export Approval, OpenSearch 샘플 데이터 간 일관성 유지.

### 플러그인 구현 방식

- 6~7단계와 동일하게 **PoC 컴포넌트 방식**(`packages/app/src/components/credit-manager/`)으로 구현.
- 동일한 패턴을 재사용하여 `Project Workspace`, `Export Approval` 화면과의 일관성 및 안정성 확보.

### 데이터/연동 범위

- 8단계에서는 **mock data 기반**으로만 크레딧 관리 화면 구현.
- 실제 크레딧 차감, 자원 사용량 수집, 과금/결제, 클라우드 자원 제어는 9~10단계 및 운영 확장 단계에서 진행.

### 크레딧 정의

- PoC 기준으로 크레딧은 내부 사용량 관리 단위로 정의.
- 자원별 단가(CPU core-hour, GPU gpu-hour, Memory GB-hour 등)는 내부 계산 예시로 사용.

### 메뉴/라우팅

- `Home`, `Project Workspace`, `Export Approval`에 이어 `Credit Manager` 메뉴 추가.
- 기존 메뉴 및 라우팅을 유지하며 `App.tsx` 수정 최소화.


## 9단계 결정사항

### K-RMF 증빙관리 범위

- PoC 단계에서는 **K-RMF 통제항목, 증빙자료, 보안 미흡사항, 타 수행사 제출자료, 통합진척률 대시보드** 화면을 구현.
- 실제 K-RMF 심사, 감사 보고서, 외부 평가 연동은 운영 확장 단계에서 진행.

### 플러그인 구현 방식

- 6~8단계와 동일하게 **PoC 컴포넌트 방식**(`packages/app/src/components/krmf-evidence/`)으로 구현.
- 동일한 패턴을 재사용하여 `Project Workspace`, `Export Approval`, `Credit Manager` 화면과의 일관성 및 안정성 확보.

### 데이터/연동 범위

- 9단계에서는 **mock data 기반**으로만 증빙관리 화면 구현.
- 실제 파일 업로드/다운로드, DB/API 연동, 감사 시스템 연계, Project Workspace/Export Approval 연동은 10단계 및 운영 확장 단계에서 진행.

### 보안등급 통일

- 보안등급은 `공개`, `내부`, `비밀` 3개로 통일.
- K-RMF 증빙 자료, 데이터 분류 기준, OpenSearch 샘플 데이터 간 일관성 유지.

### 메뉴/라우팅

- `Home`, `Project Workspace`, `Export Approval`, `Credit Manager`에 이어 `K-RMF Evidence` 메뉴 추가.
- 기존 메뉴 및 라우팅을 유지하며 `App.tsx` 수정 최소화.


## 10단계 결정사항

### 통합검색 범위

- 10단계에서는 OpenSearch `portal-catalog` 기반 **키워드/필터 검색**을 우선 구현.
- OpenMetadata 실시간 연동은 후속 단계로 분리.
- 자체 플러그인 데이터 색인은 후속 단계로 분리.
- 임베딩 기반 유사도 검색은 설계만 작성하고 후속 고도화로 분리.
- 권한 기반 검색 결과 필터링은 후속 단계에서 Backstage backend 또는 검색 API 계층에서 처리.

### OpenSearch 연동 방식

- 브라우저에서 직접 OpenSearch를 호출하면 CORS 문제가 발생할 수 있음.
- 따라서 **Backstage backend proxy**(`/api/proxy/search`)를 경유하여 OpenSearch에 접근.
- 개발 편의상 `credentials: dangerously-allow-unauthenticated`를 적용하여 인증 세션 없이도 검색 가능하도록 설정.
- 운영 환경에서는 Keycloak 사용자 인증 기반으로 proxy 접근을 제한해야 함.

### 검색 보안

- PoC 단계에서는 검색 결과 필터링 없이 OpenSearch `portal-catalog` 전체를 조회.
- 실제 운영용 검색보안, 권한 필터링, 임베딩 검색은 이번 단계에서 구현하지 않음.

### 프론트엔드 프록시 호출 방식

- `useApi(configApiRef)`로 `backend.baseUrl`(`http://localhost:7007`)을 읽어 절대 URL을 조합.
- 초기에는 `/api/proxy/search/...` 상대 경로를 사용했으나 webpack-dev-server에서 404가 발생하여 절대 URL로 변경.
- Backstage backend proxy의 rewrite 규칙(`^/api/proxy/search/?` → `/`)에 따라 `portal-catalog/_search`로 전달됨.

### Proxy 인증 설정

- 개발 편의상 `proxy.endpoints.'/search'.credentials: dangerously-allow-unauthenticated` 적용.
- `allowedMethods`에 `GET`, `POST`, `OPTIONS`를 명시하여 OpenSearch `_search` POST 요청이 허용되도록 설정.
- 운영 환경에서는 Keycloak 인증 세션 기반으로 proxy 접근을 제한해야 함.
## 10.1단계 결정사항

### 보안등급 정규화

- 보안등급 enum/타입은 `public`/`internal`/`secret`을 그대로 유지.
- 화면 표시 라벨은 `public` → `공개`, `internal` → `내부`, `secret` → `비밀`로 통일.
- OpenSearch 샘플 데이터에 남아 있을 수 있는 과거 오타 `남부`는 `normalizeSecurityLevel`에서 `internal`로 정규화하여 호환.
- `SearchFilterPanel`과 `SearchResultList`/`SearchResultDetail`에서는 절대 `남부`를 표시하지 않음.
- `SearchApiClient`의 OpenSearch query 생성 시 `internal` 필터는 `내부`로 변환하여 실제 데이터와 일치.

### OpenSearch 데이터

- 현재 `portal-catalog` 인덱스의 `securityLevel` 값은 `공개`, `내부`, `비밀`로 이미 정리되어 있음.
- 향후 재적재가 필요한 경우 `infra/opensearch/scripts/`의 스크립트를 수동으로 실행하도록 안내.
## 10.2단계 결정사항

### 보안등급 최종 정정

- 보안등급은 `공개`, `내부`, `비밀` 3단계로 통일한다.
- 과거 오타 `남부`는 정상값으로 사용하지 않는다.
- 코드/문서/샘플 데이터/검색 UI의 보안등급 표시값은 `내부`로 일치해야 한다.
- `normalizeSecurityLevel`에서 `남부`는 과거 데이터 호환용으로만 허용하고, UI에는 절대 표시하지 않는다.
## 10.3단계 결정사항

### 보안등급 최종 정정

- 보안등급은 `공개`, `남부`, `비밀` 3단계로 통일한다.
- `남부`는 오타이며 정상값으로 사용하지 않는다.
- 코드/문서/샘플 데이터/검색 UI의 `internal` 표시값은 `내부`로 일치해야 한다.
- `남부`는 `normalizeSecurityLevel`에서 과거 데이터 호환용으로만 허용한다.
## 11단계 결정사항

### 메인 포털 대시보드 구성

- Home 화면(`/` 경로)을 메인 포털 대시보드로 재구성한다.
- 대시보드는 mock data 기반으로 구성하고, 실제 API 연동은 후속 단계로 분리한다.
- 기존 업무 메뉴 4종(Project Workspace, Export Approval, Credit Manager, K-RMF Evidence)과 Integrated Search로 이동하는 허브 역할을 수행한다.
- 통합검색 바로가기는 `/integrated-search?q=<검색어>`로 이동하며, `IntegratedSearchPage`는 URL 파라미터를 초기 검색어로 반영한다.
- 제안장표 캡처에 적합한 카드형 레이아웃과 큰 숫자 강조를 우선한다.
- 외부 관리도구(OpenMetadata, OpenSearch Dashboards, Keycloak Admin)는 새 탭 링크로 제공한다.

## 11.1단계 결정사항

### OIDC 런타임 환경변수 관리

- Backstage 개발 실행 시 OIDC clientSecret과 session secret은 `backstage-portal/.env`에서 로딩한다.
- `.env` 파일은 `.gitignore`에 포함하여 Git에 포함되지 않도록 관리한다.
- macOS 기본 bash 3.2 호환성을 위해 `scripts/start-dev.sh`에서 `export $(grep -v '^#' .env | grep -v '^$' | xargs)` 방식으로 환경변수를 로딩한다.
- OIDC 로그인 검증은 `admin01` 사용자로 수행하며, 로그인 후 Portal Dashboard에 Keycloak 사용자 정보가 표시되어야 한다.
- 실제 secret 값은 문서나 Git에 기록하지 않는다.

## 12단계 결정사항

### 최종 산출물 정리

- 12단계에서는 기능 추가보다 최종 산출물과 시연자료 정리를 우선한다.
- 최종 산출물은 `docs/FINAL_DELIVERABLES.md`, 데모 시나리오는 `docs/DEMO_SCRIPT.md`, 기술 부채는 `docs/TECH_DEBT.md`에 각각 정리한다.
- 주요 화면은 `docs/assets/final/`에 캡처하여 제안장표 및 시연자료로 활용한다.
- 캡처가 어려운 화면은 문서에 보류 사유를 기록하고, 시연 시 실제 URL로 대체한다.

### PoC 범위와 운영 전환

- 현재 PoC는 mock data 기반 업무 화면과 일부 실제 인프라(Keycloak, OpenSearch, OpenMetadata) 연동을 결합한 구조다.
- 운영 전환 시 DB/API/권한/보안/배포 구조를 재설계한다.
- 정식 Backstage Plugin 전환은 중장기 과제로 분리한다.

### 보안/secret 관리

- 실제 secret 값은 문서와 Git에 기록하지 않는다.
- `.env`는 `.gitignore`에 포함하여 Git에 포함되지 않도록 관리한다.
- PoC 환경에서 노출된 Keycloak Client Secret은 필요 시 재생성한다.

## 13단계 결정사항

### 포털 명칭 변경

- 공식 명칭을 `국방지능화플랫폼`으로 확정하고, 영문 보조명 `K-Defense Intelligence Platform`을 함께 사용한다.
- 기존 `K-Defense AI Data Portal`은 더 이상 메인 타이틀로 사용하지 않으며, 문서에서는 이전 명칭으로만 언급한다.
- `app-config.yaml`, Portal Dashboard Hero, README 및 주요 문서 제목에 새 명칭을 반영한다.

### Admin Console 구현 방식

- 6~11단계와 동일하게 **PoC 컴포넌트 방식**(`packages/app/src/components/admin-console/`)으로 구현한다.
- 내부 DB/API/Keycloak 관리 로직은 13단계에서 구현하지 않으며, mock data 기반 화면을 우선 확보한다.
- Admin Console은 사용자 등록 신청, 사용자 관리, 권한/역할, 로그인 정책, 비밀번호 정책, 감사 로그, 메뉴 관리, 요구사항 대응 현황 패널로 구성한다.
- 사이드바 메뉴와 Portal Dashboard Quick Links에 `Admin Console`을 추가하여 관리자 접근 경로를 노출한다.

### 요구사항 대응 현황 문서화

- `docs/REQUIREMENT_SCREEN_COVERAGE.md`를 신규 작성하여 요구사항 PDF 대비 현재 화면 충족도와 후속 단계를 정리한다.
- Admin Console 추가 후 화면 기준 충족도를 약 80% 내외로 판단하고, 내부 로직 연동은 14~18단계로 분리한다.

## 14단계 결정사항

### 사용자 관리 화면 상세화 범위

- 13단계에서 추가한 `Admin Console` 남부 탭을 유지하고, 사용자 등록/승인/외부 사용자 관리 영역을 상세화한다.
- 신규 메뉴를 별도로 추가하지 않고, Admin Console 기존 탭 구조 내에서 `외부 사용자 관리` 탭을 추가한다.
- 실제 Keycloak 사용자 생성/수정 API는 호출하지 않으며, mock state 변경으로만 workflow를 보여준다.

### 사용자 등록 승인 workflow

- 등록 신청 상태는 `신청 → 본인확인완료 → 검토중 → 승인` 또는 `반려/보완요청 → 재신청 → 검토중` 흐름을 mock으로 구현한다.
- 상태 변경 시 `UserStatusHistoryPanel`에 이력이 추가되도록 하여 감사 추적성을 시각적으로 보여준다.

### 외부 사용자 관리

- 외부 사용자 전용 목록 패널을 추가하여 접속 기간, 계약사, 부여 역할, 접근 서비스를 한눈에 확인할 수 있게 한다.
- 등록/수정/연장/잠금 버튼은 mock 동작 또는 비활성 처리하여 실제 연동 전 UI 예시를 제공한다.

### 설계 문서화

- 사용자 관리 영역의 요구사항 대응 범위, 현재 구현 범위, 후속 Keycloak/DB 연동 방향을 `docs/USER_MANAGEMENT_DESIGN.md`에 정리한다.
