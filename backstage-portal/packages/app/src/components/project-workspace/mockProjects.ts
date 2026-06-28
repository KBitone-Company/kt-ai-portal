import { Project } from './types';

export const mockProjects: Project[] = [
  {
    id: 'P-2025-001',
    name: 'DIMS 정비이력 분석 프로젝트',
    description:
      '육군 DIMS(Defense Integrated Maintenance System) 정비이력 데이터를 활용한 장비 정비 패턴 분석 및 고장 예측 PoC',
    purpose:
      '정비 이력 기반 장비 고장 조기 예측과 정비 일정 최적화를 위한 분석 환경 구축',
    status: 'running',
    securityLevel: '내부',
    ownerOrganization: '군수정책과',
    pm: {
      userId: 'admin01',
      name: '김관리',
      organization: '군수정책과',
      role: 'PM',
    },
    members: [
      { userId: 'developer01', name: '이개발', organization: 'AI개발센터', role: 'Developer' },
      { userId: 'analyst01', name: '박분석', organization: '군수정책과', role: 'Analyst' },
      { userId: 'external01', name: '최외부', organization: '외부수행사', role: 'ExternalUser' },
    ],
    startDate: '2025-01-15',
    endDate: '2025-12-31',
    workspaceStatus: 'active',
    quota: {
      cpuCores: 16,
      gpuCount: 2,
      memoryGiB: 128,
      storageGiB: 2048,
      networkMbps: 1000,
      usesCredit: true,
    },
    datasets: ['육군 장비 정비이력 데이터셋', '군수 물류 재고 현황 데이터셋'],
    models: ['장비 고장예측 AI 모델'],
    activityLog: [
      '2025-06-20 김관리: 프로젝트 워크스페이스 생성 완료',
      '2025-06-21 이개발: GPU 리소스 할당 요청',
      '2025-06-23 박분석: 샘플 데이터 적재 완료',
    ],
    approvalHistory: [
      { action: 'requested', actor: '김관리', comment: '프로젝트 생성 신청', timestamp: '2025-01-10T09:00:00Z' },
      { action: 'approved', actor: '정병호보안팀', comment: '보안 검토 완료', timestamp: '2025-01-12T14:00:00Z' },
    ],
  },
  {
    id: 'P-2025-002',
    name: '장비 고장예측 모델 개발',
    description:
      '정비 이력과 센서 데이터를 융합한 장비 고장예측 머신러닝 모델 개발 및 실험 관리',
    purpose:
      '육/해/공군 주요 장비의 고장 예측 정확도 향상과 예지보전 체계 구축',
    status: 'running',
    securityLevel: '비밀',
    ownerOrganization: 'AI개발센터',
    pm: {
      userId: 'pm01',
      name: '정PM',
      organization: 'AI개발센터',
      role: 'PM',
    },
    members: [
      { userId: 'developer01', name: '이개발', organization: 'AI개발센터', role: 'Developer' },
      { userId: 'developer02', name: '최엔지니어', organization: 'AI개발센터', role: 'Developer' },
      { userId: 'analyst01', name: '박분석', organization: '군수정책과', role: 'Analyst' },
    ],
    startDate: '2025-02-01',
    endDate: '2025-11-30',
    workspaceStatus: 'active',
    quota: {
      cpuCores: 32,
      gpuCount: 4,
      memoryGiB: 256,
      storageGiB: 4096,
      networkMbps: 1000,
      usesCredit: true,
    },
    datasets: ['육군 장비 정비이력 데이터셋', '해군 장비 센서 시계열 데이터셋'],
    models: ['장비 고장예측 AI 모델', '부품 수요예측 AI 모델'],
    activityLog: [
      '2025-06-15 이개발: 실험 #42 시작',
      '2025-06-18 최엔지니어: 모델 v0.3 평가 완료',
    ],
    approvalHistory: [
      { action: 'requested', actor: '정PM', comment: '모델 개발 환경 신청', timestamp: '2025-01-25T10:00:00Z' },
      { action: 'approved', actor: 'AI운영팀', comment: '리소스 검토 완료', timestamp: '2025-01-28T11:00:00Z' },
    ],
  },
  {
    id: 'P-2025-003',
    name: '부품 수요예측 데이터셋 구축',
    description:
      '공군 항공기 부품 교체 주기 및 재고 데이터를 정제하여 수요예측용 학습 데이터셋 구축',
    purpose:
      '부품 재고 최적화와 수요 예측 정확도 향상',
    status: 'pending_approval',
    securityLevel: '내부',
    ownerOrganization: '공군군수본부',
    pm: {
      userId: 'pm01',
      name: '정PM',
      organization: 'AI개발센터',
      role: 'PM',
    },
    members: [
      { userId: 'analyst01', name: '박분석', organization: '군수정책과', role: 'Analyst' },
      { userId: 'developer01', name: '이개발', organization: 'AI개발센터', role: 'Developer' },
    ],
    startDate: '2025-07-01',
    endDate: '2025-12-31',
    workspaceStatus: 'provisioning',
    quota: {
      cpuCores: 8,
      gpuCount: 0,
      memoryGiB: 64,
      storageGiB: 1024,
      networkMbps: 500,
      usesCredit: true,
    },
    datasets: ['공군 부품 수요예측 데이터셋'],
    models: [],
    activityLog: [
      '2025-06-25 정PM: 데이터셋 구축 프로젝트 신청',
    ],
    approvalHistory: [
      { action: 'requested', actor: '정PM', comment: '데이터셋 구축 신청', timestamp: '2025-06-25T09:00:00Z' },
    ],
  },
  {
    id: 'P-2025-004',
    name: '해군 센서 시계열 분석',
    description:
      '함정 엔진룸 온도/진동 센서 데이터를 활용한 시계열异상 징후 탐지 및 예지보전 연구',
    purpose:
      '함정 주요 장비 이상 징후 조기 탐지 및 정비 시점 예측',
    status: 'approved',
    securityLevel: '비밀',
    ownerOrganization: '함정기술과',
    pm: {
      userId: 'pm01',
      name: '정PM',
      organization: 'AI개발센터',
      role: 'PM',
    },
    members: [
      { userId: 'developer01', name: '이개발', organization: 'AI개발센터', role: 'Developer' },
      { userId: 'analyst01', name: '박분석', organization: '군수정책과', role: 'Analyst' },
      { userId: 'external01', name: '최외부', organization: '외부수행사', role: 'ExternalUser' },
      { userId: 'security01', name: '한보안', organization: '정병호보안팀', role: 'SecurityReviewer' },
    ],
    startDate: '2025-03-01',
    endDate: '2025-10-31',
    workspaceStatus: 'provisioning',
    quota: {
      cpuCores: 24,
      gpuCount: 2,
      memoryGiB: 192,
      storageGiB: 3072,
      networkMbps: 1000,
      usesCredit: true,
    },
    datasets: ['해군 장비 센서 시계열 데이터셋'],
    models: ['장비 고장예측 AI 모델'],
    activityLog: [
      '2025-06-22 한보안: 보안 검토 완료',
      '2025-06-24 정PM: 승인 완료',
    ],
    approvalHistory: [
      { action: 'requested', actor: '정PM', comment: '해군 센서 분석 프로젝트 신청', timestamp: '2025-02-20T09:00:00Z' },
      { action: 'approved', actor: '한보안', comment: '비밀 등급 접근 승인', timestamp: '2025-06-22T16:00:00Z' },
      { action: 'approved', actor: 'AI운영팀', comment: '리소스 승인', timestamp: '2025-06-24T10:00:00Z' },
    ],
  },
  {
    id: 'P-2025-005',
    name: 'K-RMF 증빙 자동화 PoC',
    description:
      'K-RMF(Korea Risk Management Framework) 보안통제 항목별 증빙자료를 프로젝트 단위로 수집·관리하는 PoC',
    purpose:
      'AI/Data 플랫폼 프로젝트의 보안통제 증빙 수집 자동화 및 진척률 가시화',
    status: 'requested',
    securityLevel: '내부',
    ownerOrganization: '정병호보안팀',
    pm: {
      userId: 'admin01',
      name: '김관리',
      organization: '군수정책과',
      role: 'PM',
    },
    members: [
      { userId: 'developer01', name: '이개발', organization: 'AI개발센터', role: 'Developer' },
      { userId: 'security01', name: '한보안', organization: '정병호보안팀', role: 'SecurityReviewer' },
    ],
    startDate: '2025-08-01',
    endDate: '2025-12-31',
    workspaceStatus: 'provisioning',
    quota: {
      cpuCores: 4,
      gpuCount: 0,
      memoryGiB: 32,
      storageGiB: 512,
      networkMbps: 200,
      usesCredit: false,
    },
    datasets: [],
    models: [],
    activityLog: [
      '2025-06-26 김관리: K-RMF PoC 신청',
    ],
    approvalHistory: [
      { action: 'requested', actor: '김관리', comment: 'K-RMF 증빙 자동화 PoC 신청', timestamp: '2025-06-26T09:00:00Z' },
    ],
  },
];
