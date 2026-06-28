import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { SearchResult } from './types';
import { SearchTypeChip } from './SearchTypeChip';
import { securityLevelLabel } from './SearchApiClient';

export const SearchResultList = ({
  results,
  selectedId,
  onSelect,
}: {
  results: SearchResult[];
  selectedId?: string;
  onSelect: (result: SearchResult) => void;
}) => {
  if (results.length === 0) {
    return (
      <Paper style={{ padding: 24, textAlign: 'center' }}>
        <Typography color="textSecondary">검색 결과가 없습니다.</Typography>
      </Paper>
    );
  }

  return (
    <Paper>
      <List dense>
        {results.map(result => (
          <ListItem
            key={result.id}
            button
            selected={selectedId === result.id}
            onClick={() => onSelect(result)}
          >
            <ListItemText
              primary={
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <SearchTypeChip type={result.type} />
                  <Typography component="span" variant="subtitle1">
                    {result.name}
                  </Typography>
                </div>
              }
              secondary={
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <Typography component="div" variant="body2" color="textSecondary">
                    {result.description}
                  </Typography>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                    <Chip size="small" label={`소유자: ${result.owner}`} />
                    <Chip size="small" label={`보안등급: ${securityLevelLabel(result.securityLevel)}`} />
                    <Chip size="small" label={`출처: ${result.sourceSystem}`} />
                    {result.tags.map(tag => (
                      <Chip key={tag} size="small" label={tag} />
                    ))}
                  </div>
                </div>
              }
              primaryTypographyProps={{ component: 'div' }}
              secondaryTypographyProps={{ component: 'div' }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
