# 국방지능화플랫폼 (K-Defense Intelligence Platform) 데모 스크립트

## 데모 목적

국방지능화플랫폼의 메인 포털, 인증, 통합검색, 프로젝트 관리, 반출/반입 관리, 크레딧 관리, K-RMF 증빙관리 기능을 PoC 수준에서 시연한다.

## 데모 준비

### 사전 조건

- macOS, Docker Desktop, Node.js 22/24, Yarn
- Keycloak, OpenSearch, OpenMetadata, Backstage 컨테이너/프로세스 실행

### 인프라 실행

```bash
cd kt-ai-portal/infra/keycloak
docker compose up -d

cd ../opensearch
docker compose up -d

cd ../openmetadata
docker compose up -d
```

### Backstage 실행

```bash
cd kt-ai-portal/backstage-portal
./scripts/start-dev.sh
```

> `.env`에 `AUTH_OIDC_CLIENT_SECRET`과 `AUTH_SESSION_SECRET`이 설정되어 있어야 한다. 설정 방법은 `docs/OIDC_RUNTIME_FIX.md` 참조.

### 접속 정보

| 서비스 | URL | 계정 |
|--------|-----|------|
| Backstage | http://localhost:3000 | admin01 / <password> |
| Keycloak Admin | http://localhost:8080/admin | admin / <password> |
| OpenSearch Dashboards | http://localhost:5601 | admin / <password> |
| OpenMetadata | http://localhost:8585 | admin@openmetadata.org / <password> |

## 데모 순서

### 1. 로그인

1. 브라우저에서 `http://localhost:3000` 접속
2. Sign-In 페이지에서 **Keycloak** 선택
3. Keycloak 로그인 페이지에서 `admin01 / <password>` 입력
4. Portal Dashboard로 복귀 확인

**발표 멘트 예시:**
> "국방지능화플랫폼 (K-Defense Intelligence Platform)은 Backstage 기반의 국방지능화플랫폼입니다. Keycloak OIDC를 통해 로그인하면 사용자 정보와 주요 현황을 한눈에 확인할 수 있습니다."

### 2. Portal Dashboard 확인

1. Hero 영역에서 `Admin Kim (user:default/admin01)` 및 `admin01@kt.ai` 확인
2. 요약 카드(데이터셋 128, AI 모델 24, 진행 프로젝트 12 등) 확인
3. 공지사항, 신규 등록 자산, 내 프로젝트, 반출/반입 대기, 크레딧 요약, K-RMF 진행률, 시스템 상태 패널 확인
4. 하단 주요 메뉴 바로가기 확인

**발표 멘트 예시:**
> "대시보드에서는 데이터셋, AI 모델, 프로젝트, 반출승인, 크레딧, K-RMF 증빙까지 전체 현황을 요약해 보여줍니다. 각 패널은 실제 API 연동을 통해 실시간 데이터로 확장될 예정입니다."

### 3. 통합검색

1. Portal Dashboard 상단 검색창에 `정비` 입력 후 Enter
2. `/integrated-search?q=정비` 이동
3. 검색 결과에서 `육군 장비 정비이력 데이터셋`, `장비 고장예측 AI 모델` 등 확인
4. 검색 대상 유형, 보안등급, 소스 시스템, 태그 필터 적용
5. 결과 항목 선택 시 상세 패널 확인

**발표 멘트 예시:**
> "통합검색은 OpenSearch `portal-catalog` 인덱스를 활용해 데이터셋, AI 모델, Docker 이미지, PyPI 패키지, 문서를 한 번에 검색합니다. 향후 임베딩 기반 유사도 검색도 추가할 예정입니다."

### 4. Project Workspace

1. 사이드바 또는 바로가기에서 `Project Workspace` 이동
2. 프로젝트 목록 및 상태 확인
3. 프로젝트 선택 시 상세 정보(참여자, 리소스, 승인 이력) 확인
4. `프로젝트 생성 신청` 탭에서 신규 신청 UI 확인

**발표 멘트 예시:**
> "Project Workspace에서는 프로젝트 생성부터 승인, 참여자 관리, 리소스 할당까지 통합 관리할 수 있습니다. 현재는 mock data 기반 PoC입니다."

### 5. Export Approval

1. `Export Approval` 이동
2. 반출/반입 신청 목록 및 상태 확인
3. 신청 항목 선택 시 상세 정보 및 감사로그 확인
4. `신청 등록` 탭에서 반출/반입 신규 신청 UI 확인

