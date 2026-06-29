import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { AdminRole } from './types';

interface RolePermissionPanelProps {
  roles: AdminRole[];
}

export const RolePermissionPanel = ({ roles }: RolePermissionPanelProps) => {
  return (
    <Box>
      <Typography variant="h6" style={{ marginBottom: 16, fontWeight: 600 }}>
        권한 / 역할 관리
      </Typography>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>역할명</TableCell>
              <TableCell>설명</TableCell>
              <TableCell>적용 대상</TableCell>
              <TableCell>접근 가능 메뉴</TableCell>
              <TableCell>데이터 등급</TableCell>
              <TableCell>프로젝트 권한</TableCell>
              <TableCell>승인 권한</TableCell>
              <TableCell align="right">사용자 수</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map(row => (
              <TableRow key={row.id}>
                <TableCell style={{ fontWeight: 600 }}>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.target}</TableCell>
                <TableCell>{row.accessibleMenus.join(', ')}</TableCell>
                <TableCell>{row.dataAccessLevel}</TableCell>
                <TableCell>{row.projectPermission}</TableCell>
                <TableCell>{row.approvalAuthority.join(', ') || '-'}</TableCell>
                <TableCell align="right">{row.userCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
