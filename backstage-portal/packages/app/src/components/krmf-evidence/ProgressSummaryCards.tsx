import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ControlItem, Evidence, RiskIssue } from './types';

export const ProgressSummaryCards = ({
  controls,
  evidences,
  issues,
}: {
  controls: ControlItem[];
  evidences: Evidence[];
  issues: RiskIssue[];
}) => {
  const total = controls.length;
  const applied = controls.filter(c => c.applied).length;
  const approvedEvidence = evidences.filter(e => e.status === 'approved').length;
  const submittedEvidence = evidences.filter(e => e.status !== 'not_submitted').length;
  const openIssues = issues.filter(i => i.status !== 'closed').length;
  const remediating = controls.filter(c => c.checkStatus === 'remediating').length;
  const completed = controls.filter(c => c.checkStatus === 'completed').length;
  const progress = total ? Math.round((completed / total) * 100) : 0;
  const highRiskIssues = issues.filter(i => i.severity === 'high' || i.severity === 'critical').length;

  const items = [
    { label: '전체 통제항목', value: total },
    { label: '적용 대상', value: applied },
    { label: '증빙 제출 완료', value: submittedEvidence },
    { label: '증빙 승인 완료', value: approvedEvidence },
    { label: '미흡사항', value: openIssues },
    { label: '보완 진행', value: remediating },
    { label: '전체 진척률', value: `${progress}%` },
    { label: '고위험 이슈', value: highRiskIssues },
  ];

  return (
    <Grid container spacing={2} style={{ marginBottom: 24 }}>
      {items.map(item => (
        <Grid item xs={12} sm={6} md={3} key={item.label}>
          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" variant="body2">
                {item.label}
              </Typography>
              <Typography variant="h5">{item.value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
