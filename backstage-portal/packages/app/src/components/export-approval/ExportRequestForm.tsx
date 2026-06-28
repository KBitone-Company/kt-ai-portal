import { useState, FormEvent, ChangeEvent } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import {
  ExportDirection,
  ExportTargetType,
  SecurityLevel,
  Visibility,
  AccessScope,
} from './types';

const directions: { value: ExportDirection; label: string }[] = [
  { value: 'export', label: '반출' },
  { value: 'import', label: '반입' },
];

const targetTypes: { value: ExportTargetType; label: string }[] = [
  { value: 'server', label: '서버' },
  { value: 'ai_model', label: 'AI 모델' },
  { value: 'algorithm', label: '알고리즘' },
  { value: 'dataset', label: '데이터셋' },
  { value: 'document', label: '문서' },
  { value: 'docker_image', label: 'Docker 이미지' },
  { value: 'pypi_package', label: 'PyPI 패키지' },
];

const securityLevels: { value: SecurityLevel; label: string }[] = [
  { value: 'public', label: '공개' },
  { value: 'internal', label: '내부' },
  { value: 'secret', label: '비밀' },
];

const visibilities: { value: Visibility; label: string }[] = [
  { value: 'public', label: '공개' },
  { value: 'private', label: '비공개' },
  { value: 'restricted', label: '제한공개' },
];

const accessScopes: { value: AccessScope; label: string }[] = [
  { value: 'all_users', label: '전체 사용자' },
  { value: 'project_members', label: '프로젝트 참여자' },
  { value: 'approved_users', label: '승인 사용자' },
  { value: 'admins_only', label: '관리자 전용' },
];

const projectOptions = [
  'DIMS 정비이력 분석 프로젝트',
  '장비 고장예측 모델 개발',
  '부품 수요예측 데이터셋 구축',
  '해군 센서 시계열 분석',
  'K-RMF 증빙 자동화 PoC',
];

export const ExportRequestForm = () => {
  const [form, setForm] = useState({
    direction: 'export' as ExportDirection,
    targetType: 'dataset' as ExportTargetType,
    targetName: '',
    targetDescription: '',
    projectName: projectOptions[0],
    reason: '',
    requester: '',
    requesterOrg: '',
    securityLevel: 'internal' as SecurityLevel,
    visibility: 'restricted' as Visibility,
    accessScope: 'approved_users' as AccessScope,
    attachments: '',
    downloadable: 'no',
    approver: '',
  });

  const handleChange = (field: keyof typeof form) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm(prev => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log('Export request submitted (mock):', form);
    alert(
      `[Mock] 반출/반입 신청이 접수되었습니다.\n\n대상: ${form.targetName}\n구분: ${form.direction}\n유형: ${form.targetType}\n프로젝트: ${form.projectName}\n\n실제 저장은 7단계 범위外입니다.`,
    );
  };

  return (
    <Paper style={{ padding: 24 }}>
      <Typography variant="h5" gutterBottom>
        반출/반입 신청 등록
      </Typography>
      <Typography color="textSecondary" paragraph>
        * 이 화면은 mock action입니다. 저장 버튼 클릭 시 실제 저장되지 않습니다.
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              required
              label="반출/반입 구분"
              value={form.direction}
              onChange={handleChange('direction')}
            >
              {directions.map(item => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              required
              label="대상 유형"
              value={form.targetType}
              onChange={handleChange('targetType')}
            >
              {targetTypes.map(item => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="대상명"
              value={form.targetName}
              onChange={handleChange('targetName')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              multiline
              rows={3}
              label="대상 설명"
              value={form.targetDescription}
              onChange={handleChange('targetDescription')}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              required
              label="관련 프로젝트"
              value={form.projectName}
              onChange={handleChange('projectName')}
            >
              {projectOptions.map(name => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="승인 요청 대상자"
              value={form.approver}
              onChange={handleChange('approver')}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              multiline
              rows={2}
              label="신청 사유"
              value={form.reason}
              onChange={handleChange('reason')}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="신청자"
              value={form.requester}
              onChange={handleChange('requester')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="소속"
              value={form.requesterOrg}
              onChange={handleChange('requesterOrg')}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              select
              fullWidth
              required
              label="보안등급"
              value={form.securityLevel}
              onChange={handleChange('securityLevel')}
            >
              {securityLevels.map(item => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              fullWidth
              required
              label="공개 여부"
              value={form.visibility}
              onChange={handleChange('visibility')}
            >
              {visibilities.map(item => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              fullWidth
              required
              label="사용권한"
              value={form.accessScope}
              onChange={handleChange('accessScope')}
            >
              {accessScopes.map(item => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="첨부자료명 (쉼표 구분)"
              value={form.attachments}
              onChange={handleChange('attachments')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              required
              label="다운로드 필요 여부"
              value={form.downloadable}
              onChange={handleChange('downloadable')}
            >
              <MenuItem value="yes">예</MenuItem>
              <MenuItem value="no">아니오</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Divider style={{ margin: '24px 0' }} />

        <Button variant="contained" color="primary" type="submit" size="large">
          신청 등록 (Mock)
        </Button>
      </form>
    </Paper>
  );
};
