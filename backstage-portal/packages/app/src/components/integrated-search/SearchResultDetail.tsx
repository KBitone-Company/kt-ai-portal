import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import { SearchResult } from './types';
import { SearchTypeChip } from './SearchTypeChip';
import { securityLevelLabel } from './SearchApiClient';

export const SearchResultDetail = ({ result }: { result: SearchResult }) => {
  return (
    <Paper style={{ padding: 24 }}>
      <Typography variant="h5" gutterBottom>
        {result.name}
      </Typography>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <SearchTypeChip type={result.type} />
        <Chip size="small" label={`보안등급: ${securityLevelLabel(result.securityLevel)}`} />
        <Chip size="small" label={`출처: ${result.sourceSystem}`} />
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography color="textSecondary">ID</Typography>
          <Typography>{result.id}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color="textSecondary">설명</Typography>
          <Typography>{result.description}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography color="textSecondary">소유자</Typography>
          <Typography>{result.owner}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography color="textSecondary">URL</Typography>
          <Typography>{result.url ?? '-'}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography color="textSecondary">생성일</Typography>
          <Typography>
            {result.createdAt ? new Date(result.createdAt).toLocaleDateString() : '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography color="textSecondary">수정일</Typography>
          <Typography>
            {result.updatedAt ? new Date(result.updatedAt).toLocaleDateString() : '-'}
          </Typography>
        </Grid>
      </Grid>

      <Typography variant="h6" style={{ marginTop: 16 }} gutterBottom>
        태그
      </Typography>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {result.tags.map(tag => (
          <Chip key={tag} label={tag} size="small" />
        ))}
      </div>

      <Typography variant="h6" gutterBottom>
        후속 연계 후보
      </Typography>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button size="small" variant="outlined" disabled>
          OpenMetadata 상세
        </Button>
        <Button size="small" variant="outlined" disabled>
          Project Workspace 사용 프로젝트
        </Button>
        <Button size="small" variant="outlined" disabled>
          Export Approval 반출신청
        </Button>
        <Button size="small" variant="outlined" disabled>
          K-RMF Evidence 관련 통제항목
        </Button>
      </div>
    </Paper>
  );
};
