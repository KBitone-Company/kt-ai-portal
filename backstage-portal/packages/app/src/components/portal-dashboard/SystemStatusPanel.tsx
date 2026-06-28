import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import { SystemStatusItem, SystemStatus } from './types';

interface SystemStatusPanelProps {
  systems: SystemStatusItem[];
}

const statusColor = (status: SystemStatus): 'default' | 'primary' | 'secondary' => {
  switch (status) {
    case '정상':
      return 'primary';
    case '점검':
      return 'default';
    case '장애':
    case '오프라인':
      return 'secondary';
    case '지연':
      return 'default';
    default:
      return 'default';
  }
};

export const SystemStatusPanel = ({ systems }: SystemStatusPanelProps) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          시스템 상태
        </Typography>
        <Box display="flex" flexWrap="wrap">
          {systems.map(system => (
            <Box key={system.name} marginRight={1} marginBottom={1}>
              <Chip
                size="small"
                label={`${system.name}: ${system.status}`}
                color={statusColor(system.status)}
                variant="outlined"
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