**발표 멘트 예시:**
> "데이터 반출/반입은 보안등급과 승인 상태에 따라 관리됩니다. 실제 연동 시 승인 워크플로우와 파일 다운로드 통제가 추가됩니다."

### 6. Credit Manager

1. `Credit Manager` 이동
2. 전체 잔여/사용/충전 크레딧 요약 확인
3. 프로젝트별 크레딧 현황 확인
4. 사용 이력/충전 이력 및 경고 패널 확인

**발표 멘트 예시:**
> "Credit Manager는 AI/클우드 자원 사용량에 따른 크레딧 현황을 보여주며, 부족 시 자원 제한 상태를 시각적으로 알려줍니다."

### 7. K-RMF Evidence

1. `K-RMF Evidence` 이동
2. 통제항목 목록 및 적용 여부 확인
3. 증빙자료/미흡사항/이력 확인
4. 타 수행사 제출자료 및 통합진척률 확인

**발표 멘트 예시:**
> "K-RMF 증빙관리는 국방 보안통제 항목별 증빙자료와 미흡사항 조치를 관리합니다. 실제 평가 시스템과 연동하여 자동화할 수 있습니다."

### 8. Admin Console

1. 사이드바 또는 바로가기에서 `Admin Console` 이동
2. 요약 카드(등록 신청 대기, 승인 대기, 외부/활성 사용자, 잠금 계정 등) 확인
3. `사용자 등록 신청` 탭에서 신청자 목록 확인 및 선택
4. 선택한 신청자의 상세 정보(기본정보, 본인확인, 신청정보, 보안확인, 승인처리) 확인
5. `검토 시작`, `승인`, `반려`, `보완요청` 버튼으로 mock workflow 체험
6. `사용자 관리` 탭에서 사용자 선택 후 소속/역할/접속 가능 서비스 설정 UI 확인
7. 사용자별 `상태 변경 이력` 확인
8. `외부 사용자 관리` 탭에서 외부/수행사 사용자 목록 및 접속 기간 확인
9. `권한/역할`, `로그인 정책`, `비밀번호 정책`, `감사 로그`, `메뉴 관리` 탭 확인
10. 하단 `요구사항 대응 현황` 표 확인

**발표 멘트 예시:**
> "Admin Console은 관리자가 사용자 등록 승인, 권한/역할, 로그인 및 비밀번호 정책, 감사 로그, 메뉴를 관리하는 허브입니다. 14단계에서는 사용자 등록 상세, 승인 workflow, 외부 사용자 관리, 접속 가능 서비스 설정, 상태 변경 이력을 추가했습니다. 실제 Keycloak/DB 연동은 15~18단계에서 진행할 예정입니다."

### 9. OpenMetadata 확인

1. 브라우저에서 `http://localhost:8585` 접속
2. OpenMetadata 로그인(기본 계정: `admin@openmetadata.org / <password>`)
3. 데이터셋/AI 모델/파이프라인 메타데이터 UI 확인

**발표 멘트 예시:**
> "OpenMetadata는 데이터와 AI 모델의 메타데이터를 관리하는 카탈로그 도구입니다. 향후 포털과 연동하여 최신 자산을 자동으로 동기화할 예정입니다."

### 10. OpenSearch Dashboards 확인

1. 브라우저에서 `http://localhost:5601` 접속
2. OpenSearch Dashboards 홈 화면 확인
3. Dev Tools 또는 인덱스 상태 확인(선택)

**발표 멘트 예시:**
> "OpenSearch Dashboards에서는 `portal-catalog` 인덱스와 검색 통계를 시각화할 수 있습니다."

### 11. 정리 멘트

**발표 멘트 예시:**
> "이번 PoC에서는 Backstage 기반 포털, Keycloak 인증, OpenSearch 통합검색, OpenMetadata 카탈로그, 그리고 4가지 업무 기능의 UI를 구현했습니다. 운영 전환 시 실제 DB/API 연동, 권한 제어, 보안 강화를 통해 완성도를 높일 계획입니다."

## 데모 시 주의사항

- `.env` 파일에 실제 secret 값이 포함되어 있으므로 스크린 미러링 시 유출 주의
- PoC 환경이므로 `admin/<password>`, `admin01/<password>` 등 테스트 계정만 사용
- OpenMetadata 초기 계정 설정이 되어 있지 않을 수 있음
- Docker Desktop 메모리 부족 시 컨테이너가 불안정할 수 있음
