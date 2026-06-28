import { SearchFilters, SearchResult, SecurityLevel, SearchAssetType } from './types';

const normalizeSecurityLevel = (value?: string): SecurityLevel => {
  if (value === '공개' || value === 'public') return 'public';
  if (value === '내부' || value === 'internal' || value === '남부') return 'internal';
  if (value === '비밀' || value === 'secret') return 'secret';
  return 'internal';
};

const securityLevelToKorean: Record<SecurityLevel, string> = {
  public: '공개',
  internal: '내부',
  secret: '비밀',
};

export const securityLevelLabel = (level: SecurityLevel) => securityLevelToKorean[level] ?? level;

export const buildSearchQuery = (filters: SearchFilters) => {
  const must: any[] = [];

  if (filters.query.trim()) {
    must.push({
      multi_match: {
        query: filters.query.trim(),
        fields: ['name^2', 'description', 'tags'],
        type: 'best_fields',
      },
    });
  }

  const filter: any[] = [];
  if (filters.type !== 'all') {
    filter.push({ term: { type: filters.type } });
  }
  if (filters.securityLevel !== 'all') {
    filter.push({ term: { securityLevel: securityLevelToKorean[filters.securityLevel] } });
  }
  if (filters.sourceSystem && filters.sourceSystem !== 'all') {
    filter.push({ term: { sourceSystem: filters.sourceSystem } });
  }
  if (filters.tag && filters.tag !== 'all') {
    filter.push({ term: { tags: filters.tag } });
  }

  const query: any = { bool: {} };
  if (must.length > 0) query.bool.must = must;
  if (filter.length > 0) query.bool.filter = filter;
  if (must.length === 0 && filter.length === 0) {
    query.bool.must = { match_all: {} };
  }

  return { query, size: 50 };
};

const mapHit = (hit: any): SearchResult => {
  const source = hit._source;
  return {
    id: source.id ?? hit._id,
    type: source.type as SearchAssetType,
    name: source.name,
    description: source.description,
    tags: source.tags ?? [],
    owner: source.owner,
    securityLevel: normalizeSecurityLevel(source.securityLevel),
    sourceSystem: source.sourceSystem,
    url: source.url,
    createdAt: source.createdAt,
    updatedAt: source.updatedAt,
  };
};

export const searchOpenSearch = async (
  baseUrl: string,
  filters: SearchFilters,
): Promise<{ results: SearchResult[]; fallback: boolean; message?: string }> => {
  const body = buildSearchQuery(filters);
  const url = `${baseUrl}/api/proxy/search/portal-catalog/_search`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`OpenSearch proxy error ${response.status}: ${text}`);
    }
    const data = await response.json();
    const results = (data.hits?.hits ?? []).map(mapHit);
    return { results, fallback: false };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { results: [], fallback: true, message };
  }
};
