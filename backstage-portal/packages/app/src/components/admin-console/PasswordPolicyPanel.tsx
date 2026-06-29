import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { PasswordPolicy } from './types';

interface PasswordPolicyPanelProps {
  policies: PasswordPolicy[];
}

export const PasswordPolicyPanel = ({ policies }: PasswordPolicyPanelProps) => {
  return (
    <Box>
      <Typography variant="h6" style={{ marginBottom: 16, fontWeight: 600 }}>
        비밀번호 정책 관리
      </Typography>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>정책명</TableCell>
              <TableCell align="right">최소 길이</TableCell>
              <TableCell>복잡도</TableCell>
              <TableCell align="right">변경 주기(일)</TableCell>
              <TableCell>만료 후 잠금</TableCell>
              <TableCell align="right">유예기간(일)</TableCell>
              <TableCell align="right">재사용 제한</TableCell>
              <TableCell>적용 대상</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {policies.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.minLength}</TableCell>
                <TableCell>{row.complexity}</TableCell>
                <TableCell align="right">{row.changeCycleDays}</TableCell>
                <TableCell>{row.expiredLockAction}</TableCell>
                <TableCell align="right">{row.gracePeriodDays}</TableCell>
                <TableCell align="right">{row.reuseLimit}</TableCell>
                <TableCell>{row.target}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
