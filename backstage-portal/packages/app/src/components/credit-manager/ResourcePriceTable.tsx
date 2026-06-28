import { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import { ResourcePrice, ResourceType } from './types';

const resourceLabels: Record<ResourceType, string> = {
  cpu: 'CPU',
  gpu: 'GPU',
  memory: 'Memory',
  storage: 'Storage',
  network: 'Network',
  notebook: 'Notebook',
  training_job: 'Training Job',
  inference_api: 'Inference API',
};

export const ResourcePriceTable = ({ prices }: { prices: ResourcePrice[] }) => {
  const [localPrices, setLocalPrices] = useState(prices);

  const updatePrice = (index: number, value: string) => {
    const next = [...localPrices];
    next[index] = { ...next[index], price: Number(value) };
    setLocalPrices(next);
    // eslint-disable-next-line no-console
    console.log('Price updated (mock):', next[index]);
  };

  const toggleActive = (index: number) => {
    const next = [...localPrices];
    next[index] = { ...next[index], active: !next[index].active };
    setLocalPrices(next);
    // eslint-disable-next-line no-console
    console.log('Active toggled (mock):', next[index]);
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6" gutterBottom>
        자원별 단가 설정
      </Typography>
      <Typography color="textSecondary" variant="body2" paragraph>
        * 단가 수정은 mock action입니다. 실제 저장되지 않습니다.
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>자원 유형</TableCell>
              <TableCell>과금 단위</TableCell>
              <TableCell>단가</TableCell>
              <TableCell>설명</TableCell>
              <TableCell>적용 여부</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {localPrices.map((row, index) => (
              <TableRow key={row.resourceType}>
                <TableCell>{resourceLabels[row.resourceType]}</TableCell>
                <TableCell>{row.unit}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    size="small"
                    value={row.price}
                    onChange={e => updatePrice(index, e.target.value)}
                  />
                </TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>
                  <Switch
                    checked={row.active}
                    onChange={() => toggleActive(index)}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
