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
import { AuditLog } from './types';

interface AuditLogPanelProps {
  logs: AuditLog[];
}

const resultColor: Record<AuditLog['result'], 'default' | 'primary' | 'secondary'> = {
  성공: 'primary',
  실패: 'secondary',
  차단: 'default',
};

const riskColor: Record<AuditLog['riskLevel'], 'default' | 'primary' | 'secondary'> = {
  낮음: 'default',
  보통: 'primary',
  높음: 'secondary',
  심각: 'secondary',
};

export const AuditLogPanel = ({ logs }: AuditLogPanelProps) => {
  return (
    <Box>
      <Typography variant="h6" style={{ marginBottom: 16, fontWeight: 600 }}>
        이력 / 감사 로그
      </Typography>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>발생 시각</TableCell>
              <TableCell>사용자</TableCell>
              <TableCell>이벤트 유형</TableCell>
              <TableCell>대상</TableCell>
              <TableCell>IP</TableCell>
              <TableCell>결과</TableCell>
              <TableCell>위험도</TableCell>
              <TableCell>상세 내용</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.timestamp}</TableCell>
                <TableCell>{row.user}</TableCell>
                <TableCell>{row.eventType}</TableCell>
                <TableCell>{row.target}</TableCell>
                <TableCell>{row.ip}</TableCell>
                <TableCell>
                  <Chip label={row.result} size="small" color={resultColor[row.result]} />
                </TableCell>
                <TableCell>
                  <Chip label={row.riskLevel} size="small" color={riskColor[row.riskLevel]} />
                </TableCell>
                <TableCell>{row.detail}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
