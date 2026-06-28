import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { KrmfProgress, Severity } from './types';

interface KrmfProgressPanelProps {
  progress: KrmfProgress;
}

const severityColor = (severity: Severity): string => {
  switch (severity) {
    case 'critical':
      return '#dc2626';
    case 'high':
      return '#d97706';
    case 'medium':
      return '#2563eb';
    default:
      return '#6b7280';
  }
};

export const KrmfProgressPanel = ({ progress }: KrmfProgressPanelProps) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
          <Typography variant="h6">K-RMF 증적 진행</Typography>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            component={Link}
            to="/krmf-evidence"
            startIcon={<VerifiedUserIcon />}
          >
            증적 관리
          </Button>
        </Box>
        <Box marginBottom={2}>
          <Box display="flex" justifyContent="space-between" marginBottom={0.5}>
            <Typography variant="body2" color="textSecondary">
              전체 진행률
            </Typography>
            <Typography variant="body2" style={{ fontWeight: 600 }}>
              {progress.progressRate}%
            </Typography>
          </Box>
          <LinearProgress variant="determinate" value={progress.progressRate} />
        </Box>
        <Box display="flex" justifyContent="space-between" marginBottom={2}>
          <Box textAlign="center">
            <Typography variant="h6">{progress.totalControls}</Typography>
            <Typography variant="caption" color="textSecondary">
              통제항목
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h6">{progress.submitted}</Typography>
            <Typography variant="caption" color="textSecondary">
              제출
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h6">{progress.approved}</Typography>
            <Typography variant="caption" color="textSecondary">
              승인
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h6" style={{ color: '#dc2626' }}>
              {progress.weakPoints}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              취약점
            </Typography>
          </Box>
        </Box>
        {progress.highRiskIssues.length > 0 && (
          <Box>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              고위험 이슈
            </Typography>
            {progress.highRiskIssues.map(issue => (
              <Typography
                key={issue.id}
                variant="body2"
                style={{ color: severityColor(issue.severity), marginBottom: 4 }}
              >
                · [{issue.severity.toUpperCase()}] {issue.title}
              </Typography>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
