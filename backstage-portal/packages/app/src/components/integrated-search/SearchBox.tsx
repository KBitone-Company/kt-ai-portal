import { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

export const SearchBox = ({
  value,
  onSearch,
}: {
  value: string;
  onSearch: (query: string) => void;
}) => {
  const [input, setInput] = useState(value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', padding: '4px 16px' }}>
      <InputBase
        fullWidth
        placeholder="데이터셋, AI 모델, Docker 이미지, PyPI 패키지, 문서를 검색하세요"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
