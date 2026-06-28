import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { useApi, identityApiRef } from '@backstage/core-plugin-api';
import { CurrentUser } from './types';

interface DashboardHeroProps {
  fallbackUser: CurrentUser;
}

export const DashboardHero = ({ fallbackUser }: DashboardHeroProps) => {
  const identity = useApi(identityApiRef);
  const [userId, setUserId] = useState<string>(fallbackUser.email);
  const [displayName, setDisplayName] = useState<string>(fallbackUser.displayName);
  const [email, setEmail] = useState<string>(fallbackUser.email);

  useEffect(() => {
    let cancelled = false;
    const loadIdentity = async () => {
      try {
        const [profile, backstageIdentity] = await Promise.all([
          identity.getProfileInfo(),
          identity.getBackstageIdentity(),
        ]);
        if (cancelled) return;
        setDisplayName(profile.displayName || fallbackUser.displayName);
        setEmail(profile.email || fallbackUser.email);
        setUserId(backstageIdentity.userEntityRef || fallbackUser.email);
      } catch {
        // Keep fallback user when identity API is unavailable.
      }
    };
    loadIdentity();
    return () => {
      cancelled = true;
    };
  }, [identity, fallbackUser]);

  return (
    <Box padding={4} style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', borderRadius: 8 }}>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap">
        <Box>
          <Typography variant="h3" style={{ color: '#fff', fontWeight: 700 }}>
            K-Defense AI Data Portal
          </Typography>
          <Typography variant="h5" style={{ color: '#dbeafe', marginTop: 8 }}>
            국방 AI 데이터 통합포털
          </Typography>
          <Typography variant="body1" style={{ color: '#eff6ff', marginTop: 16, maxWidth: 640 }}>
            국방 AI 데이터, 모델, 프로젝트를 하나의 포털에서 검색하고 관리하며,
            크레딧, 반출/반입, K-RMF 증적까지 통합적으로 운영합니다.
          </Typography>
        </Box>
        <Box textAlign="right" marginTop={{ xs: 2, md: 0 }}>
          <Chip
            label={fallbackUser.status}
            size="small"
            style={{ backgroundColor: '#fbbf24', color: '#1e293b', fontWeight: 600 }}
          />
          <Box marginTop={1}>
            <Typography variant="subtitle2" style={{ color: '#fff' }}>
              {displayName} ({userId})
            </Typography>
            <Typography variant="body2" style={{ color: '#bfdbfe' }}>
              {email} · {fallbackUser.role}
            </Typography>
            <Typography variant="caption" style={{ color: '#93c5fd' }}>
              {fallbackUser.currentDate}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
