import Chip from '@material-ui/core/Chip';
import { SearchAssetType } from './types';

const typeLabels: Record<SearchAssetType, string> = {
  dataset: '데이터셋',
  model: 'AI 모델',
  docker_image: 'Docker 이미지',
  pypi_package: 'PyPI 패키지',
  document: '문서',
  project: '프로젝트',
  export_request: '반출신청',
  credit_record: '크레딧',
  krmf_control: 'K-RMF 통제',
  krmf_evidence: 'K-RMF 증빙',
};

export const SearchTypeChip = ({ type }: { type: SearchAssetType }) => {
  return <Chip size="small" label={typeLabels[type] ?? type} />;
};
