import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { ProjectCreditSummary } from './ProjectCreditSummary';
import { CreditBalanceCards } from './CreditBalanceCards';
import { CreditChargeHistory } from './CreditChargeHistory';
import { CreditUsageHistory } from './CreditUsageHistory';
import { ResourcePriceTable } from './ResourcePriceTable';
import { ResourceAvailabilityPanel } from './ResourceAvailabilityPanel';
import { CreditAlertPanel } from './CreditAlertPanel';
import {
  mockProjectCredits,
  mockChargeHistory,
  mockUsageHistory,
  mockResourcePrices,
  mockCreditAlerts,
} from './mockCredits';

export const CreditManagerPage = () => {
  const [selected, setSelected] = useState(mockProjectCredits[0]);

  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>
        Credit Manager
      </Typography>
      <Typography color="textSecondary" paragraph>
        프로젝트별 크레딧 관리 PoC (mock data 기반)
      </Typography>

      <CreditBalanceCards credits={mockProjectCredits} />
      <CreditAlertPanel alerts={mockCreditAlerts} />

      <Box marginTop={3}>
        <ProjectCreditSummary
          credits={mockProjectCredits}
          selectedId={selected.projectId}
          onSelect={setSelected}
        />
      </Box>

      <Box marginTop={3}>
        <ResourceAvailabilityPanel credit={selected} />
      </Box>

      <Box marginTop={3}>
        <CreditChargeHistory history={mockChargeHistory} />
      </Box>

      <Box marginTop={3}>
        <CreditUsageHistory history={mockUsageHistory} />
      </Box>

      <Box marginTop={3}>
        <ResourcePriceTable prices={mockResourcePrices} />
      </Box>
    </Box>
  );
};
