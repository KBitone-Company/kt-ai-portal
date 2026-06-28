import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import { RecentAsset, AssetType } from './types';

interface RecentAssetsPanelProps {
  assets: RecentAsset[];
}

const typeLabel = (type: AssetType): string => (type === 'dataset' ? '데이터셋' : 'AI 모델');

export const RecentAssetsPanel = ({ assets }: RecentAssetsPanelProps) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          최신 등록 자산
        </Typography>
        {assets.map(asset => (
          <Box
            key={asset.id}
            paddingY={1.5}
            borderBottom="1px solid #f3f4f6"
          >
            <Box display="flex" alignItems="center" marginBottom={0.5}>
              <Chip size="small" label={typeLabel(asset.type)} color="primary" style={{ marginRight: 8 }} />
              <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                {asset.name}
              </Typography>
            </Box>
            <Typography variant="body2" color="textSecondary" paragraph>
              {asset.description}
            </Typography>
            <Box display="flex" alignItems="center" flexWrap="wrap">
              {asset.tags.map(tag => (
                <Chip key={tag} size="small" label={tag} variant="outlined" style={{ marginRight: 6, marginBottom: 4 }} />
              ))}
            </Box>
            <Box display="flex" justifyContent="space-between" marginTop={1}>
              <Typography variant="caption" color="textSecondary">
                소유: {asset.owner}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {asset.registeredAt}
              </Typography>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};
