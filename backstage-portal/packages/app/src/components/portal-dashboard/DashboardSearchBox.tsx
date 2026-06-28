import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';

export const DashboardSearchBox = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/integrated-search?q=${encodeURIComponent(query)}`);
  };

  return (
    <Box>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        style={{ display: 'flex', alignItems: 'center', padding: '8px 16px' }}
      >
        <InputBase
          fullWidth
          placeholder="데이터셋, AI 모델, Docker 이미지, PyPI 패키지, 문서를 검색하세요"
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ fontSize: '1.1rem' }}
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Box display="flex" justifyContent="flex-end" marginTop={1}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          onClick={handleSubmit}
        >
          검색
        </Button>
      </Box>
    </Box>
  );
};
