import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import { ControlItem, ControlArea } from './types';
import { ControlStatusChip } from './ControlStatusChip';

const areaLabels: Record<ControlArea, string> = {
  access_control: '접근통제',
  account_management: '계정관리',
  log_management: '로그관리',
  encryption: '암호화',
  network_security: '네트워크 보안',
  vulnerability_management: '취약점 관리',
  data_protection: '데이터 보호',
  backup_recovery: '백업/복구',
  change_management: '변경관리',
  security_audit: '보안감사',
};

export const ControlItemList = ({
  controls,
  selectedId,
  onSelect,
}: {
  controls: ControlItem[];
  selectedId?: string;
  onSelect: (control: ControlItem) => void;
}) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>통제영역</TableCell>
            <TableCell>통제항목명</TableCell>
            <TableCell>적용 여부</TableCell>
            <TableCell>담당자</TableCell>
            <TableCell>조직</TableCell>
            <TableCell>중요도</TableCell>
            <TableCell>점검 상태</TableCell>
            <TableCell>증빙</TableCell>
            <TableCell>미흡</TableCell>
            <TableCell>최종 점검일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {controls.map(control => (
            <TableRow
              key={control.id}
              hover
              selected={selectedId === control.id}
              onClick={() => onSelect(control)}
              style={{ cursor: 'pointer' }}
            >
              <TableCell>{control.id}</TableCell>
              <TableCell>{areaLabels[control.area]}</TableCell>
              <TableCell>{control.name}</TableCell>
              <TableCell>
                <Chip size="small" label={control.applied ? '적용' : '미적용'} />
              </TableCell>
              <TableCell>{control.owner}</TableCell>
              <TableCell>{control.ownerOrg}</TableCell>
              <TableCell>{control.importance}</TableCell>
              <TableCell>
                <ControlStatusChip status={control.checkStatus} />
              </TableCell>
              <TableCell>{control.evidenceCount}</TableCell>
              <TableCell>{control.issueCount}</TableCell>
              <TableCell>
                {control.lastCheckedAt
                  ? new Date(control.lastCheckedAt).toLocaleDateString()
                  : '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
