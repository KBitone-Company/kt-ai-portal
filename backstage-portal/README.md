# 국방지능화플랫폼 - Backstage

국방지능화플랫폼 PoC의 Backstage 기반 포털 앱입니다.

## 사전 요구사항

- macOS
- Node.js 22 또는 24
- Yarn (Corepack 권장)
- Docker Desktop

## 설치

```bash
cd kt-ai-portal/backstage-portal
yarn install
```

## 전체 실행 순서

### 1. 인프라 실행

```bash
cd kt-ai-portal/infra/keycloak
docker compose up -d

cd ../opensearch
docker compose up -d

cd ../openmetadata
docker compose up -d
```

### 2. 환경변수 준비

Backstage 개발 서버는 OIDC clientSecret 및 session secret이 필요합니다. 먼저 `.env.example`을 복사하여 `.env`를 만들고, Keycloak `backstage` Client Secret을 입력하세요.

```bash
cd kt-ai-portal/backstage-portal
cp .env.example .env
# .env 파일의 AUTH_OIDC_CLIENT_SECRET을 Keycloak backstage Client Secret으로 수정
```

Keycloak Client Secret 확인 방법:

1. `http://localhost:8080/admin` 접속 (admin / <password>)
2. Realm `kt-ai` 선택
3. Client `backstage` 선택
4. `Credentials` 탭에서 Client Secret 복사
5. `.env`의 `AUTH_OIDC_CLIENT_SECRET`에 붙여넣기

### 3. Backstage 실행

```bash
./scripts/start-dev.sh
```

- 프론트엔드: http://localhost:3000
- 백엔드 API: http://localhost:7007

> `yarn start`만 실행하면 `.env`의 환경변수가 로딩되지 않아 OIDC provider가 skip될 수 있습니다. OIDC 로그인을 사용하려면 반드시 `./scripts/start-dev.sh`를 사용하세요.

## 주요 URL

| 서비스 | URL | 계정 |
|--------|-----|------|
| Backstage | http://localhost:3000 | admin01 / <password> (Keycloak) |
| Backstage backend | http://localhost:7007 | - |
| Keycloak Admin | http://localhost:8080/admin | admin / <password> |
| OpenSearch Dashboards | http://localhost:5601 | admin / <password> |
| OpenMetadata | http://localhost:8585 | admin@openmetadata.org / <password> |

## 주요 메뉴

- Home (Portal Dashboard)
- Project Workspace
- Export Approval
- Credit Manager
- K-RMF Evidence
- Integrated Search
- Admin Console (사용자 등록/승인, 외부 사용자 관리, 권한/정책/감사로그/메뉴)

## 프로덕션 빌드

```bash
yarn build:all
yarn build:backend
```

## 자주 발생하는 오류와 조치

### OIDC provider skip (`Skipping oidc auth provider`)

- `.env`에 `AUTH_OIDC_CLIENT_SECRET`과 `AUTH_SESSION_SECRET`이 설정되어 있는지 확인
- `./scripts/start-dev.sh`를 사용하여 `.env`를 로딩했는지 확인

### OpenSearch 연결 실패

- `kt-opensearch` 컨테이너가 실행 중인지 확인: `docker ps`
- `http://localhost:9200` 접속 확인

### OpenMetadata 로그인 실패

- 초기 계정이 설정되어 있지 않을 수 있음
- OpenMetadata 첫 실행 시 관리자 계정 설정 필요

## 참고

- `docs/OIDC_RUNTIME_FIX.md` — OIDC 환경변수 로딩 문제 해결 가이드
- `docs/PORTAL_DASHBOARD.md` — Portal Dashboard 설명
- `docs/FINAL_DELIVERABLES.md` — 최종 산출물 목록
- `docs/DEMO_SCRIPT.md` — 데모 시나리오
- `docs/TECH_DEBT.md` — 기술 부채 정리
- 공식 Backstage 문서: https://backstage.io/docs
