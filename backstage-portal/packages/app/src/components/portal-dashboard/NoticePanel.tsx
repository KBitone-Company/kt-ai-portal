import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import { Notice, NoticeSeverity } from './types';

interface NoticePanelProps {
  notices: Notice[];
}

const severityColor = (severity: NoticeSeverity): 'default' | 'primary' | 'secondary' => {
  switch (severity) {
    case 'error':
      return 'secondary';
    case 'warning':
      return 'primary';
    default:
      return 'default';
  }
};

export const NoticePanel = ({ notices }: NoticePanelProps) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          공지사항
        </Typography>
        <List dense disablePadding>
          {notices.map(notice => (
            <ListItem key={notice.id} disableGutters style={{ paddingTop: 8, paddingBottom: 8, borderBottom: '1px solid #f3f4f6' }}>
              <Box width="100%" display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap">
                <Box flex={1} minWidth={200}>
                  <Typography variant="subtitle2">{notice.title}</Typography>
                </Box>
                <Box display="flex" alignItems="center" marginTop={{ xs: 1, sm: 0 }}>
                  <Chip size="small" label={notice.type} variant="outlined" style={{ marginRight: 8 }} />
                  <Chip size="small" label={notice.severity.toUpperCase()} color={severityColor(notice.severity)} />
                  <Typography variant="caption" color="textSecondary" style={{ marginLeft: 12 }}>
                    {notice.date}
                  </Typography>
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
