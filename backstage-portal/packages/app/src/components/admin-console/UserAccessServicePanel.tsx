import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { AdminUser, AccessibleService, DataAccessLevel } from './types';

interface UserAccessServicePanelProps {
  user: AdminUser;
  onSave: (updated: AdminUser) => void;
}

const allServices: AccessibleService[] = [
  'Portal Dashboard',
  'Integrated Search',
  'Project Workspace',
  'Export Approval',
  'Credit Manager',
  'K-RMF Evidence',
  'Admin Console',
  'OpenMetadata',
  'OpenSearch Dashboards',
];

export const UserAccessServicePanel = ({ user, onSave }: UserAccessServicePanelProps) => {
  const [form, setForm] = useState<AdminUser>(user);

  useEffect(() => {
    setForm(user);
  }, [user]);

  const toggleService = (service: AccessibleService) => {
    const current = form.accessibleServices || [];
    const next = current.includes(service)
      ? current.filter(s => s !== service)
      : [...current, service];
    setForm({ ...form, accessibleServices: next });
  };

  const handleSave = () => {
    onSave(form);
  };

  return (
    <Box>
      <Typography variant="h6" style={{ marginBottom: 16, fontWeight: 600 }}>
        사용자 소속/역할/접속 가능 서비스 설정
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            label="소속"
            variant="outlined"
            fullWidth
            size="small"
            value={form.organization || ''}
            onChange={e => setForm({ ...form, organization: e.target.value })}
            style={{ marginBottom: 16 }}
          />
          <TextField
            label="부서"
            variant="outlined"
            fullWidth
            size="small"
            value={form.department || ''}
            onChange={e => setForm({ ...form, department: e.target.value })}
            style={{ marginBottom: 16 }}
          />
          <TextField
            label="사용자 그룹"
            variant="outlined"
            fullWidth
            size="small"
            value={form.userGroup || ''}
            onChange={e => setForm({ ...form, userGroup: e.target.value })}
            style={{ marginBottom: 16 }}
          />
          <FormControl variant="outlined" fullWidth size="small" style={{ marginBottom: 16 }}>
            <InputLabel>사용자 유형</InputLabel>
            <Select
              value={form.userType}
              onChange={e => setForm({ ...form, userType: e.target.value as AdminUser['userType'] })}
              label="사용자 유형"
            >
              <MenuItem value="내부">내부</MenuItem>
              <MenuItem value="외부">외부</MenuItem>
              <MenuItem value="수행사">수행사</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="역할"
            variant="outlined"
            fullWidth
            size="small"
            value={form.role || ''}
            onChange={e => setForm({ ...form, role: e.target.value })}
            style={{ marginBottom: 16 }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl variant="outlined" fullWidth size="small" style={{ marginBottom: 16 }}>
            <InputLabel>접근 가능 데이터 등급</InputLabel>
            <Select
              value={form.dataAccessLevel || '내부'}
              onChange={e => setForm({ ...form, dataAccessLevel: e.target.value as DataAccessLevel })}
              label="접근 가능 데이터 등급"
            >
              <MenuItem value="공개">공개</MenuItem>
              <MenuItem value="내부">내부</MenuItem>
              <MenuItem value="비밀">비밀</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="프로젝트 접근 권한"
            variant="outlined"
            fullWidth
            size="small"
            value={form.projectAccess || ''}
            onChange={e => setForm({ ...form, projectAccess: e.target.value })}
            style={{ marginBottom: 16 }}
          />
          <FormGroup row style={{ marginBottom: 16 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.canApproveExport || false}
                  onChange={e => setForm({ ...form, canApproveExport: e.target.checked })}
                />
              }
              label="반출 승인 권한"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.canManageCredit || false}
                  onChange={e => setForm({ ...form, canManageCredit: e.target.checked })}
                />
              }
              label="크레딧 관리 권한"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.canAuditKrmf || false}
                  onChange={e => setForm({ ...form, canAuditKrmf: e.target.checked })}
                />
              }
              label="K-RMF 감사 권한"
            />
          </FormGroup>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" style={{ fontWeight: 600, marginBottom: 8 }}>
            접근 가능 서비스
          </Typography>
          <FormGroup row>
            {allServices.map(service => (
              <FormControlLabel
                key={service}
                control={
                  <Checkbox
                    checked={(form.accessibleServices || []).includes(service)}
                    onChange={() => toggleService(service)}
                  />
                }
                label={service}
              />
            ))}
          </FormGroup>
        </Grid>
      </Grid>

      <Box marginTop={2}>
        <Button variant="contained" color="primary" size="small" onClick={handleSave}>
          저장 (mock)
        </Button>
      </Box>
    </Box>
  );
};
