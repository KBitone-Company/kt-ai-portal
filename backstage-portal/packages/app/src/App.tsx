import { Route, Routes, Outlet } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import SearchIcon from '@material-ui/icons/Search';
import { ProjectWorkspacePage } from './components/project-workspace';
import { ExportApprovalPage } from './components/export-approval';
import { CreditManagerPage } from './components/credit-manager';
import { KrmfEvidencePage } from './components/krmf-evidence';
import { IntegratedSearchPage } from './components/integrated-search';
import { PortalDashboardPage } from './components/portal-dashboard';
import { createApp } from '@backstage/app-defaults';
import { AppRouter, OAuth2 } from '@backstage/core-app-api';
import {
  Sidebar,
  SidebarGroup,
  SidebarItem,
  SidebarDivider,
  SidebarSpace,
  SidebarPage,
  Content,
} from '@backstage/core-components';
import {
  AlertDisplay,
  OAuthRequestDialog,
  SignInPage,
} from '@backstage/core-components';
import {
  createApiFactory,
  configApiRef,
  createApiRef,
  discoveryApiRef,
  oauthRequestApiRef,
  OAuthApi,
  OpenIdConnectApi,
  ProfileInfoApi,
  BackstageIdentityApi,
  SessionApi,
} from '@backstage/core-plugin-api';

export const oidcAuthApiRef = createApiRef<
  OAuthApi &
    OpenIdConnectApi &
    ProfileInfoApi &
    BackstageIdentityApi &
    SessionApi
>({
  id: 'auth.oidc',
});

const oidcProvider = {
  id: 'oidc-auth-provider',
  title: 'Keycloak',
  message: 'Sign in using Keycloak',
  apiRef: oidcAuthApiRef,
};

const app = createApp({
  apis: [
    createApiFactory({
      api: oidcAuthApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
        oauthRequestApi: oauthRequestApiRef,
        configApi: configApiRef,
      },
      factory: ({ discoveryApi, oauthRequestApi }) =>
        OAuth2.create({
          discoveryApi,
          oauthRequestApi,
          provider: {
            id: 'oidc',
            title: 'Keycloak',
            icon: () => null,
          },
          environment: 'development',
          defaultScopes: ['openid', 'profile', 'email'],
        }),
    }),
  ],
  components: {
    SignInPage: props => (
      <SignInPage {...props} providers={['guest', oidcProvider]} />
    ),
  },
});

const AppLayout = () => (
  <SidebarPage>
    <Sidebar>
      <SidebarGroup label="Menu" icon={<HomeIcon />}>
        <SidebarItem icon={HomeIcon} to="/" text="Home" />
        <SidebarItem icon={WorkIcon} to="/project-workspace" text="Project Workspace" />
        <SidebarItem icon={SwapHorizIcon} to="/export-approval" text="Export Approval" />
        <SidebarItem icon={AccountBalanceIcon} to="/credit-manager" text="Credit Manager" />
        <SidebarItem icon={VerifiedUserIcon} to="/krmf-evidence" text="K-RMF Evidence" />
        <SidebarItem icon={SearchIcon} to="/integrated-search" text="Integrated Search" />
      </SidebarGroup>
      <SidebarSpace />
      <SidebarDivider />
    </Sidebar>
    <Content>
      <Outlet />
    </Content>
  </SidebarPage>
);

const App = () => (
  <>
    <AlertDisplay />
    <OAuthRequestDialog />
    <AppRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<PortalDashboardPage />} />
          <Route path="/project-workspace" element={<ProjectWorkspacePage />} />
          <Route path="/export-approval" element={<ExportApprovalPage />} />
          <Route path="/credit-manager" element={<CreditManagerPage />} />
          <Route path="/krmf-evidence" element={<KrmfEvidencePage />} />
          <Route path="/integrated-search" element={<IntegratedSearchPage />} />
        </Route>
      </Routes>
    </AppRouter>
  </>
);

export default app.createRoot(<App />);
