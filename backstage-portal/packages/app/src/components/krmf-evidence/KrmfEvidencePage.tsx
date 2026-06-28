import { useState, useMemo } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {
  mockControlItems,
  mockEvidenceList,
  mockRiskIssues,
  mockExternalSubmissions,
} from './mockKrmfEvidence';
import { KrmfDashboard } from './KrmfDashboard';
import { ControlItemList } from './ControlItemList';
import { ControlItemDetail } from './ControlItemDetail';
import { EvidenceList } from './EvidenceList';
import { RiskIssueList } from './RiskIssueList';
import { ExternalSubmissionList } from './ExternalSubmissionList';
import { ControlItem, ControlArea } from './types';

const areaLabels: Record<ControlArea, string> = {
  access_control: '접근통제',
  account_management: '계정관리',
  log_management: '로그관리',
  encryption: '암호화',
  network_security: '네트워크 보안',
  vulnerability_management: '취약점 관리',
  data_protection: '데이터 보호',
  backup_recovery: '백업/복구',
  change_management: '변경관리',
  security_audit: '보안감사',
};

export const KrmfEvidencePage = () => {
  const [tab, setTab] = useState(0);
  const [selectedControl, setSelectedControl] = useState<ControlItem | undefined>(
    mockControlItems[0],
  );
  const [areaFilter, setAreaFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredControls = useMemo(() => {
    return mockControlItems.filter(control => {
      const matchesArea = areaFilter === 'all' || control.area === areaFilter;
      const matchesStatus =
        statusFilter === 'all' || control.checkStatus === statusFilter;
      const matchesSearch =
        search.trim() === '' ||
        control.name.includes(search) ||
        control.id.includes(search) ||
        control.owner.includes(search);
      return matchesArea && matchesStatus && matchesSearch;
    });
  }, [areaFilter, statusFilter, search]);

  return (
    <div style={{ padding: 24 }}>
      <Typography variant="h4" gutterBottom>
        K-RMF 증빙관리
      </Typography>

      <Paper style={{ marginBottom: 24 }}>
        <Tabs
          value={tab}
          onChange={(_, value) => setTab(value)}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="대시보드" />
          <Tab label="통제항목" />
          <Tab label="증빙자료" />
          <Tab label="미흡사항" />
          <Tab label="타 수행사 자료" />
        </Tabs>
      </Paper>

      {tab === 0 && (
        <KrmfDashboard
          controls={mockControlItems}
          evidences={mockEvidenceList}
          issues={mockRiskIssues}
        />
      )}

      {tab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper style={{ padding: 16, marginBottom: 16 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="검색"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    select
                    label="통제영역"
                    value={areaFilter}
                    onChange={e => setAreaFilter(e.target.value)}
                    variant="outlined"
                    size="small"
                  >
                    <MenuItem value="all">전체</MenuItem>
                    {Object.entries(areaLabels).map(([value, label]) => (
                      <MenuItem key={value} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    select
                    label="점검 상태"
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    variant="outlined"
                    size="small"
                  >
                    <MenuItem value="all">전체</MenuItem>
                    <MenuItem value="not_checked">미점검</MenuItem>
                    <MenuItem value="preparing">준비중</MenuItem>
                    <MenuItem value="checking">점검중</MenuItem>
                    <MenuItem value="compliant">적합</MenuItem>
                    <MenuItem value="non_compliant">미흡</MenuItem>
                    <MenuItem value="remediating">보완중</MenuItem>
                    <MenuItem value="completed">완료</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={7}>
            <ControlItemList
              controls={filteredControls}
              selectedId={selectedControl?.id}
              onSelect={setSelectedControl}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            {selectedControl ? (
              <ControlItemDetail control={selectedControl} />
            ) : (
              <Paper style={{ padding: 24 }}>
                <Typography color="textSecondary">
                  통제항목을 선택하면 상세 정보가 표시됩니다.
                </Typography>
              </Paper>
            )}
          </Grid>
        </Grid>
      )}

      {tab === 2 && (
        <EvidenceList evidences={mockEvidenceList} controls={mockControlItems} />
      )}

      {tab === 3 && (
        <RiskIssueList issues={mockRiskIssues} controls={mockControlItems} />
      )}

      {tab === 4 && (
        <ExternalSubmissionList
          submissions={mockExternalSubmissions}
          controls={mockControlItems}
        />
      )}
    </div>
  );
};
