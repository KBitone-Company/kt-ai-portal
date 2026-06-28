import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useApi, configApiRef } from '@backstage/core-plugin-api';
import { SearchBox } from './SearchBox';
import { SearchFilterPanel } from './SearchFilterPanel';
import { SearchResultList } from './SearchResultList';
import { SearchResultDetail } from './SearchResultDetail';
import { searchOpenSearch } from './SearchApiClient';
import { mockSearchResults } from './mockSearchResults';
import { SearchFilters, SearchResult } from './types';

const buildInitialFilters = (query: string): SearchFilters => ({
  query,
  type: 'all',
  securityLevel: 'all',
  sourceSystem: 'all',
  tag: 'all',
});

export const IntegratedSearchPage = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const config = useApi(configApiRef);
  const backendBaseUrl = config.getString('backend.baseUrl');

  const [filters, setFilters] = useState<SearchFilters>(buildInitialFilters(initialQuery));
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selected, setSelected] = useState<SearchResult | undefined>();
  const [loading, setLoading] = useState(false);
  const [fallback, setFallback] = useState(false);
  const [message, setMessage] = useState<string | undefined>();

  const performSearch = useCallback(
    async (currentFilters: SearchFilters) => {
      setLoading(true);
      setFallback(false);
      setMessage(undefined);
      try {
        const response = await searchOpenSearch(backendBaseUrl, currentFilters);
        if (response.fallback) {
          setFallback(true);
          setMessage(
            `OpenSearch 연결 실패, mock fallback 결과를 표시합니다. (${response.message})`,
          );
          setResults(mockSearchResults);
        } else {
          setResults(response.results);
        }
        setSelected(undefined);
      } finally {
        setLoading(false);
      }
    },
    [backendBaseUrl],
  );

  useEffect(() => {
    performSearch(filters);
  }, [filters.type, filters.securityLevel, filters.sourceSystem, filters.tag, performSearch]);

  const handleSearch = (query: string) => {
    const next = { ...filters, query };
    setFilters(next);
    performSearch(next);
  };

  return (
    <div style={{ padding: 24 }}>
      <Typography variant="h4" gutterBottom>
        Integrated Search
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SearchBox value={filters.query} onSearch={handleSearch} />
        </Grid>
        <Grid item xs={12}>
          <SearchFilterPanel filters={filters} onChange={setFilters} />
        </Grid>

        {loading && (
          <Grid item xs={12}>
            <LinearProgress />
          </Grid>
        )}

        {message && (
          <Grid item xs={12}>
            <Alert severity={fallback ? 'warning' : 'info'}>{message}</Alert>
          </Grid>
        )}

        <Grid item xs={12} md={7}>
          <SearchResultList
            results={results}
            selectedId={selected?.id}
            onSelect={setSelected}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          {selected ? (
            <SearchResultDetail result={selected} />
          ) : (
            <Typography color="textSecondary">
              검색 결과를 선택하면 상세 정보가 표시됩니다.
            </Typography>
          )}
        </Grid>
      </Grid>
    </div>
  );
};
