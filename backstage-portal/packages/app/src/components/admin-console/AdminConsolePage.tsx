import { useState } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { AdminSummaryCards } from './AdminSummaryCards';
import { UserRegistrationPanel } from './UserRegistrationPanel';
import { UserManagementPanel } from './UserManagementPanel';
import { ExternalUserManagementPanel } from './ExternalUserManagementPanel';
import { RolePermissionPanel } from './RolePermissionPanel';
import { LoginPolicyPanel } from './LoginPolicyPanel';
import { PasswordPolicyPanel } from './PasswordPolicyPanel';
import { AuditLogPanel } from './AuditLogPanel';
import { MenuManagementPanel } from './MenuManagementPanel';
import { AdminRequirementCoveragePanel } from './AdminRequirementCoveragePanel';
import { UserStatusHistoryPanel } from './UserStatusHistoryPanel';
import { mockAdminData } from './mockAdminData';
import { UserRegistration, UserStatusHistory } from './types';

interface TabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
}

const TabPanel = ({ children, value, index }: TabPanelProps) => {
  if (value !== index) return null;
  return <Box marginTop={3}>{children}</Box>;
};

export const AdminConsolePage = () => {
  const [tab, setTab] = useState(0);
  const [registrations, setRegistrations] = useState<UserRegistration[]>(mockAdminData.registrations);
  const [statusHistories, setStatusHistories] = useState<UserStatusHistory[]>(mockAdminData.statusHistories);

  const {
    summary,
    users,
    externalUsers,
    roles,
    loginPolicies,
    passwordPolicies,
    auditLogs,
    menuItems,
    requirementCoverage,
  } = mockAdminData;

  return (
    <Box padding={3}>
      <Typography variant="h4" style={{ fontWeight: 700, marginBottom: 8 }}>
        Admin Console
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" style={{ marginBottom: 24 }}>
        국방지능화플랫폼 관리자 허브 — 사용자, 권한, 정책, 메뉴, 감사로그를 관리합니다.
      </Typography>

      <AdminSummaryCards summary={summary} />

      <Box marginTop={3}>
        <Paper variant="outlined">
          <Tabs
            value={tab}
            onChange={(_, newValue) => setTab(newValue)}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="사용자 등록 신청" />
            <Tab label="사용자 관리" />
            <Tab label="외부 사용자 관리" />
            <Tab label="권한 / 역할" />
            <Tab label="로그인 정책" />
            <Tab label="비밀번호 정책" />
            <Tab label="감사 로그" />
            <Tab label="메뉴 관리" />
            <Tab label="요구사항 현황" />
          </Tabs>
        </Paper>

        <TabPanel value={tab} index={0}>
          <UserRegistrationPanel
            registrations={registrations}
            onRegistrationsChange={setRegistrations}
            onHistoriesChange={setStatusHistories}
          />
          <Box marginTop={3}>
            <UserStatusHistoryPanel histories={statusHistories} title="전체 등록 신청 이력" />
          </Box>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <UserManagementPanel users={users} histories={statusHistories} />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <ExternalUserManagementPanel externalUsers={externalUsers} />
        </TabPanel>
        <TabPanel value={tab} index={3}>
          <RolePermissionPanel roles={roles} />
        </TabPanel>
        <TabPanel value={tab} index={4}>
          <LoginPolicyPanel policies={loginPolicies} />
        </TabPanel>
        <TabPanel value={tab} index={5}>
          <PasswordPolicyPanel policies={passwordPolicies} />
        </TabPanel>
        <TabPanel value={tab} index={6}>
          <AuditLogPanel logs={auditLogs} />
        </TabPanel>
        <TabPanel value={tab} index={7}>
          <MenuManagementPanel menuItems={menuItems} />
        </TabPanel>
        <TabPanel value={tab} index={8}>
          <AdminRequirementCoveragePanel coverage={requirementCoverage} />
        </TabPanel>
      </Box>
    </Box>
  );
};
