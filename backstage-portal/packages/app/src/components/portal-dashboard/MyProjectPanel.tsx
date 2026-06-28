import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import WorkIcon from '@material-ui/icons/Work';
import { MyProject, ProjectStatus } from './types';

interface MyProjectPanelProps {
  projects: MyProject[];
}

const statusConfig: Record<
  ProjectStatus,
  { label: string; color: 'default' | 'primary' | 'secondary' }
> = {
  requested: { label: '신청', color: 'default' },
  pending_approval: { label: '승인대기', color: 'secondary' },
  approved: { label: '승인', color: 'primary' },
  running: { label: '운영중', color: 'primary' },
  paused: { label: '일시중지', color: 'secondary' },
  closed: { label: '종료', color: 'default' },
};

export const MyProjectPanel = ({ projects }: MyProjectPanelProps) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
          <Typography variant="h6">내 프로젝트</Typography>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            component={Link}
            to="/project-workspace"
            startIcon={<WorkIcon />}
          >
            전체 보기
          </Button>
        </Box>
        {projects.map(project => {
          const status = statusConfig[project.status];
          return (
            <Box key={project.id} paddingY={1.5} borderBottom="1px solid #f3f4f6">
              <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={1}>
                <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                  {project.name}
                </Typography>
                <Chip size="small" label={status.label} color={status.color} />
              </Box>
              <Box display="flex" justifyContent="space-between" marginBottom={1}>
                <Typography variant="body2" color="textSecondary">
                  PM: {project.pm}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  종료: {project.endDate}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Box flex={1} marginRight={1}>
                  <LinearProgress variant="determinate" value={project.resourceUsage} />
                </Box>
                <Typography variant="caption" color="textSecondary">
                  {project.resourceUsage}%
                </Typography>
              </Box>
            </Box>
          );
        })}
      </CardContent>
    </Card>
  );
};
