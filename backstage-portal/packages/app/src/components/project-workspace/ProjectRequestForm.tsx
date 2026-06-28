import { useState, FormEvent, ChangeEvent } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import { SecurityLevel } from './types';

const securityLevels: SecurityLevel[] = ['공개', '내부', '비밀'];

export const ProjectRequestForm = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    purpose: '',
    ownerOrganization: '',
    pmUserId: '',
    members: '',
    securityLevel: '내부' as SecurityLevel,
    datasets: '',
    cpuCores: '',
    gpuCount: '',
    memoryGiB: '',
    storageGiB: '',
    startDate: '',
    endDate: '',
  });

  const handleChange = (field: keyof typeof form) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm(prev => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log('Project request submitted (mock):', form);
    alert(
      `[Mock] 프로젝트 생성 신청이 접수되었습니다.\n\n프로젝트명: ${form.name}\n소유 조직: ${form.ownerOrganization}\n보안등급: ${form.securityLevel}\n\n실제 저장은 6단계 범위外입니다.`,
    );
  };

  return (
    <Paper style={{ padding: 24 }}>
      <Typography variant="h5" gutterBottom>
        프로젝트 생성 신청
      </Typography>
      <Typography color="textSecondary" paragraph>
        * 이 화면은 mock action입니다. 저장 버튼 클릭 시 실제 저장되지 않습니다.
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="프로젝트명"
              value={form.name}
              onChange={handleChange('name')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="소유 조직"
              value={form.ownerOrganization}
              onChange={handleChange('ownerOrganization')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              multiline
              rows={3}
              label="설명"
              value={form.description}
              onChange={handleChange('description')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              multiline
              rows={2}
              label="목적"
              value={form.purpose}
              onChange={handleChange('purpose')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="PM 사용자 ID"
              value={form.pmUserId}
              onChange={handleChange('pmUserId')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              required
              label="보안등급"
              value={form.securityLevel}
              onChange={handleChange('securityLevel')}
            >
              {securityLevels.map(level => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="참여자 (쉼표로 구분)"
              placeholder="user1:Developer, user2:Analyst"
              value={form.members}
              onChange={handleChange('members')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="사용 예정 데이터셋 (쉼표로 구분)"
              value={form.datasets}
              onChange={handleChange('datasets')}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              필요 리소스
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="CPU Core"
              type="number"
              value={form.cpuCores}
              onChange={handleChange('cpuCores')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="GPU 수량"
              type="number"
              value={form.gpuCount}
              onChange={handleChange('gpuCount')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Memory (GiB)"
              type="number"
              value={form.memoryGiB}
              onChange={handleChange('memoryGiB')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Storage (GiB)"
              type="number"
              value={form.storageGiB}
              onChange={handleChange('storageGiB')}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="시작일"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={form.startDate}
              onChange={handleChange('startDate')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="종료예정일"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={form.endDate}
              onChange={handleChange('endDate')}
            />
          </Grid>
        </Grid>

        <Divider style={{ margin: '24px 0' }} />

        <Button variant="contained" color="primary" type="submit" size="large">
          신청 (Mock)
        </Button>
      </form>
    </Paper>
  );
};
