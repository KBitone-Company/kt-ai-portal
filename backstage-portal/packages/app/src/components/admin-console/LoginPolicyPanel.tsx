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
import { LoginPolicy } from './types';

interface LoginPolicyPanelProps {
  policies: LoginPolicy[];
}

export const LoginPolicyPanel = ({ policies }: LoginPolicyPanelProps) => {
  return (
    <Box>
      <Typography variant="h6" style={{ marginBottom: 16, fontWeight: 600 }}>
        로그인 정책 관리
      </Typography>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>정책명</TableCell>
              <TableCell>적용 대상</TableCell>
              <TableCell>로그인 허용 기간</TableCell>
              <TableCell align="right">실패 허용 횟수</TableCell>
              <TableCell>중복 로그인</TableCell>
              <TableCell>제한 해제 방식</TableCell>
              <TableCell>사용 여부</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {policies.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.target}</TableCell>
                <TableCell>{row.allowedPeriod}</TableCell>
                <TableCell align="right">{row.maxFailedAttempts}</TableCell>
                <TableCell>{row.allowDuplicateLogin ? '허용' : '불가'}</TableCell>
                <TableCell>{row.unlockMethod}</TableCell>
                <TableCell>
                  <Chip
                    label={row.enabled ? '사용' : '미사용'}
                    size="small"
                    color={row.enabled ? 'primary' : 'default'}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
