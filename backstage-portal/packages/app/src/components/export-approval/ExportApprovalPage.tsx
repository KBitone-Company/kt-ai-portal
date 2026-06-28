import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { ExportRequestList } from './ExportRequestList';
import { ExportRequestDetail } from './ExportRequestDetail';
import { ExportRequestForm } from './ExportRequestForm';
import { mockExportRequests } from './mockExportRequests';

export const ExportApprovalPage = () => {
  const [selectedRequest, setSelectedRequest] = useState(mockExportRequests[0]);
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>
        Export Approval
      </Typography>
      <Typography color="textSecondary" paragraph>
        반출/반입 관리 PoC (mock data 기반)
      </Typography>

      <Tabs
        value={tabIndex}
        onChange={(_, value) => setTabIndex(value)}
        indicatorColor="primary"
        textColor="primary"
        style={{ marginBottom: 16 }}
      >
        <Tab label="신청 목록" />
        <Tab label="신청 등록" />
      </Tabs>

      {tabIndex === 0 && (
        <Box>
          <ExportRequestList
            requests={mockExportRequests}
            selectedId={selectedRequest.id}
            onSelect={setSelectedRequest}
          />
          <Box marginTop={3}>
            <ExportRequestDetail request={selectedRequest} />
          </Box>
        </Box>
      )}

      {tabIndex === 1 && <ExportRequestForm />}
    </Box>
  );
};
