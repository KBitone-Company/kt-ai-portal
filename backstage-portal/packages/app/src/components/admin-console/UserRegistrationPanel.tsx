import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { UserRegistration } from './types';

interface UserRegistrationPanelProps {
  registrations: UserRegistration[];
}

const statusColor: Record<UserRegistration['status'], 'default' | 'primary' | 'secondary'> = {
  신청: 'default',
  본인확인완료: 'primary',
  검토중: 'secondary',
  승인: 'primary',
  반려: 'secondary',
};

export const UserRegistrationPanel = ({ registrations }: UserRegistrationPanelProps) => {
  return (
    <Box>
      <Typography variant="h6" style={{ marginBottom: 16, fontWeight: 600 }}>
        사용자 등록 신청
      </Typography>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>신청자명</TableCell>
              <TableCell>소속</TableCell>
              <TableCell>이메일</TableCell>
              <TableCell>사용자 유형</TableCell>
              <TableCell>신청 사유</TableCell>
              <TableCell>본인확인</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>신청일</TableCell>
              <TableCell align="center">액션</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registrations.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.organization}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.userType}</TableCell>
                <TableCell>{row.reason}</TableCell>
                <TableCell>{row.identityVerified ? '완료' : '대기'}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    size="small"
                    color={statusColor[row.status]}
                  />
                </TableCell>
                <TableCell>{row.appliedAt}</TableCell>
                <TableCell align="center">
                  <Button size="small" variant="outlined" color="primary" disabled={row.status === '승인' || row.status === '반려'} style={{ marginRight: 8 }}>
                    승인
                  </Button>
                  <Button size="small" variant="outlined" color="secondary" disabled={row.status === '승인' || row.status === '반려'}>
                    반려
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
