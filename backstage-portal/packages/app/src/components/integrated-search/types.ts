export type SearchAssetType =
  | 'dataset'
  | 'model'
  | 'docker_image'
  | 'pypi_package'
  | 'document'
  | 'project'
  | 'export_request'
  | 'credit_record'
  | 'krmf_control'
  | 'krmf_evidence';

export type SecurityLevel = 'public' | 'internal' | 'secret';

export interface SearchResult {
  id: string;
  type: SearchAssetType;
  name: string;
  description: string;
  tags: string[];
  owner: string;
  securityLevel: SecurityLevel;
  sourceSystem: string;
  url?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SearchFilters {
  query: string;
  type: SearchAssetType | 'all';
  securityLevel: SecurityLevel | 'all';
  sourceSystem: string;
  tag: string;
}
