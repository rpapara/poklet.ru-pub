import { Card, CardActionArea } from '@mui/material';
import type { CardValue } from '../types/session';

interface VoteCardProps {
  value: CardValue;
  selected: boolean;
  revealed: boolean;
  onClick: () => void;
}

export default function VoteCard({ value, selected, revealed, onClick }: VoteCardProps) {
  return (
    <Card
      sx={{
        width: 80,
        height: 100,
        border: selected ? '2px solid #1976d2' : '1px solid #ccc',
      }}
      data-testid="vote-card"
      data-selected={selected}
    >
      <CardActionArea
        onClick={onClick}
        disabled={revealed}
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
        }}
      >
        {value}
      </CardActionArea>
    </Card>
  );
}
