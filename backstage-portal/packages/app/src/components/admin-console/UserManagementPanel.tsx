import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { AdminUser } from './types';

interface UserManagementPanelProps {
  users: AdminUser[];
}

const statusColor: Record<AdminUser['accountStatus'], 'default' | 'primary' | 'secondary'> = {
  활성: 'primary',
  잠금: 'secondary',
  비활성: 'default',
  만료예정: 'secondary',
};

export const UserManagementPanel = ({ users }: UserManagementPanelProps) => {
  return (
    <Box>
      <Typography variant="h6" style={{ marginBottom: 16, fontWeight: 600 }}>
        사용자 관리
      </Typography>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>사용자명</TableCell>
              <TableCell>계정 ID</TableCell>
              <TableCell>이메일</TableCell>
              <TableCell>소속</TableCell>
              <TableCell>역할</TableCell>
              <TableCell>유형</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>잠금</TableCell>
              <TableCell>마지막 로그인</TableCell>
              <TableCell>접근 가능 서비스</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.accountId}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.organization}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.userType}</TableCell>
                <TableCell>
                  <Chip label={row.accountStatus} size="small" color={statusColor[row.accountStatus]} />
                </TableCell>
                <TableCell>{row.locked ? '예' : '아니오'}</TableCell>
                <TableCell>{row.lastLoginAt}</TableCell>
                <TableCell>{row.accessibleServices.join(', ')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
