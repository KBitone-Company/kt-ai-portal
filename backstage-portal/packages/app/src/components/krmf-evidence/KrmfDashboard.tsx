import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { ControlItem, Evidence, RiskIssue, ControlArea } from './types';
import { ProgressSummaryCards } from './ProgressSummaryCards';

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

export const KrmfDashboard = ({
  controls,
  evidences,
  issues,
}: {
  controls: ControlItem[];
  evidences: Evidence[];
  issues: RiskIssue[];
}) => {
  const areaProgress = Object.entries(areaLabels).map(([area, label]) => {
    const areaControls = controls.filter(c => c.area === area);
    const total = areaControls.length;
    const completed = areaControls.filter(
      c => c.checkStatus === 'compliant' || c.checkStatus === 'completed',
    ).length;
    return {
      area,
      label,
      total,
      completed,
      progress: total ? Math.round((completed / total) * 100) : 0,
    };
  });

  const recentIssues = [...issues]
    .sort((a, b) => new Date(b.foundAt).getTime() - new Date(a.foundAt).getTime())
    .slice(0, 5);

  return (
    <div>
      <ProgressSummaryCards controls={controls} evidences={evidences} issues={issues} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 24 }}>
            <Typography variant="h6" gutterBottom>
              영역별 진척률
            </Typography>
            {areaProgress.map(item => (
              <div key={item.area} style={{ marginBottom: 16 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 4,
                  }}
                >
                  <Typography variant="body2">
                    {item.label} ({item.completed}/{item.total})
                  </Typography>
                  <Typography variant="body2">{item.progress}%</Typography>
                </div>
                <LinearProgress
                  variant="determinate"
                  value={item.progress}
                />
              </div>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 24 }}>
            <Typography variant="h6" gutterBottom>
              최근 미흡사항
            </Typography>
            {recentIssues.length === 0 && (
              <Typography color="textSecondary">최근 미흡사항이 없습니다.</Typography>
            )}
            {recentIssues.map(issue => (
              <div key={issue.id} style={{ marginBottom: 12 }}>
                <Typography variant="subtitle2">{issue.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {issue.owner} · {new Date(issue.foundAt).toLocaleDateString()} · {issue.status}
                </Typography>
              </div>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
