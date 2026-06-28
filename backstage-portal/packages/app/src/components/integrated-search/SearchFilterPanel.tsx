import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { SearchFilters, SearchAssetType, SecurityLevel } from './types';

const typeOptions: { value: SearchAssetType | 'all'; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'dataset', label: '데이터셋' },
  { value: 'model', label: 'AI 모델' },
  { value: 'docker_image', label: 'Docker 이미지' },
  { value: 'pypi_package', label: 'PyPI 패키지' },
  { value: 'document', label: '문서' },
];

const securityOptions: { value: SecurityLevel | 'all'; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'public', label: '공개' },
  { value: 'internal', label: '내부' },
  { value: 'secret', label: '비밀' },
];

const sourceOptions = ['all', 'DAPA-MRO', 'AI-Factory', 'Harbor', 'Private PyPI', 'Confluence', 'DIMS', 'OpenMetadata', 'K-RMF', '기타'];

const tagOptions = ['all', '군수', '정비', '예측정비', 'AI', 'K-RMF', '보안', 'Docker', 'PyPI'];

export const SearchFilterPanel = ({
  filters,
  onChange,
}: {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
}) => {
  const handleChange = (field: keyof SearchFilters, value: string) => {
    onChange({ ...filters, [field]: value });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          select
          label="검색 대상 유형"
          value={filters.type}
          onChange={e => handleChange('type', e.target.value)}
          variant="outlined"
          size="small"
        >
          {typeOptions.map(opt => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          select
          label="보안등급"
          value={filters.securityLevel}
          onChange={e => handleChange('securityLevel', e.target.value)}
          variant="outlined"
          size="small"
        >
          {securityOptions.map(opt => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          select
          label="소스 시스템"
          value={filters.sourceSystem}
          onChange={e => handleChange('sourceSystem', e.target.value)}
          variant="outlined"
          size="small"
        >
          {sourceOptions.map(opt => (
            <MenuItem key={opt} value={opt}>
              {opt === 'all' ? '전체' : opt}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          select
          label="태그"
          value={filters.tag}
          onChange={e => handleChange('tag', e.target.value)}
          variant="outlined"
          size="small"
        >
          {tagOptions.map(opt => (
            <MenuItem key={opt} value={opt}>
              {opt === 'all' ? '전체' : opt}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
};
