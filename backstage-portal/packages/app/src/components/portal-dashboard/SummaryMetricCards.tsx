import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { SummaryMetrics } from './types';

interface SummaryMetricCardsProps {
  metrics: SummaryMetrics;
}

export const SummaryMetricCards = ({ metrics }: SummaryMetricCardsProps) => {
  const items = [
    { label: '등록 데이터셋', value: metrics.datasets.toLocaleString() },
    { label: 'AI 모델', value: metrics.aiModels.toLocaleString() },
    { label: '진행 중 프로젝트', value: metrics.activeProjects.toLocaleString() },
    { label: '반출/반입 대기', value: metrics.exportPending.toLocaleString() },
    { label: '크레딧 부족 프로젝트', value: metrics.creditShortageProjects.toLocaleString() },
    { label: 'K-RMF 진행률', value: `${metrics.krmfProgress}%` },
    { label: 'OpenSearch 자산', value: metrics.openSearchAssets.toLocaleString() },
    { label: 'OpenMetadata 상태', value: metrics.openMetadataStatus },
  ];

  return (
    <Grid container spacing={2}>
      {items.map(item => (
        <Grid item xs={6} sm={4} md={3} key={item.label}>
          <Card variant="outlined" style={{ height: '100%' }}>
            <CardContent>
              <Typography color="textSecondary" variant="body2">
                {item.label}
              </Typography>
              <Typography variant="h4" style={{ fontWeight: 600, marginTop: 4 }}>
                {item.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
