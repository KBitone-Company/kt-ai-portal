
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import { Project } from './types';
import { ProjectStatusChip } from './ProjectStatusChip';
import { ResourceQuotaCard } from './ResourceQuotaCard';

const roleLabel: Record<string, string> = {
  PM: 'PM',
  Developer: '개발자',
  Analyst: '분석가',
  DataManager: '데이터 관리자',
  SecurityReviewer: '보안 검토자',
  ExternalUser: '외부 사용자',
};

export const ProjectDetail = ({ project }: { project: Project }) => {
  return (
    <Paper style={{ padding: 24 }}>
      <Typography variant="h5" gutterBottom>
        {project.name}
      </Typography>

      <Grid container spacing={2} style={{ marginBottom: 16 }}>
        <Grid item xs={12} sm={6}>
          <Typography color="textSecondary">프로젝트 ID</Typography>
          <Typography>{project.id}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography color="textSecondary">상태</Typography>
          <ProjectStatusChip status={project.status} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography color="textSecondary">보안등급</Typography>
          <Typography>{project.securityLevel}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography color="textSecondary">소유 조직</Typography>
          <Typography>{project.ownerOrganization}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography color="textSecondary">PM</Typography>
          <Typography>
            {project.pm.name} ({project.pm.userId})
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography color="textSecondary">기간</Typography>
          <Typography>
            {project.startDate} ~ {project.endDate}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography color="textSecondary">워크스페이스 상태</Typography>
          <Chip size="small" label={project.workspaceStatus} />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>
        설명
      </Typography>
      <Typography paragraph>{project.description}</Typography>

      <Typography variant="h6" gutterBottom>
        목적
      </Typography>
      <Typography paragraph>{project.purpose}</Typography>

      <Divider style={{ margin: '16px 0' }} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            참여자
          </Typography>
          <List dense>
            {project.members.map(member => (
              <ListItem key={member.userId}>
                <ListItemText
                  primary={`${member.name} (${member.userId})`}
                  secondary={`${member.organization} · ${roleLabel[member.role] ?? member.role}`}
                />
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid item xs={12} md={6}>
          <ResourceQuotaCard quota={project.quota} />
        </Grid>
      </Grid>

      <Divider style={{ margin: '16px 0' }} />

      <Typography variant="h6" gutterBottom>
        사용 데이터셋
      </Typography>
      {project.datasets.length === 0 ? (
        <Typography color="textSecondary">등록된 데이터셋이 없습니다.</Typography>
      ) : (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          {project.datasets.map(dataset => (
            <Chip key={dataset} label={dataset} size="small" />
          ))}
        </div>
      )}

      <Typography variant="h6" gutterBottom>
        사용 AI 모델
      </Typography>
      {project.models.length === 0 ? (
        <Typography color="textSecondary">등록된 모델이 없습니다.</Typography>
      ) : (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          {project.models.map(model => (
            <Chip key={model} label={model} size="small" />
          ))}
        </div>
      )}

      <Typography variant="h6" gutterBottom>
        활동 로그
      </Typography>
      <List dense>
        {project.activityLog.map((log, index) => (
          <ListItem key={index}>
            <ListItemText primary={log} />
          </ListItem>
        ))}
      </List>

      <Typography variant="h6" gutterBottom>
        승인 이력
      </Typography>
      <List dense>
        {project.approvalHistory.map((history, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${history.action.toUpperCase()} - ${history.actor}`}
              secondary={`${history.comment} (${new Date(history.timestamp).toLocaleString()})`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
