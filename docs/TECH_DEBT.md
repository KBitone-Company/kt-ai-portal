# 기술 부채 정리

현재 PoC 단계에서 남아 있는 기술 부채와 후속 정리 계획을 정리한다.

## 1. TypeScript 기존 오류

| 구분 | 이슈 | 영향 | 조치 계획 |
|------|------|------|-----------|
| Test | `packages/app/src/App.test.tsx`에서 `App.createRoot()` 타입 오류 | `yarn test` 실행 시 실패, 개발 서버에는 영향 없음 | `createRoot` 반환 타입 또는 테스트 방식 수정. `@testing-library/react` + `App` 컴포넌트 직접 렌더링 방식 검토 |

### 상세

```text
packages/app/src/App.test.tsx:22:33 - error TS2339:
  Property 'createRoot' does not exist on type 'ComponentType<{ children?: ReactNode; }>'.
```

`app.createRoot(...)`은 Backstage `createApp`의 결과로 `React.ComponentType`을 반환하지만, 테스트 코드에서 `App.createRoot()`처럼 정적 메서드로 호출하고 있다. 실제 컴포넌트를 렌더링하도록 테스트를 수정해야 한다.

## 2. UI Warning

| 구분 | 이슈 | 영향 | 조치 계획 |
|------|------|------|-----------|
| MUI v4 | `findDOMNode is deprecated` 경고 | 기능 동작에는 영향 없음, 콘솔 노이즈 발생 | MUI v5 또는 Backstage 권장 컴포넌트로 점진적 마이그레이션 |

## 3. 구조적 부채

| 구분 | 이슈 | 영향 | 조치 계획 |
|------|------|------|-----------|
| PoC 컴포넌트 | 모든 업무 기능이 `packages/app/src/components/`에 직접 구현됨 | 정식 Backstage Plugin 구조가 아니라 확장성과 유지보수성이 낮음 | 필요 시 `backstage-portal/plugins/` 아래 정식 플러그인으로 분리 |
| Mock Data | 업무 화면이 mock data 기반 | 실제 데이터 반영 불가 | 각 플러그인별 API 클라이언트 및 Backend API 구현 |
| Catalog 연동 | OIDC 로그인 시 Backstage Catalog에 사용자/그룹 엔티티가 없음 | `dangerouslyAllowSignInWithoutUserInCatalog: true`로 임시 우회 중 | Keycloak 그룹/역할을 Backstage Catalog에 동기화하거나 resolver 변경 |

## 4. 인증/권한 부채

| 구분 | 이슈 | 영향 | 조치 계획 |
|------|------|------|-----------|
| Role/Group Claim | Keycloak에서 role/group claim이 Backstage로 전달되지 않음 | 권한 기반 메뉴 제어/검색 필터링 불가 | Keycloak Client Mapper 추가 및 Backstage 권한 프레임워크 연동 |
| 검색 권한 | OpenSearch 검색 결과에 보안등급/권한 필터 미적용 | 낮은 권한 사용자도 높은 보안등급 결과를 볼 수 있음 | Backend 검색 API에서 사용자 역할 기반 필터 추가 |
| Session Secret | `.env` 기반 session secret 관리 | 개발 환경에서는 적절, 운영 환경에서는 별도 secret 관리 체계 필요 | Vault/Kubernetes Secret 등 도입 |

## 5. 데이터 연동 부채

| 구분 | 이슈 | 영향 | 조치 계획 |
|------|------|------|-----------|
| OpenMetadata | 포털과 OpenMetadata 간 데이터 자동 동기화 미구현 | 최신 데이터셋/모델 수동 등록 필요 | OpenMetadata API 연동 및 Webhook/Scheduler 구현 |
| OpenSearch | `portal-catalog` 인덱스가 샘플 데이터 기반 | 실제 업무 데이터 검색 불가 | 업무 시스템 데이터를 OpenSearch에 색인하는 파이프라인 구축 |
| 파일 저장소 | 반출/반입 파일 업로드/다운로드 미구현 | 실제 반출 통제 불가 | 파일 저장소(S3/NFS/MinIO 등) 및 다운로드 권한 제어 구현 |
| 크레딧 | 실제 자원 사용량 수집 미연동 | 크레딧 차감 및 예측 불가 | AI/큐브/클우드 사용량 수집 API 연동 |

## 6. 테스트 부채

| 구분 | 이슈 | 영향 | 조치 계획 |
|------|------|------|-----------|
| Unit Test | PoC 컴포넌트에 대한 단위 테스트 부재 | 회귀 방지 어려움 | 주요 컴포넌트(Unit Test) 및 페이지(E2E) 테스트 추가 |
| E2E Test | Playwright 설정은 있으나 시나리오 테스트 미작성 | 데모 시나리오 자동화 불가 | 제안장표용 주요 시나리오 E2E 테스트 작성 |

## 7. 문서/운영 부채

| 구분 | 이슈 | 영향 | 조치 계획 |
|------|------|------|-----------|
| 로깅/모니터링 | 중앙 로그/메트릭 수집 미구축 | 장애 대응 및 운영 가시성 부족 | ELK/Prometheus-Grafana 등 도입 검토 |
| CI/CD | 자동 빌드/배포 파이프라인 없음 | 배포 수동화 및 품질 관리 어려움 | GitHub Actions/GitLab CI 등 구축 |
| 백업/복구 | DB/인덱스/파일 백업 정책 없음 | 데이터 유실 위험 | 백업/복구 정책 및 자동화 스크립트 수립 |

## 8. 정리 우선순위 제안

1. **즉시**: `App.test.tsx` TypeScript 오류 수정
2. **단기**: Keycloak role/group claim 연동 및 권한 기반 메뉴 제어
3. **중기**: 실제 DB/API 연동 (Project Workspace, Export Approval, Credit Manager, K-RMF)
4. **중기**: OpenMetadata/OpenSearch 데이터 동기화
5. **장기**: 정식 Backstage Plugin 전환
6. **장기**: 운영 인프라(Kubernetes, CI/CD, 모니터링, 백업) 구축
