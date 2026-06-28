import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { DashboardHero } from './DashboardHero';
import { DashboardSearchBox } from './DashboardSearchBox';
import { SummaryMetricCards } from './SummaryMetricCards';
import { NoticePanel } from './NoticePanel';
import { RecentAssetsPanel } from './RecentAssetsPanel';
import { MyProjectPanel } from './MyProjectPanel';
import { ExportPendingPanel } from './ExportPendingPanel';
import { CreditSummaryPanel } from './CreditSummaryPanel';
import { KrmfProgressPanel } from './KrmfProgressPanel';
import { SystemStatusPanel } from './SystemStatusPanel';
import { QuickLinkCards } from './QuickLinkCards';
import { mockDashboardData } from './mockDashboardData';

export const PortalDashboardPage = () => {
  const {
    currentUser,
    summaryMetrics,
    notices,
    recentAssets,
    myProjects,
    exportPending,
    creditSummary,
    krmfProgress,
    systemStatus,
    quickLinks,
  } = mockDashboardData;

  return (
    <Box padding={3}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DashboardHero fallbackUser={currentUser} />
        </Grid>
        <Grid item xs={12}>
          <DashboardSearchBox />
        </Grid>

        <Grid item xs={12} lg={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SummaryMetricCards metrics={summaryMetrics} />
            </Grid>
            <Grid item xs={12}>
              <NoticePanel notices={notices} />
            </Grid>
            <Grid item xs={12}>
              <RecentAssetsPanel assets={recentAssets} />
            </Grid>
            <Grid item xs={12} md={6}>
              <MyProjectPanel projects={myProjects} />
            </Grid>
            <Grid item xs={12} md={6}>
              <ExportPendingPanel items={exportPending} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CreditSummaryPanel summary={creditSummary} />
            </Grid>
            <Grid item xs={12}>
              <KrmfProgressPanel progress={krmfProgress} />
            </Grid>
            <Grid item xs={12}>
              <SystemStatusPanel systems={systemStatus} />
            </Grid>
            <Grid item xs={12}>
              <QuickLinkCards links={quickLinks} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
