import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import SearchIcon from '@material-ui/icons/Search';
import WorkIcon from '@material-ui/icons/Work';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import StorageIcon from '@material-ui/icons/Storage';
import DashboardIcon from '@material-ui/icons/Dashboard';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { QuickLink } from './types';

interface QuickLinkCardsProps {
  links: QuickLink[];
}

const iconMap: Record<string, React.ReactNode> = {
  'ql-search': <SearchIcon />,
  'ql-project': <WorkIcon />,
  'ql-export': <SwapHorizIcon />,
  'ql-credit': <AccountBalanceIcon />,
  'ql-krmf': <VerifiedUserIcon />,
  'ql-openmetadata': <StorageIcon />,
  'ql-opensearch': <DashboardIcon />,
  'ql-keycloak': <VpnKeyIcon />,
  'ql-admin': <SupervisorAccountIcon />,
};

export const QuickLinkCards = ({ links }: QuickLinkCardsProps) => {
  return (
    <Grid container spacing={2}>
      {links.map(link => (
        <Grid item xs={6} key={link.id}>
          <Card
            variant="outlined"
            style={{ height: '100%' }}
          >
            <CardContent style={{ padding: 16 }}>
              {link.type === 'internal' ? (
                <Link to={link.target} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <BoxContent link={link} />
                </Link>
              ) : (
                <a
                  href={link.target}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <BoxContent link={link} />
                </a>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

const BoxContent = ({ link }: { link: QuickLink }) => (
  <>
    <Box display="flex" alignItems="center" marginBottom={1}>
      <Box marginRight={1} color="primary.main">
        {iconMap[link.id]}
      </Box>
      <Typography variant="subtitle2" style={{ fontWeight: 600, flex: 1 }}>
        {link.title}
      </Typography>
      {link.type === 'external' && <OpenInNewIcon fontSize="small" color="action" />}
    </Box>
    <Typography variant="caption" color="textSecondary">
      {link.description}
    </Typography>
  </>
);
